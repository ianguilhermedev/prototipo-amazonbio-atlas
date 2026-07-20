import type { Planta } from '../../data/plants';
import { plantImages } from '../../data/plantImages';

interface ThumbnailTrackProps {
  plants: Planta[];
  idx: number;
  onSelect: (i: number) => void;
}

export function ThumbnailTrack({ plants, idx, onSelect }: ThumbnailTrackProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[22px]">
      {plants.map((plant, i) => {
        const active = i === idx;
        return (
          <button
            key={plant.slug}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-colors duration-150 ${
              active ? 'border-forest-900 bg-white' : 'border-line/70 bg-white/50 hover:border-line-thumb-hover'
            }`}
          >
            <div
              className="w-[52px] h-[52px] rounded-[10px] shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${plantImages[plant.slug]})` }}
            />
            <div className="min-w-0">
              <div className="font-display text-[17px] leading-tight text-forest-900 whitespace-nowrap overflow-hidden text-ellipsis">
                {plant.nomePopular}
              </div>
              <div className="font-mono text-[10.5px] tracking-[0.1em] text-forest-900/55 mt-1">
                INDEX {plant.indice}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
