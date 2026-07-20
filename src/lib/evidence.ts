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
    label: 'Clinical Evidence',
    color: '#4ea36a',
    description: 'Controlled, peer-reviewed studies in human populations.',
  },
  'pre-clinica': {
    label: 'Pre-clinical Studies',
    color: '#4a86c4',
    description: 'Evidence in animal models, not yet clinically validated.',
  },
  'in-vitro': {
    label: 'In Vitro Studies',
    color: '#e0c15a',
    description: 'Laboratory research, outside living organisms.',
  },
  tradicional: {
    label: 'Traditional Use',
    color: '#9a9a8e',
    description: 'Documented ethnobotanical record, without clinical confirmation.',
  },
};

export const EVIDENCIA_ORDEM: NivelEvidencia[] = ['clinica', 'pre-clinica', 'in-vitro', 'tradicional'];
