import type { NivelEvidencia, Planta } from '../data/plants';

// Combining diacritical marks (U+0300-U+036F), stripped after NFD
// decomposition so accented search terms match unaccented ones.
const DIACRITICS = new RegExp('[̀-ͯ]', 'g');

function normalize(text: string) {
  return text.normalize('NFD').replace(DIACRITICS, '').toLowerCase();
}

function matchesQuery(planta: Planta, query: string) {
  const q = normalize(query.trim());
  if (!q) return true;

  const haystack = [
    planta.nomePopular,
    planta.nomeCientifico,
    planta.familia,
    planta.regiao,
    ...planta.compostos,
    ...planta.propriedades.map((p) => p.nome),
    ...planta.sintomasDoencas,
  ]
    .map(normalize)
    .join(' | ');

  return haystack.includes(q);
}

function matchesEvidencia(planta: Planta, niveis: Set<NivelEvidencia>) {
  if (niveis.size === 0) return true;
  return planta.propriedades.some((p) => niveis.has(p.evidencia));
}

export function filtrarPlantas(plantas: Planta[], query: string, niveis: Set<NivelEvidencia>) {
  return plantas.filter((p) => matchesQuery(p, query) && matchesEvidencia(p, niveis));
}
