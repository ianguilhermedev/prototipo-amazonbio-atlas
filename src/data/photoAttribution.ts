import atribuicoes from './hortoPhotoAttribution.json';

export interface AtribuicaoFoto {
  slug: string;
  arquivo: string;
  creator: string;
  rightsHolder: string;
  license: string;
  publisher: string | null;
  fonte: string;
}

const porSlug: Record<string, AtribuicaoFoto> = {};
for (const a of atribuicoes as AtribuicaoFoto[]) {
  porSlug[a.slug] = a;
}

// Transforma a URL da licença (ex.: ".../licenses/by-nc/4.0/") em rótulo
// curto (ex.: "CC BY-NC 4.0") para exibição.
function rotuloLicenca(licenseUrl: string): string {
  const match = licenseUrl.match(/licenses\/([a-z-]+)\/([\d.]+)/i) ?? licenseUrl.match(/publicdomain\/(zero)\/([\d.]+)/i);
  if (!match) return licenseUrl;
  const [, tipo, versao] = match;
  if (tipo === 'zero') return `CC0 ${versao}`;
  return `CC ${tipo.toUpperCase()} ${versao}`;
}

export function getAtribuicaoFoto(slug: string) {
  const a = porSlug[slug];
  if (!a) return null;
  return { ...a, licenseLabel: rotuloLicenca(a.license) };
}
