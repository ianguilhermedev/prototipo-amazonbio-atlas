import type { Planta } from '../../../data/plants';

interface CompostosQuimicosProps {
  planta: Planta;
}

export function CompostosQuimicos({ planta }: CompostosQuimicosProps) {
  return (
    <div>
      <div className="font-mono text-xs tracking-[0.16em] uppercase text-forest-900/50 mb-4">Compostos ativos</div>
      {planta.compostos.length === 0 ? (
        <p className="text-sm text-forest-900/50">Nenhum composto químico documentado ainda para esta espécie.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {planta.compostos.map((composto) => (
            <span
              key={composto}
              className="font-mono text-[13px] text-forest-700 bg-white border border-line px-4 py-3 rounded-xl"
            >
              {composto}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
