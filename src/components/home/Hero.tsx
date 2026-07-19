import type { Planta } from '../../data/plants';
import { heroBgImg } from '../../data/plantImages';
import { Nav } from '../layout/Nav';
import { HeroSearchBar } from './HeroSearchBar';

interface HeroProps {
  activePlant: Planta;
}

export function Hero({ activePlant }: HeroProps) {
  return (
    <div className="relative bg-forest-900">
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${heroBgImg})` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(22,54,42,0.35) 0%, rgba(22,54,42,0.5) 55%, #16362a 100%), radial-gradient(760px 520px at 82% -6%, rgba(182,224,106,0.10), rgba(182,224,106,0) 60%)',
        }}
      />

      <Nav />

      <header className="relative max-w-[1240px] mx-auto px-6 pt-12 pb-16 md:px-12 md:pt-[78px] md:pb-24 text-center">
        <div className="font-mono text-xs tracking-[0.32em] uppercase text-lime-400 mb-8">
          Base científica · flora medicinal amazônica
        </div>

        <h1 className="font-display font-normal text-[38px] md:text-[56px] lg:text-[76px] leading-[1.06] lg:leading-[1.04] tracking-[-0.015em] text-cream-100 max-w-[15ch] mx-auto">
          A farmácia viva da Amazônia,
          <br />
          <em className="italic font-light text-lime-400">documentada</em> com rigor científico
        </h1>

        <p className="text-lg leading-relaxed text-cream-100/68 max-w-[56ch] mx-auto mt-7">
          Compostos químicos, propriedades terapêuticas e conhecimento tradicional — reunidos numa única base, cada
          afirmação ancorada em seu nível de evidência.
        </p>

        <HeroSearchBar activePlant={activePlant} />

        <div className="inline-flex items-center gap-[9px] mt-16 font-mono text-[11px] tracking-[0.16em] uppercase text-cream-100/50">
          <span className="w-[7px] h-[7px] rounded-full bg-lime-400 shadow-[0_0_0_4px_rgba(182,224,106,0.16)]" />
          +1.000 espécies em catalogação contínua
        </div>
      </header>
    </div>
  );
}
