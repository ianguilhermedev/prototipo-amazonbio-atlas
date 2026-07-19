import type { NivelEvidencia } from '../../data/plants';
import { EVIDENCIA, EVIDENCIA_ORDEM } from '../../lib/evidence';
import { EvidenceDot } from '../common/EvidenceDot';

interface EvidenceFilterProps {
  selected: Set<NivelEvidencia>;
  onToggle: (nivel: NivelEvidencia) => void;
}

export function EvidenceFilter({ selected, onToggle }: EvidenceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {EVIDENCIA_ORDEM.map((nivel) => {
        const info = EVIDENCIA[nivel];
        const active = selected.has(nivel);
        return (
          <button
            key={nivel}
            onClick={() => onToggle(nivel)}
            className={`inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.06em] uppercase px-4 py-[9px] rounded-full border transition-colors duration-150 ${
              active
                ? 'bg-forest-900 border-forest-900 text-cream-100'
                : 'bg-white border-line text-forest-900/65 hover:border-line-hover'
            }`}
          >
            <EvidenceDot color={info.color} />
            {info.label}
          </button>
        );
      })}
    </div>
  );
}
