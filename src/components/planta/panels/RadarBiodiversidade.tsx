import { IllustrativeBadge } from '../../common/IllustrativeBadge';

const EIXOS = [
  { label: 'Diversidade genética', valor: 0.62 },
  { label: 'Endemismo', valor: 0.74 },
  { label: 'Grau de ameaça', valor: 0.4 },
  { label: 'Uso documentado', valor: 0.85 },
  { label: 'Distribuição geográfica', valor: 0.55 },
];

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 88;

function pointAt(index: number, total: number, valor: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = RADIUS * valor;
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

export function RadarBiodiversidade() {
  const total = EIXOS.length;
  const dataPoints = EIXOS.map((eixo, i) => pointAt(i, total, eixo.valor));
  const dataPath = dataPoints.map((p) => p.join(',')).join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div>
      <IllustrativeBadge />
      <p className="text-[15px] leading-relaxed text-forest-900/70 max-w-[60ch] mt-4 mb-8">
        Exemplo de visualização: um índice comparativo de biodiversidade cruzando genética, endemismo, ameaça e
        distribuição. Os valores abaixo são fictícios, apenas para ilustrar o formato do gráfico.
      </p>

      <div className="bg-white border border-line rounded-2xl p-8 max-w-[520px] flex flex-col items-center gap-6">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {rings.map((r) => (
            <polygon
              key={r}
              points={EIXOS.map((_, i) => pointAt(i, total, r).join(',')).join(' ')}
              fill="none"
              stroke="#ded9cb"
              strokeWidth={1}
            />
          ))}
          {EIXOS.map((_, i) => {
            const [x, y] = pointAt(i, total, 1);
            return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="#ded9cb" strokeWidth={1} />;
          })}
          <polygon points={dataPath} fill="#b6e06a" fillOpacity={0.35} stroke="#1e4436" strokeWidth={2} />
          {dataPoints.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={3.5} fill="#1e4436" />
          ))}
        </svg>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
          {EIXOS.map((eixo) => (
            <div key={eixo.label} className="font-mono text-[11px] tracking-[0.04em] text-forest-900/60">
              {eixo.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
