import { Link } from 'react-router-dom';
import type { Planta } from '../../../data/plants';
import { getPlantaBySlug } from '../../../data/catalog';
import { plantImages } from '../../../data/plantImages';
import { IllustrativeBadge } from '../../common/IllustrativeBadge';

interface SimilaridadeCompostosProps {
  planta: Planta;
}

export function SimilaridadeCompostos({ planta }: SimilaridadeCompostosProps) {
  const relacionadas = planta.similaridade.map(getPlantaBySlug).filter((p): p is Planta => Boolean(p));

  return (
    <div>
      <IllustrativeBadge />
      <p className="text-[15px] leading-relaxed text-forest-900/70 max-w-[60ch] mt-4 mb-6">
        Exemplo de visualização: espécies com perfil de compostos ou propriedades próximas ao registro atual. Em uma
        versão futura, esta comparação seria calculada a partir da similaridade estrutural real dos compostos.
      </p>

      {relacionadas.length === 0 ? (
        <p className="text-sm text-forest-900/50">Nenhuma espécie similar catalogada ainda para este registro.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[640px]">
          {relacionadas.map((rel) => (
            <Link
              key={rel.slug}
              to={`/planta/${rel.slug}`}
              className="flex items-center gap-3 bg-white border border-line rounded-2xl p-3 transition-colors duration-150 hover:border-line-hover"
            >
              <div
                className="w-12 h-12 rounded-lg shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${plantImages[rel.slug]})` }}
              />
              <div>
                <div className="font-display text-base text-forest-900">{rel.nomePopular}</div>
                <div className="font-display italic font-light text-[13px] text-forest-900/55">
                  {rel.nomeCientifico}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
