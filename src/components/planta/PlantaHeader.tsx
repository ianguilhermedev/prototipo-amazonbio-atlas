import { Link } from 'react-router-dom';
import type { Planta } from '../../data/plants';
import { plantImages } from '../../data/plantImages';
import { EVIDENCIA } from '../../lib/evidence';
import { EvidenceDot } from '../common/EvidenceDot';
import { Nav } from '../layout/Nav';

interface PlantaHeaderProps {
  planta: Planta;
}

export function PlantaHeader({ planta }: PlantaHeaderProps) {
  const niveisPresentes = [...new Set(planta.propriedades.map((p) => p.evidencia))];

  return (
    <div className="relative bg-forest-900">
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${plantImages[planta.slug]})` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(22,54,42,0.55) 0%, rgba(22,54,42,0.7) 55%, #16362a 100%)',
        }}
      />

      <Nav />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 pt-6 pb-16 md:pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase text-cream-100/60 transition-colors duration-150 hover:text-lime-400 mb-10"
        >
          ← Voltar ao acervo
        </Link>

        <div className="font-mono text-xs tracking-[0.28em] uppercase text-lime-400 mb-5">
          {planta.regiao} · {planta.familia}
        </div>

        <h1 className="font-display font-normal text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.015em] text-cream-100">
          {planta.nomePopular}
        </h1>
        <div className="font-display italic font-light text-xl md:text-2xl text-cream-100/65 mt-2">
          {planta.nomeCientifico}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-cream-100 bg-cream-100/10 border border-cream-100/15 px-[13px] py-[7px] rounded-full">
            <EvidenceDot color={EVIDENCIA[planta.propriedades[0].evidencia].color} />
            ÍNDICE {planta.indice}
          </div>
          {niveisPresentes.map((nivel) => (
            <div
              key={nivel}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.06em] text-cream-100/85 bg-cream-100/10 border border-cream-100/15 px-[13px] py-[7px] rounded-full"
            >
              <EvidenceDot color={EVIDENCIA[nivel].color} />
              {EVIDENCIA[nivel].label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
