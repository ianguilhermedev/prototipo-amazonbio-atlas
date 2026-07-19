import { Link } from 'react-router-dom';
import type { Planta } from '../../data/plants';
import { plantImages } from '../../data/plantImages';
import { EVIDENCIA } from '../../lib/evidence';
import { Pill } from '../common/Pill';
import { EvidenceDot } from '../common/EvidenceDot';

interface SearchResultCardProps {
  planta: Planta;
}

export function SearchResultCard({ planta }: SearchResultCardProps) {
  const foto = plantImages[planta.slug];
  const dotColor = planta.propriedades[0] ? EVIDENCIA[planta.propriedades[0].evidencia].color : undefined;

  return (
    <div className="bg-white border border-line rounded-3xl overflow-hidden flex flex-col transition-colors duration-200 hover:border-line-hover">
      <div
        className={`relative h-[190px] bg-cover bg-center ${!foto ? 'bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center' : ''}`}
        style={foto ? { backgroundImage: `url(${foto})` } : undefined}
      >
        {foto && (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(22,54,42,0) 55%, rgba(22,54,42,0.35))' }}
          />
        )}
        {!foto && (
          <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-cream-100/45 text-center px-8">
            Foto não disponível
          </span>
        )}
        <span className="absolute top-[18px] left-5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-cream-100/95 bg-forest-900/50 backdrop-blur-[3px] px-3 py-[6px] rounded-full">
          {planta.regiao}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {planta.indice != null && dotColor && (
          <div className="inline-flex self-start items-center gap-2 font-mono text-[11px] font-medium tracking-[0.08em] text-forest-900 bg-cream-200 px-3 py-[5px] rounded-full mb-4">
            <EvidenceDot color={dotColor} />
            ÍNDICE {planta.indice}
          </div>
        )}

        <div className="font-display text-2xl leading-tight text-forest-900">{planta.nomePopular}</div>
        <div className="font-display italic font-light text-[15px] text-forest-900/60 mt-1">
          {planta.nomeCientifico}
        </div>
        <p className="text-sm leading-relaxed text-forest-900/70 mt-3 flex-1">{planta.descricaoCurta}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {planta.propriedades.map((p) => (
            <Pill key={p.nome}>{p.nome}</Pill>
          ))}
        </div>

        <Link
          to={`/planta/${planta.slug}`}
          className="inline-flex items-center gap-2 self-start bg-lime-400 text-forest-900 font-semibold text-sm px-5 py-[11px] rounded-full mt-5 transition-colors duration-150 hover:bg-lime-300"
        >
          Ver detalhes <span className="text-base leading-none">→</span>
        </Link>
      </div>
    </div>
  );
}
