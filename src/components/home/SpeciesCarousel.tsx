import { Link } from 'react-router-dom';
import type { Planta } from '../../data/plants';
import { plantImages } from '../../data/plantImages';
import { EVIDENCIA } from '../../lib/evidence';
import { Pill } from '../common/Pill';
import { EvidenceDot } from '../common/EvidenceDot';
import { ThumbnailTrack } from './ThumbnailTrack';

interface SpeciesCarouselProps {
  plants: Planta[];
  idx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export function SpeciesCarousel({ plants, idx, onPrev, onNext, onSelect }: SpeciesCarouselProps) {
  const plant = plants[idx];
  const dotColor = plant.propriedades[0] ? EVIDENCIA[plant.propriedades[0].evidencia].color : undefined;

  return (
    <section className="bg-cream-100 text-forest-900">
      <div className="max-w-[1240px] mx-auto px-6 py-16 md:px-12 md:py-[104px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mb-10 md:mb-[52px]">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-forest-900/50 mb-5">
              Featured species
            </div>
            <h2 className="font-display font-normal text-[32px] md:text-[46px] leading-[1.08] tracking-[-0.01em] max-w-[16ch]">
              A <em className="italic text-forest-700">rotating</em> slice of the collection
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-forest-900/66 max-w-[34ch] md:text-right">
            A sample of what we've already cataloged — changes on every visit. Each species carries its own level
            of evidence, from clinical trial to traditional record.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-[1.02fr_0.98fr] bg-white border border-line rounded-3xl overflow-hidden min-h-[460px] transition-[border-color] duration-200 hover:border-line-hover">
            <div
              className="relative min-h-[280px] md:min-h-[420px] bg-cover bg-center"
              style={{ backgroundImage: `url(${plantImages[plant.slug]})` }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(22,54,42,0) 55%, rgba(22,54,42,0.35))' }}
              />
              <span className="absolute top-[22px] left-6 font-mono text-[11px] tracking-[0.18em] uppercase text-cream-100/95 bg-forest-900/50 backdrop-blur-[3px] px-[14px] py-[7px] rounded-full">
                {plant.regiao}
              </span>
              <div className="absolute left-6 bottom-[22px] font-mono text-xs tracking-[0.14em] text-cream-100/85">
                {pad2(idx + 1)} / {pad2(plants.length)}
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              {plant.indice != null && dotColor && (
                <div className="inline-flex self-start items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-forest-900 bg-cream-200 px-[13px] py-[6px] rounded-full mb-[22px]">
                  <EvidenceDot color={dotColor} />
                  INDEX {plant.indice}
                </div>
              )}
              <div className="font-display text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.015em] text-forest-900">
                {plant.nomePopular}
              </div>
              <div className="font-display italic font-light text-[19px] text-forest-900/60 mt-1">
                {plant.nomeCientifico}
              </div>
              <p className="text-base leading-[1.62] text-forest-900/72 mt-[22px] max-w-[46ch]">
                {plant.descricaoCurta}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {plant.propriedades.map((p) => (
                  <Pill key={p.nome}>{p.nome}</Pill>
                ))}
              </div>
              <div className="mt-[34px]">
                <Link
                  to={`/planta/${plant.slug}`}
                  className="inline-flex items-center gap-[9px] bg-lime-400 text-forest-900 font-bold text-[15px] px-[26px] py-[14px] rounded-full transition-colors duration-150 hover:bg-lime-300"
                >
                  View details <span className="text-base leading-none">→</span>
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={onPrev}
            aria-label="Previous"
            className="hidden md:flex absolute top-[210px] -left-5 w-[52px] h-[52px] rounded-full border border-line bg-white text-forest-900 text-xl items-center justify-center shadow-[0_12px_30px_-14px_rgba(22,54,42,0.4)] transition-colors duration-150 hover:bg-forest-900 hover:border-forest-900 hover:text-cream-100"
          >
            ←
          </button>
          <button
            onClick={onNext}
            aria-label="Next"
            className="hidden md:flex absolute top-[210px] -right-5 w-[52px] h-[52px] rounded-full border border-line bg-white text-forest-900 text-xl items-center justify-center shadow-[0_12px_30px_-14px_rgba(22,54,42,0.4)] transition-colors duration-150 hover:bg-forest-900 hover:border-forest-900 hover:text-cream-100"
          >
            →
          </button>
        </div>

        <div className="flex md:hidden justify-center gap-4 mt-5">
          <button
            onClick={onPrev}
            aria-label="Previous"
            className="w-11 h-11 rounded-full border border-line bg-white text-forest-900 text-lg flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={onNext}
            aria-label="Next"
            className="w-11 h-11 rounded-full border border-line bg-white text-forest-900 text-lg flex items-center justify-center"
          >
            →
          </button>
        </div>

        <ThumbnailTrack plants={plants} idx={idx} onSelect={onSelect} />
      </div>
    </section>
  );
}
