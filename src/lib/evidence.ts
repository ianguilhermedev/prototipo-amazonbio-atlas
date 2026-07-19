import type { NivelEvidencia } from '../data/plants';

interface EvidenciaInfo {
  label: string;
  color: string;
  description: string;
}

// Single source of truth for the 4-level evidence taxonomy. Every badge in the
// app must read from here — never hard-code a label/color pair elsewhere.
export const EVIDENCIA: Record<NivelEvidencia, EvidenciaInfo> = {
  clinica: {
    label: 'Evidência Clínica',
    color: '#4ea36a',
    description: 'Estudos controlados e revisados por pares em populações humanas.',
  },
  'pre-clinica': {
    label: 'Estudos Pré-clínicos',
    color: '#4a86c4',
    description: 'Evidência em modelos animais, ainda sem validação clínica.',
  },
  'in-vitro': {
    label: 'Estudos In Vitro',
    color: '#e0c15a',
    description: 'Pesquisa em laboratório, fora de organismos vivos.',
  },
  tradicional: {
    label: 'Uso Tradicional',
    color: '#9a9a8e',
    description: 'Registro etnobotânico documentado, sem confirmação clínica.',
  },
};

export const EVIDENCIA_ORDEM: NivelEvidencia[] = ['clinica', 'pre-clinica', 'in-vitro', 'tradicional'];
