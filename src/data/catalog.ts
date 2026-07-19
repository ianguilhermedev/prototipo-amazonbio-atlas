import { plantas as plantasCuradas, type Planta } from './plants';
import { plantasHorto } from './hortoAdapter';

// Lista completa (curadas + catálogo real) — usada por /busca e /planta/:slug.
// Home usa `plantas` de plants.ts diretamente para manter o carrossel
// restrito às espécies curadas com foto real.
export const todasAsPlantas: Planta[] = [...plantasCuradas, ...plantasHorto];

export function getPlantaBySlug(slug: string): Planta | undefined {
  return todasAsPlantas.find((p) => p.slug === slug);
}
