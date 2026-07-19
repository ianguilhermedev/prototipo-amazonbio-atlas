import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { plantas, type NivelEvidencia } from '../data/plants';
import { filtrarPlantas } from '../lib/search';
import { BuscaHeader } from '../components/busca/BuscaHeader';
import { EvidenceFilter } from '../components/busca/EvidenceFilter';
import { SearchResultCard } from '../components/busca/SearchResultCard';
import { Footer } from '../components/layout/Footer';

export function BuscaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [niveis, setNiveis] = useState<Set<NivelEvidencia>>(new Set());

  const resultados = useMemo(() => filtrarPlantas(plantas, query, niveis), [query, niveis]);

  function handleSearch(q: string) {
    setSearchParams(q ? { q } : {});
  }

  function toggleNivel(nivel: NivelEvidencia) {
    setNiveis((prev) => {
      const next = new Set(prev);
      if (next.has(nivel)) next.delete(nivel);
      else next.add(nivel);
      return next;
    });
  }

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col">
      <BuscaHeader initialQuery={query} onSearch={handleSearch} />

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-10 md:py-14 flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-forest-900/50 mb-2">
              {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
              {query && ' para'}
            </div>
            {query && (
              <h1 className="font-display text-[28px] md:text-[34px] leading-tight text-forest-900">
                "<em className="italic text-forest-700">{query}</em>"
              </h1>
            )}
          </div>
          <EvidenceFilter selected={niveis} onToggle={toggleNivel} />
        </div>

        {resultados.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-display text-2xl text-forest-900 mb-3">
              Ainda não catalogamos nada com essas pistas.
            </div>
            <p className="text-forest-900/60 max-w-[48ch] mx-auto">
              Tente um termo mais amplo — o nome de uma família botânica, um sintoma ou um composto — ou limpe os
              filtros de evidência ao lado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((planta) => (
              <SearchResultCard key={planta.slug} planta={planta} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
