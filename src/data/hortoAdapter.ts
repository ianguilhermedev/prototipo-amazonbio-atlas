import type { Planta, Propriedade } from './plants';
// TEMP (English swap): points at the translated catalog. Revert to
// './plantas_horto.json' to restore the Portuguese source.
import raw from './plantas_horto.en.json';
import overrides from './hortoOverrides.json';

interface PublicacaoHorto {
  citacao: string;
  url: string | null;
}

interface EspecieHorto {
  id: string;
  nome_popular: string;
  nome_cientifico: string;
  familia: string;
  uso_medicinal: string;
  parte_utilizada: string;
  publicacoes: PublicacaoHorto[];
}

// Compartilhado com scripts/fetch-gbif-photos.mjs — mantém a mesma lista de
// espécies e slugs entre o app e o pipeline de fotos.
const JA_CATALOGADAS_COMO = new Set(overrides.jaCatalogadasComo);
const SLUG_OVERRIDES: Record<string, string> = overrides.slugOverrides;

const LEAD_INS = [
  /^acts as (a |an )?/i,
  /^acts on\s+/i,
  /^treats\s+/i,
  /^aids in\s+/i,
  /^aids\s+/i,
  /^helps control\s+/i,
  /^has\s+/i,
  /^also treats\s+/i,
  /^also\s+/i,
  /^used as\s+/i,
  /^used to\s+/i,
  /^is\s+/i,
];

function stripLeadIn(text: string) {
  let t = text.trim();
  for (const re of LEAD_INS) t = t.replace(re, '');
  return t.trim();
}

function capitalizar(texto: string) {
  return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : texto;
}

// Heurística simples de texto (não é NLP real): quebra a frase livre de
// "uso_medicinal" em termos curtos para virarem tags pesquisáveis. Frases
// fora do padrão comum do catálogo ("trata X, Y e Z" / "atua como X e Y")
// podem gerar fragmentos imperfeitos — checado manualmente numa amostra,
// mas não revisado termo a termo nas 136 espécies.
function extrairTermos(usoMedicinal: string): string[] {
  const texto = usoMedicinal.trim().replace(/\.$/, '');
  if (!texto) return [];

  const partes = texto
    .split(/,| and (?=[a-z])/i)
    .map(stripLeadIn)
    .map((p) => p.trim())
    .filter((p) => p.length > 1 && p.length <= 40);

  const vistos = new Set<string>();
  const termos: string[] = [];
  for (let p of partes) {
    p = capitalizar(p);
    const chave = p.toLowerCase();
    if (!vistos.has(chave)) {
      vistos.add(chave);
      termos.push(p);
    }
  }
  return termos.slice(0, 4);
}

function paraPropriedades(termos: string[]): Propriedade[] {
  return termos.map((nome) => ({ nome, evidencia: 'tradicional' as const }));
}

function paraReferencias(publicacoes: PublicacaoHorto[]): string[] {
  return publicacoes.map((p) => (p.url ? `${p.citacao} — ${p.url}` : p.citacao));
}

// Índice = uma medida de "quanto já documentamos" desta espécie (nº de
// propriedades derivadas + nº de publicações reais vinculadas), não uma nota
// de eficácia terapêutica — não há base para isso no catálogo-fonte. Mesma
// lógica de honestidade das seções de evidência: number visível, mas
// calculado de forma transparente, nunca um valor de opinião por espécie.
function calcularIndice(numTermos: number, numReferencias: number): number {
  const bruto = 40 + numTermos * 6 + Math.min(numReferencias, 8) * 5;
  return Math.min(95, Math.max(35, bruto));
}

const dataset = raw as { especies: EspecieHorto[] };

export const plantasHorto: Planta[] = dataset.especies
  .filter((e) => !JA_CATALOGADAS_COMO.has(e.id))
  .map((e): Planta => {
    const termos = extrairTermos(e.uso_medicinal);
    const usoMedicinalTexto = e.uso_medicinal.trim() || 'Medicinal use not detailed in the source catalog.';
    const descricao = capitalizar(usoMedicinalTexto);
    const parteUtilizada = e.parte_utilizada.trim().replace(/\.$/, '');
    // Alguns registros trazem anotações extras após o nome da família (ex.:
    // "Asparagaceae. Uso ornamental."); mantemos só a primeira sentença.
    const familia = e.familia.split('.')[0].trim();
    const referencias = paraReferencias(e.publicacoes);

    return {
      slug: SLUG_OVERRIDES[e.id] ?? e.id,
      nomePopular: e.nome_popular,
      nomeCientifico: e.nome_cientifico,
      familia,
      indice: calcularIndice(termos.length, referencias.length),
      regiao: 'Medicinal Plants Garden — Belém, PA',
      fotoDescricao: 'Real photo obtained via GBIF — see attribution on the species page.',
      descricaoCurta: descricao,
      descricaoLonga: parteUtilizada ? `${descricao} Part used: ${parteUtilizada}.` : descricao,
      compostos: [],
      propriedades: paraPropriedades(termos),
      sintomasDoencas: termos,
      similaridade: [],
      usoTradicional: usoMedicinalTexto,
      timeline: [],
      referencias,
      fonteReal: true,
    };
  });
