import { EVIDENCIA, EVIDENCIA_ORDEM } from '../../lib/evidence';
import { EvidenceDot } from '../common/EvidenceDot';

export function EvidenceSystem() {
  return (
    <section className="bg-cream-200 text-forest-900">
      <div className="max-w-[1240px] mx-auto px-6 py-16 md:px-12 md:py-[104px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[72px] items-center">
        <div>
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-forest-900/50 mb-[22px]">
            Sistema de evidências
          </div>
          <h2 className="font-display font-normal text-[32px] md:text-[46px] leading-[1.08] tracking-[-0.01em] max-w-[15ch]">
            Nem toda afirmação tem o mesmo <em className="italic text-forest-700">peso</em>
          </h2>
          <p className="text-[16.5px] leading-[1.68] text-forest-900/72 max-w-[46ch] mt-[26px]">
            Cada propriedade atribuída a uma espécie é classificada por um nível de evidência explícito — de ensaios
            clínicos revisados a relatos etnobotânicos documentados. Você sempre sabe sobre o que está pisando.
          </p>
        </div>

        <div className="bg-white border border-line rounded-[20px] p-3">
          {EVIDENCIA_ORDEM.map((nivel, i) => {
            const info = EVIDENCIA[nivel];
            return (
              <div
                key={nivel}
                className={`flex gap-4 px-[18px] py-5 ${
                  i < EVIDENCIA_ORDEM.length - 1 ? 'border-b border-forest-900/[0.08]' : ''
                }`}
              >
                <div className="mt-1">
                  <EvidenceDot color={info.color} size={11} />
                </div>
                <div>
                  <div className="font-mono text-xs font-medium tracking-[0.14em] uppercase text-forest-900">
                    {info.label}
                  </div>
                  <div className="text-[14.5px] leading-[1.55] text-forest-900/66 mt-[5px]">{info.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
