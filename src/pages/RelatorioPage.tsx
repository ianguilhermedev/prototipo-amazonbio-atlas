import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { todasAsPlantas } from '../data/catalog';
import { RelatorioEspecie } from '../components/relatorio/RelatorioEspecie';

export function RelatorioPage() {
  const { slugs } = useCart();
  const plantas = slugs
    .map((slug) => todasAsPlantas.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const geradoEm = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  if (plantas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 text-forest-900 px-6">
        <div className="text-center max-w-md">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-forest-900/50 mb-4">
            Relatório vazio
          </div>
          <h1 className="font-display text-3xl mb-8">Nenhuma espécie está selecionada no momento.</h1>
          <Link
            to="/busca"
            className="inline-flex items-center gap-2 bg-lime-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-150 hover:bg-lime-300"
          >
            Explorar espécies <span className="text-base leading-none">→</span>
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
            ← Voltar à seleção
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-lime-400 text-forest-900 font-semibold text-sm px-5 py-[10px] rounded-full transition-colors duration-150 hover:bg-lime-300"
          >
            Imprimir / salvar em PDF
          </button>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 md:px-0 py-12 print:py-0 print:max-w-none">
        <header className="mb-16 print:mb-10">
          <div className="font-mono text-xs tracking-[0.28em] uppercase text-forest-900/50 mb-4">
            Relatório de espécies · amazonbio atlas
          </div>
          <h1 className="font-display text-[34px] md:text-[42px] leading-tight mb-4">
            {plantas.length} {plantas.length === 1 ? 'espécie catalogada' : 'espécies catalogadas'}
          </h1>
          <p className="text-forest-900/60 text-sm">Gerado em {geradoEm}</p>

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
            Este relatório combina dados de duas origens: espécies marcadas como{' '}
            <strong className="text-forest-900/70">fonte real</strong> vêm do catálogo do Horto de Plantas
            Medicinais (Embrapa); as demais têm textos redigidos a partir de fontes gerais, sem revisão por pares,
            e servem a fins ilustrativos. A origem de cada registro está identificada individualmente abaixo.
            Consulte as referências bibliográficas de cada espécie para validação em pesquisa própria.
          </p>
        </header>

        {plantas.map((planta, i) => (
          <RelatorioEspecie key={planta.slug} planta={planta} indice={i + 1} />
        ))}
      </div>
    </div>
  );
}
