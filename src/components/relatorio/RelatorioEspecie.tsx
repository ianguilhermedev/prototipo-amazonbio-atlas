import type { ReactNode } from 'react';
import type { Planta } from '../../data/plants';
import { plantImages } from '../../data/plantImages';
import { getAtribuicaoFoto } from '../../data/photoAttribution';
import { EVIDENCIA } from '../../lib/evidence';

interface RelatorioEspecieProps {
  planta: Planta;
  indice: number;
}

export function RelatorioEspecie({ planta, indice }: RelatorioEspecieProps) {
  const foto = plantImages[planta.slug];
  const atribuicao = getAtribuicaoFoto(planta.slug);

  return (
    <section
      id={planta.slug}
      className="py-12 border-t border-line first:border-t-0 first:pt-0 print:break-before-page print:border-t-0 print:pt-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
        <h2 className="font-display text-[26px] md:text-[30px] text-forest-900">
          {indice}. {planta.nomePopular}
        </h2>
        <span
          className={`font-mono text-[10.5px] tracking-[0.12em] uppercase px-3 py-[6px] rounded-full border whitespace-nowrap ${
            planta.fonteReal
              ? 'text-forest-700 border-forest-700/30 bg-lime-400/15'
              : 'text-forest-900/55 border-line bg-cream-200'
          }`}
        >
          {planta.fonteReal ? 'Fonte: catálogo real (Horto/Embrapa)' : 'Dados ilustrativos — não revisados por pares'}
        </span>
      </div>
      <div className="font-display italic font-light text-lg text-forest-900/60 mb-1">{planta.nomeCientifico}</div>
      <div className="font-mono text-xs tracking-[0.1em] uppercase text-forest-900/45 mb-6">
        {planta.familia} · {planta.regiao}
      </div>

      {foto && (
        <figure className="mb-6">
          <img
            src={foto}
            alt={planta.nomePopular}
            className="w-full h-[220px] object-cover rounded-2xl print:break-inside-avoid"
          />
          {atribuicao && (
            <figcaption className="font-mono text-[10px] text-forest-900/45 mt-2">
              Foto: {atribuicao.creator} · {atribuicao.licenseLabel} · {atribuicao.fonte}
            </figcaption>
          )}
        </figure>
      )}

      <p className="text-[15px] leading-relaxed text-forest-900/85 mb-3">{planta.descricaoCurta}</p>
      <p className="text-[15px] leading-relaxed text-forest-900/70 mb-6">{planta.descricaoLonga}</p>

      {planta.compostos.length > 0 && (
        <Bloco titulo="Compostos ativos">
          <p className="text-sm text-forest-900/75">{planta.compostos.join(', ')}</p>
        </Bloco>
      )}

      {planta.propriedades.length > 0 && (
        <Bloco titulo="Propriedades farmacológicas">
          <ul className="space-y-1">
            {planta.propriedades.map((p) => (
              <li key={p.nome} className="text-sm text-forest-900/75 flex items-center gap-2">
                <span
                  className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
                  style={{ background: EVIDENCIA[p.evidencia].color }}
                />
                {p.nome} <span className="text-forest-900/45">— {EVIDENCIA[p.evidencia].label}</span>
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {planta.sintomasDoencas.length > 0 && (
        <Bloco titulo="Indicações e sintomas associados">
          <p className="text-sm text-forest-900/75">{planta.sintomasDoencas.join(', ')}</p>
        </Bloco>
      )}

      {planta.usoTradicional && (
        <Bloco titulo="Uso tradicional">
          <p className="text-sm text-forest-900/75">{planta.usoTradicional}</p>
        </Bloco>
      )}

      {planta.timeline.length > 0 && (
        <Bloco titulo="Linha do tempo">
          <ul className="space-y-1">
            {planta.timeline.map((e) => (
              <li key={e.ano} className="text-sm text-forest-900/75">
                <span className="font-mono text-forest-900/50">{e.ano}</span> — {e.evento}
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {planta.referencias.length > 0 && (
        <Bloco titulo="Referências bibliográficas">
          <ol className="space-y-1.5 list-decimal list-inside">
            {planta.referencias.map((r) => (
              <li key={r} className="text-sm text-forest-900/75">
                {r}
              </li>
            ))}
          </ol>
        </Bloco>
      )}

      {planta.similaridade.length > 0 && (
        <Bloco titulo="Espécies relacionadas">
          <p className="text-sm text-forest-900/75">{planta.similaridade.join(', ')}</p>
        </Bloco>
      )}
    </section>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="mb-6 print:break-inside-avoid">
      <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-forest-900/45 mb-2">{titulo}</div>
      {children}
    </div>
  );
}
