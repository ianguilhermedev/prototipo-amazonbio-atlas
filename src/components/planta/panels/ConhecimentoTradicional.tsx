import type { Planta } from '../../../data/plants';
import { IllustrativeBadge } from '../../common/IllustrativeBadge';

interface ConhecimentoTradicionalProps {
  planta: Planta;
}

export function ConhecimentoTradicional({ planta }: ConhecimentoTradicionalProps) {
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
            Example panel: in a future version, this space would gather multiple ethnobotanical records with
            source, community, and collection date. For now, a single summary account illustrates the format.
          </p>
        </>
      )}
      <div className="bg-white border border-line rounded-2xl p-6 max-w-[640px]">
        <p className="text-[15.5px] leading-[1.7] text-forest-900/78">{planta.usoTradicional}</p>
      </div>
    </div>
  );
}
