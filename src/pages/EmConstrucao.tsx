import { Link } from 'react-router-dom';

// Placeholder for routes not yet built in this pass (/planta/:slug, /busca).
// Keeps the demo from hitting a jarring blank/error screen when a link is
// clicked ahead of schedule.
export function EmConstrucao() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100 text-forest-900 px-6">
      <div className="text-center max-w-md">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-forest-900/50 mb-4">
          Próxima etapa do MVP
        </div>
        <h1 className="font-display text-3xl mb-4">
          Esta página ainda está em <em className="italic text-forest-700">construção</em>
        </h1>
        <p className="text-forest-900/70 mb-8">
          Esta tela faz parte da próxima etapa da demonstração.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-lime-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-150 hover:bg-lime-300"
        >
          ← Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
