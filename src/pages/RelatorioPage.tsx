import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { todasAsPlantas } from '../data/catalog';
import { RelatorioEspecie } from '../components/relatorio/RelatorioEspecie';

export function RelatorioPage() {
  const { slugs } = useCart();
  const plantas = slugs
    .map((slug) => todasAsPlantas.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const geradoEm = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  if (plantas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 text-forest-900 px-6">
        <div className="text-center max-w-md">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-forest-900/50 mb-4">
            Empty report
          </div>
          <h1 className="font-display text-3xl mb-8">No species is currently selected.</h1>
          <Link
            to="/busca"
            className="inline-flex items-center gap-2 bg-lime-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-150 hover:bg-lime-300"
          >
            Explore species <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 text-forest-900">
      <div className="print:hidden sticky top-0 z-10 bg-forest-900 text-cream-100">
        <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/carrinho"
            className="font-mono text-xs uppercase tracking-[0.1em] text-cream-100/70 transition-colors duration-150 hover:text-lime-400"
          >
            ← Back to selection
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-lime-400 text-forest-900 font-semibold text-sm px-5 py-[10px] rounded-full transition-colors duration-150 hover:bg-lime-300"
          >
            Print / save as PDF
          </button>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 md:px-0 py-12 print:py-0 print:max-w-none">
        <header className="mb-16 print:mb-10">
          <div className="font-mono text-xs tracking-[0.28em] uppercase text-forest-900/50 mb-4">
            Species report · amazonbio atlas
          </div>
          <h1 className="font-display text-[34px] md:text-[42px] leading-tight mb-4">
            {plantas.length} species cataloged
          </h1>
          <p className="text-forest-900/60 text-sm">Generated on {geradoEm}</p>

          <ol className="mt-8 space-y-1.5 font-mono text-sm text-forest-900/70">
            {plantas.map((p, i) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} className="hover:text-lime-600 transition-colors duration-150">
                  {i + 1}. {p.nomePopular} — <em className="italic">{p.nomeCientifico}</em>
                </a>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-xs leading-relaxed text-forest-900/50 border-t border-line pt-6">
            This report combines data from two sources: species marked as{' '}
            <strong className="text-forest-900/70">real source</strong> come from the catalog of the Medicinal
            Plants Garden (Embrapa); the others have text written from general sources, without peer review, and
            serve illustrative purposes. The origin of each record is individually identified below. Consult each
            species' bibliographic references for validation in your own research.
          </p>
        </header>

        {plantas.map((planta, i) => (
          <RelatorioEspecie key={planta.slug} planta={planta} indice={i + 1} />
        ))}
      </div>
    </div>
  );
}
