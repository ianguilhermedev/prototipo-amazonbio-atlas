import { useEffect, useState, type FormEvent } from 'react';
import { Nav } from '../layout/Nav';

interface BuscaHeaderProps {
  initialQuery: string;
  onSearch: (q: string) => void;
}

export function BuscaHeader({ initialQuery, onSearch }: BuscaHeaderProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <div className="bg-forest-900">
      <Nav />
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-4 pb-14">
        <div className="font-mono text-xs tracking-[0.28em] uppercase text-lime-400 mb-6">
          Base científica · busca no acervo
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-cream-100 rounded-full pl-5 md:pl-[26px] pr-[9px] py-[9px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] max-w-[760px]"
        >
          <span className="hidden sm:inline font-mono text-[11px] tracking-[0.18em] uppercase text-forest-900/42 whitespace-nowrap">
            Buscar
          </span>
          <div className="hidden sm:block w-px h-[26px] bg-forest-900/14" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Espécie, composto ativo ou propriedade terapêutica…"
            className="flex-1 min-w-0 border-none outline-none bg-transparent font-body text-[17px] text-forest-900 py-3 px-1"
          />
          <button
            type="submit"
            className="flex items-center gap-[9px] bg-lime-400 text-forest-900 font-semibold text-[15px] px-5 md:px-7 py-[15px] rounded-full whitespace-nowrap transition-colors duration-150 hover:bg-lime-300"
          >
            <span className="hidden sm:inline">Pesquisar</span>
            <span className="text-[17px] leading-none">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
