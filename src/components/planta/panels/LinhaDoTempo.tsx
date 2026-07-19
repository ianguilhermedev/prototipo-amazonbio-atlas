import type { Planta } from '../../../data/plants';

interface LinhaDoTempoProps {
  planta: Planta;
}

export function LinhaDoTempo({ planta }: LinhaDoTempoProps) {
  const eventos = [...planta.timeline].sort((a, b) => a.ano - b.ano);

  return (
    <div className="max-w-[640px]">
      {eventos.map((evento, i) => (
        <div key={`${evento.ano}-${i}`} className="flex gap-6">
          <div className="flex flex-col items-center">
            <span className="w-[9px] h-[9px] rounded-full bg-forest-700 mt-1.5 shrink-0" />
            {i < eventos.length - 1 && <span className="w-px flex-1 bg-line my-1" />}
          </div>
          <div className={i < eventos.length - 1 ? 'pb-8' : ''}>
            <div className="font-mono text-sm text-forest-700">{evento.ano}</div>
            <p className="text-[15px] leading-relaxed text-forest-900/78 mt-1">{evento.evento}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
