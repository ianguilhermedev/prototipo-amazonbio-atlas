import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Planta } from '../../data/plants';
import { Pill } from '../common/Pill';

const chips = ['Uncaria tomentosa', 'Anti-inflammatory', 'Alkaloids', 'Wound healing'];

interface HeroSearchBarProps {
  activePlant: Planta;
}

export function HeroSearchBar({ activePlant }: HeroSearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(`/busca?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="max-w-[760px] mx-auto mt-10 md:mt-[52px]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-cream-100 rounded-full pl-5 md:pl-[26px] pr-[9px] py-[9px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]"
      >
        <span className="hidden sm:inline font-mono text-[11px] tracking-[0.18em] uppercase text-forest-900/42 whitespace-nowrap">
          Search
        </span>
        <div className="hidden sm:block w-px h-[26px] bg-forest-900/14" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Species, active compound, or therapeutic property…"
          className="flex-1 min-w-0 border-none outline-none bg-transparent font-body text-[17px] text-forest-900 py-3 px-1"
        />
        <button
          type="submit"
          className="flex items-center gap-[9px] bg-lime-400 text-forest-900 font-semibold text-[15px] px-5 md:px-7 py-[15px] rounded-full whitespace-nowrap transition-colors duration-150 hover:bg-lime-300"
        >
          <span className="hidden sm:inline">Search</span>
          <span className="text-[17px] leading-none">→</span>
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-[10px] mt-[22px]">
        {chips.map((chip) => (
          <a
            key={chip}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setQuery(chip);
            }}
            className="text-[13.5px] text-cream-100/78 px-4 py-2 border border-cream-100/22 rounded-full transition-colors duration-150 hover:text-lime-400 hover:border-lime-400/60"
          >
            {chip}
          </a>
        ))}
      </div>

      {/* Live preview: mirrors the species currently focused in the carousel
          below, not a real search result — kept low-contrast, text + tags
          only, no photo/score/"resultado" chrome, so it never reads as a
          fabricated match for whatever the user has typed above. */}
      <div className="mt-6 md:mt-7">
        <div className="inline-flex items-center gap-[9px] font-mono text-[11px] tracking-[0.18em] uppercase text-cream-100/55 mb-3">
          <span className="w-[6px] h-[6px] rounded-full bg-lime-400 animate-pulse" />
          In focus in the collection
        </div>
        <div className="rounded-2xl bg-cream-100/[0.08] border border-cream-100/15 backdrop-blur-sm px-5 py-4">
          <div key={activePlant.slug} className="animate-fade-in flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="shrink-0 text-left">
              <div className="font-semibold text-sm text-cream-100">{activePlant.nomePopular}</div>
              <div className="font-display italic font-light text-[15px] text-lime-400/90">
                {activePlant.nomeCientifico}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end sm:flex-1">
              {activePlant.propriedades.slice(0, 3).map((p) => (
                <Pill key={p.nome} variant="dark">
                  {p.nome}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
