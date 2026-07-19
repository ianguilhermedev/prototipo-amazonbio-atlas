// Busca fotos reais e abertamente licenciadas via GBIF (que agrega mídia do
// iNaturalist, herbários etc.) para as espécies do catálogo do horto que
// ainda não têm foto. Roda sem supervisão: aplica apenas filtros objetivos
// (licença aberta, correspondência de nome científico, tamanho de arquivo) —
// não há curadoria visual manual por espécie.
//
// Uso: node scripts/fetch-gbif-photos.mjs
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'src', 'assets', 'images', 'horto');
const attributionPath = path.join(root, 'src', 'data', 'hortoPhotoAttribution.json');

const dataset = JSON.parse(readFileSync(path.join(root, 'src', 'data', 'plantas_horto.json'), 'utf8'));
const overrides = JSON.parse(readFileSync(path.join(root, 'src', 'data', 'hortoOverrides.json'), 'utf8'));

const jaCatalogadasComo = new Set(overrides.jaCatalogadasComo);
const slugOverrides = overrides.slugOverrides;

// Filtro grosso a nível de ocorrência (mais rápido no servidor), mas NÃO é
// suficiente sozinho: o campo `license` da ocorrência é o da licença geral
// do registro/dataset, enquanto cada foto individual carrega seu próprio
// `media.license`, que pode ser mais restritivo, informal ("Fulano
// (cc-by-sa)") ou nem ser uma licença de verdade ("Usage Conditions Apply").
// Por isso `licencaAceitavel` abaixo revalida estritamente o texto da
// licença de CADA foto antes de baixar.
const ACCEPTED_LICENSES = ['CC0_1_0', 'CC_BY_4_0', 'CC_BY_NC_4_0'];
const LICENSE_PATTERN = /creativecommons\.org\/(licenses\/(by|by-sa|by-nc|by-nc-sa)\/|publicdomain\/zero\/)/i;
const MIN_BYTES = 5000;
const MAX_RAW_BYTES = 30 * 1024 * 1024; // acima disso, provavelmente é um scan/TIFF mal identificado como jpeg
const MAX_WIDTH = 1400;
const JPEG_QUALITY = 82;
const DELAY_MS = 300;
const CANDIDATOS_POR_ESPECIE = 5;

function licencaAceitavel(licenseUrl) {
  return typeof licenseUrl === 'string' && LICENSE_PATTERN.test(licenseUrl);
}

const especies = dataset.especies
  .filter((e) => !jaCatalogadasComo.has(e.id))
  .map((e) => ({ slug: slugOverrides[e.id] ?? e.id, nomeCientifico: e.nome_cientifico, nomePopular: e.nome_popular }));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function primeiraDuasPalavras(nomeCientifico) {
  return nomeCientifico.trim().split(/\s+/).slice(0, 2).join(' ');
}

async function matchTaxon(nomeCientifico) {
  const tentativas = [nomeCientifico, primeiraDuasPalavras(nomeCientifico)];
  for (const nome of tentativas) {
    const url = `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(nome)}`;
    const res = await fetch(url);
    if (!res.ok) continue;
    const json = await res.json();
    if (json.usageKey && json.matchType !== 'NONE') {
      return json.usageKey;
    }
  }
  return null;
}

