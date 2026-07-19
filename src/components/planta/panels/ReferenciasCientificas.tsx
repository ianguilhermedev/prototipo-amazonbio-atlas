import type { Planta } from '../../../data/plants';
import { IllustrativeBadge } from '../../common/IllustrativeBadge';

interface ReferenciasCientificasProps {
  planta: Planta;
}

export function ReferenciasCientificas({ planta }: ReferenciasCientificasProps) {
  return (
    <div>
      {planta.fonteReal ? (
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-forest-900/45 mb-6">
          Fonte: catálogo do Horto de Plantas Medicinais e Aromáticas, Embrapa Amazônia Oriental (2024)
        </p>
      ) : (
        <>
          <IllustrativeBadge />
          <p className="text-[15px] leading-relaxed text-forest-900/70 max-w-[60ch] mt-4 mb-6">
            Exemplo de formato: citações completas, com DOI e link para o texto original, substituiriam esta lista
            numa versão com integração bibliográfica real.
          </p>
        </>
      )}

      {planta.referencias.length === 0 ? (
        <p className="text-sm text-forest-900/50">Nenhuma publicação vinculada a esta espécie no catálogo-fonte.</p>
      ) : (
        <ol className="space-y-4 max-w-[640px]">
          {planta.referencias.map((ref, i) => (
            <li key={i} className="flex gap-4 text-[14.5px] leading-relaxed text-forest-900/75">
              <span className="font-mono text-forest-900/40 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span>{ref}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
