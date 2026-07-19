import { useState } from 'react';
import { plantas } from '../data/plants';
import { Hero } from '../components/home/Hero';
import { SpeciesCarousel } from '../components/home/SpeciesCarousel';
import { EvidenceSystem } from '../components/home/EvidenceSystem';
import { Footer } from '../components/layout/Footer';

export function Home() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + plantas.length) % plantas.length);
  const next = () => setIdx((i) => (i + 1) % plantas.length);

  return (
    <div className="w-full overflow-x-hidden">
      <Hero activePlant={plantas[idx]} />
      <SpeciesCarousel plants={plantas} idx={idx} onPrev={prev} onNext={next} onSelect={setIdx} />
      <EvidenceSystem />
      <Footer />
    </div>
  );
}