// Retorna até N candidatos (não só o primeiro) para permitir fallback caso
// o download de um deles falhe ou o arquivo seja um scan gigante/corrompido.
async function buscarMidiaCandidatos(taxonKey) {
  const params = new URLSearchParams();
  params.set('taxonKey', String(taxonKey));
  params.set('mediaType', 'StillImage');
  params.set('limit', '30');
  for (const lic of ACCEPTED_LICENSES) params.append('license', lic);

  const res = await fetch(`https://api.gbif.org/v1/occurrence/search?${params.toString()}`);
  if (!res.ok) return [];
  const json = await res.json();

  const candidatos = [];
  for (const occ of json.results ?? []) {
    for (const m of occ.media ?? []) {
      if (m.type !== 'StillImage') continue;
      if (!m.identifier) continue;
      if (!/^image\//.test(m.format ?? '')) continue;
      if (!licencaAceitavel(m.license)) continue;
      candidatos.push({
        identifier: m.identifier,
        license: m.license,
        creator: m.creator ?? m.rightsHolder ?? 'desconhecido',
        rightsHolder: m.rightsHolder ?? m.creator ?? 'desconhecido',
        publisher: m.publisher ?? null,
        references: m.references ?? m.identifier,
      });
      if (candidatos.length >= CANDIDATOS_POR_ESPECIE) return candidatos;
    }
  }
  return candidatos;
}

async function baixarEProcessar(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const contentType = res.headers.get('content-type') ?? '';
  if (!/^image\//.test(contentType)) return null;

  const contentLength = Number(res.headers.get('content-length') ?? 0);
  if (contentLength > MAX_RAW_BYTES) return null;

  const raw = Buffer.from(await res.arrayBuffer());
  if (raw.byteLength < MIN_BYTES || raw.byteLength > MAX_RAW_BYTES) return null;

  // Normaliza tudo para JPEG redimensionado — remove metadados, evita
  // arquivos de dezenas/centenas de MB de scans/fotos em resolução bruta.
  const processada = await sharp(raw)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer();

  return processada;
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const atribuicoes = [];
  const resumo = { ok: 0, semTaxon: 0, semMidia: 0, downloadFalhou: 0, jaExistia: 0 };
  let totalBytes = 0;

  for (const [i, esp] of especies.entries()) {
    process.stdout.write(`[${i + 1}/${especies.length}] ${esp.nomePopular} (${esp.nomeCientifico}) — `);

    if (existsSync(path.join(outDir, `${esp.slug}.jpg`))) {
      console.log('já existe, pulando.');
      resumo.jaExistia++;
      continue;
    }

    try {
      const taxonKey = await matchTaxon(esp.nomeCientifico);
      if (!taxonKey) {
        console.log('sem correspondência de táxon no GBIF.');
        resumo.semTaxon++;
        continue;
      }

      await sleep(DELAY_MS);
      const candidatos = await buscarMidiaCandidatos(taxonKey);
      if (candidatos.length === 0) {
        console.log('nenhuma foto com licença aberta encontrada.');
        resumo.semMidia++;
        continue;
      }

      let sucesso = false;
      for (const midia of candidatos) {
        await sleep(DELAY_MS);
        let processada;
        try {
          processada = await baixarEProcessar(midia.identifier);
        } catch {
          processada = null;
        }
        if (!processada) continue;

        const nomeArquivo = `${esp.slug}.jpg`;
        writeFileSync(path.join(outDir, nomeArquivo), processada);
        atribuicoes.push({
          slug: esp.slug,
          arquivo: nomeArquivo,
          creator: midia.creator,
          rightsHolder: midia.rightsHolder,
          license: midia.license,
          publisher: midia.publisher,
          fonte: midia.references,
        });
        totalBytes += processada.byteLength;
        console.log(`ok (${(processada.byteLength / 1024).toFixed(0)} KB, ${midia.license})`);
        resumo.ok++;
        sucesso = true;
        break;
      }

      if (!sucesso) {
        console.log('nenhum candidato baixável (todos falharam/tamanho suspeito).');
        resumo.downloadFalhou++;
      }
    } catch (err) {
      console.log('erro:', err.message);
    }

    await sleep(DELAY_MS);
  }

  writeFileSync(attributionPath, JSON.stringify(atribuicoes, null, 2));

  console.log('\n--- resumo ---');
  console.table(resumo);
  console.log(`Total de espécies processadas: ${especies.length}`);
  console.log(`Tamanho total das fotos processadas: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Atribuições salvas em ${attributionPath}`);
}

main();
