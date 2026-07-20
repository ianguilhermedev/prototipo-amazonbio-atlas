import type { Planta } from '../../../data/plants';
import { IllustrativeBadge } from '../../common/IllustrativeBadge';

interface ReferenciasCientificasProps {
  planta: Planta;
}

export function ReferenciasCientificas({ planta }: ReferenciasCientificasProps) {
  return (
    <div>
      {planta.fonteReal ? (
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-forest-900/45 mb-6">
          Source: catalog of the Medicinal and Aromatic Plants Garden, Embrapa Eastern Amazon (2024)
        </p>
      ) : (
        <>
          <IllustrativeBadge />
          <p className="text-[15px] leading-relaxed text-forest-900/70 max-w-[60ch] mt-4 mb-6">
            Example format: full citations, with DOI and a link to the original text, would replace this list in
            a version with real bibliographic integration.
          </p>
        </>
      )}

      {planta.referencias.length === 0 ? (
        <p className="text-sm text-forest-900/50">No publications linked to this species in the source catalog.</p>
      ) : (
        <ol className="space-y-4 max-w-[640px]">
          {planta.referencias.map((ref, i) => (
            <li key={i} className="flex gap-4 text-[14.5px] leading-relaxed text-forest-900/75">
              <span className="font-mono text-forest-900/40 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span>{ref}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
