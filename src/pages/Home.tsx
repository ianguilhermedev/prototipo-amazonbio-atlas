import { useState } from 'react';
import { todasAsPlantas } from '../data/catalog';
import { amostraAleatoria } from '../lib/random';
import { Hero } from '../components/home/Hero';
import { SpeciesCarousel } from '../components/home/SpeciesCarousel';
import { EvidenceSystem } from '../components/home/EvidenceSystem';
import { Footer } from '../components/layout/Footer';

const QUANTIDADE_DESTAQUE = 6;

// Sorteada uma vez por carregamento da página (não a cada re-render) para
// que "Espécies em destaque" varie entre visitas sem trocar de espécie no
// meio da navegação do carrossel. Exige ao menos 1 propriedade documentada,
// para não sortear os raros registros do catálogo sem nada preenchido.
function sortearDestaque() {
  const elegiveis = todasAsPlantas.filter((p) => p.propriedades.length > 0);
  return amostraAleatoria(elegiveis, QUANTIDADE_DESTAQUE);
}

export function Home() {
  const [destaque] = useState(sortearDestaque);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + destaque.length) % destaque.length);
  const next = () => setIdx((i) => (i + 1) % destaque.length);

  return (
    <div className="w-full overflow-x-hidden">
      <Hero activePlant={destaque[idx]} />
      <SpeciesCarousel plants={destaque} idx={idx} onPrev={prev} onNext={next} onSelect={setIdx} />
      <EvidenceSystem />
      <Footer />
    </div>
  );
}
