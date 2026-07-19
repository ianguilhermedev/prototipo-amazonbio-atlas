import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { todasAsPlantas } from '../data/catalog';
import { plantImages } from '../data/plantImages';
import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';

export function CarrinhoPage() {
  const { slugs, remove, clear } = useCart();
  const plantas = slugs
    .map((slug) => todasAsPlantas.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col">
      <div className="bg-forest-900">
        <Nav />
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-4 pb-14">
          <div className="font-mono text-xs tracking-[0.28em] uppercase text-lime-400 mb-4">
            Seleção para relatório
          </div>
          <h1 className="font-display text-[32px] md:text-[44px] leading-tight text-cream-100">
            {plantas.length} {plantas.length === 1 ? 'espécie selecionada' : 'espécies selecionadas'}
          </h1>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-12 md:py-16 flex-1 w-full">
        {plantas.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-display text-2xl text-forest-900 mb-3">Sua seleção está vazia.</div>
            <p className="text-forest-900/60 max-w-[48ch] mx-auto mb-8">
              Adicione espécies pelo acervo ou pela busca para reunir os dados delas em um relatório.
            </p>
            <Link
              to="/busca"
              className="inline-flex items-center gap-2 bg-lime-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-150 hover:bg-lime-300"
            >
              Explorar espécies <span className="text-base leading-none">→</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-10">
              {plantas.map((planta) => {
                const foto = plantImages[planta.slug];
                return (
                  <div
                    key={planta.slug}
                    className="flex items-center gap-4 bg-white border border-line rounded-2xl p-4"
                  >
                    <div
                      className={`w-16 h-16 rounded-xl bg-cover bg-center shrink-0 ${!foto ? 'bg-gradient-to-br from-forest-700 to-forest-900' : ''}`}
                      style={foto ? { backgroundImage: `url(${foto})` } : undefined}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-lg text-forest-900 truncate">{planta.nomePopular}</div>
                      <div className="font-display italic font-light text-sm text-forest-900/55 truncate">
                        {planta.nomeCientifico}
                      </div>
                    </div>
                    <Link
                      to={`/planta/${planta.slug}`}
                      className="font-mono text-xs uppercase tracking-[0.08em] text-forest-900/50 hover:text-forest-900 transition-colors duration-150 whitespace-nowrap"
                    >
                      Ver
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(planta.slug)}
                      className="font-mono text-xs uppercase tracking-[0.08em] text-forest-900/50 hover:text-red-600 transition-colors duration-150 whitespace-nowrap"
                    >
                      Remover
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/relatorio"
                className="inline-flex items-center gap-2 bg-lime-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-150 hover:bg-lime-300"
              >
                Gerar relatório <span className="text-base leading-none">→</span>
              </Link>
              <button
                type="button"
                onClick={clear}
                className="font-mono text-xs uppercase tracking-[0.1em] text-forest-900/50 hover:text-forest-900 transition-colors duration-150"
              >
                Limpar seleção
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
