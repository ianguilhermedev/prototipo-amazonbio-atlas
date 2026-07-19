export interface TabDef {
  id: string;
  label: string;
  illustrative: boolean;
}

// Order matches prompt.md section 7: functional tabs (real mock data) first,
// then the illustrative ones (example state, clearly labeled as such).
export const TABS: TabDef[] = [
  { id: 'visao-geral', label: 'Visão Geral', illustrative: false },
  { id: 'compostos', label: 'Compostos Químicos', illustrative: false },
  { id: 'propriedades', label: 'Propriedades', illustrative: false },
  { id: 'timeline', label: 'Linha do Tempo Científica', illustrative: false },
  { id: 'similaridade', label: 'Similaridade de Compostos', illustrative: true },
  { id: 'tradicional', label: 'Conhecimento Tradicional', illustrative: true },
  { id: 'radar', label: 'Radar da Biodiversidade', illustrative: true },
  { id: 'referencias', label: 'Referências Científicas', illustrative: true },
];
