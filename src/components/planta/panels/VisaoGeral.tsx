import type { Planta } from '../../../data/plants';
import { Pill } from '../../common/Pill';

interface VisaoGeralProps {
  planta: Planta;
}

export function VisaoGeral({ planta }: VisaoGeralProps) {
  const stats = [
    { label: 'Família', value: planta.familia },
    { label: 'Região', value: planta.regiao },
    ...(planta.indice != null ? [{ label: 'Índice', value: String(planta.indice) }] : []),
    { label: 'Compostos documentados', value: String(planta.compostos.length) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12">
      <div>
        <p className="text-[16.5px] leading-[1.7] text-forest-900/78 max-w-[60ch]">{planta.descricaoLonga}</p>

        {planta.sintomasDoencas.length > 0 && (
          <>
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-forest-900/50 mt-10 mb-3">
              Sintomas e condições associadas
            </div>
            <div className="flex flex-wrap gap-2">
              {planta.sintomasDoencas.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="bg-white border border-line rounded-2xl p-2 h-fit">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center justify-between px-4 py-4 ${
              i < stats.length - 1 ? 'border-b border-forest-900/[0.06]' : ''
            }`}
          >
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-forest-900/50">{s.label}</span>
            <span className="font-display text-lg text-forest-900">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
