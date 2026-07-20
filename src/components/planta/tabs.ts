export interface TabDef {
  id: string;
  label: string;
  illustrative: boolean;
}

// Order matches prompt.md section 7: functional tabs (real mock data) first,
// then the illustrative ones (example state, clearly labeled as such).
export const TABS: TabDef[] = [
  { id: 'visao-geral', label: 'Overview', illustrative: false },
  { id: 'compostos', label: 'Chemical Compounds', illustrative: false },
  { id: 'propriedades', label: 'Properties', illustrative: false },
  { id: 'timeline', label: 'Scientific Timeline', illustrative: false },
  { id: 'similaridade', label: 'Compound Similarity', illustrative: true },
  { id: 'tradicional', label: 'Traditional Knowledge', illustrative: true },
  { id: 'radar', label: 'Biodiversity Radar', illustrative: true },
  { id: 'referencias', label: 'Scientific References', illustrative: true },
];
