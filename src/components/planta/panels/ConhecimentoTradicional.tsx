import type { Planta } from '../../../data/plants';
import { IllustrativeBadge } from '../../common/IllustrativeBadge';

interface ConhecimentoTradicionalProps {
  planta: Planta;
}

export function ConhecimentoTradicional({ planta }: ConhecimentoTradicionalProps) {
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
            Exemplo de painel: em uma versão futura, este espaço reuniria múltiplos registros etnobotânicos com
            fonte, comunidade e data de coleta. Por ora, um único relato-síntese ilustra o formato.
          </p>
        </>
      )}
      <div className="bg-white border border-line rounded-2xl p-6 max-w-[640px]">
        <p className="text-[15.5px] leading-[1.7] text-forest-900/78">{planta.usoTradicional}</p>
      </div>
    </div>
  );
}
