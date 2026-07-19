import type { Planta } from '../../../data/plants';
import { EVIDENCIA } from '../../../lib/evidence';
import { EvidenceDot } from '../../common/EvidenceDot';

interface PropriedadesProps {
  planta: Planta;
}

export function Propriedades({ planta }: PropriedadesProps) {
  if (planta.propriedades.length === 0) {
    return <p className="text-sm text-forest-900/50">Nenhuma propriedade documentada ainda para esta espécie.</p>;
  }

  return (
    <div className="bg-white border border-line rounded-2xl p-2 max-w-[640px]">
      {planta.propriedades.map((p, i) => {
        const info = EVIDENCIA[p.evidencia];
        return (
          <div
            key={p.nome}
            className={`flex items-center justify-between gap-4 px-5 py-5 ${
              i < planta.propriedades.length - 1 ? 'border-b border-forest-900/[0.06]' : ''
            }`}
          >
            <span className="text-[16px] text-forest-900">{p.nome}</span>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-forest-900/70 bg-cream-200 px-3 py-[6px] rounded-full whitespace-nowrap">
              <EvidenceDot color={info.color} />
              {info.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
