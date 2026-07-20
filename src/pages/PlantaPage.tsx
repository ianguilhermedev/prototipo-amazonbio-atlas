import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlantaBySlug } from '../data/catalog';
import { PlantaHeader } from '../components/planta/PlantaHeader';
import { TabBar } from '../components/planta/TabBar';
import { VisaoGeral } from '../components/planta/panels/VisaoGeral';
import { CompostosQuimicos } from '../components/planta/panels/CompostosQuimicos';
import { Propriedades } from '../components/planta/panels/Propriedades';
import { LinhaDoTempo } from '../components/planta/panels/LinhaDoTempo';
import { SimilaridadeCompostos } from '../components/planta/panels/SimilaridadeCompostos';
import { ConhecimentoTradicional } from '../components/planta/panels/ConhecimentoTradicional';
import { RadarBiodiversidade } from '../components/planta/panels/RadarBiodiversidade';
import { ReferenciasCientificas } from '../components/planta/panels/ReferenciasCientificas';
import { Footer } from '../components/layout/Footer';

export function PlantaPage() {
  const { slug } = useParams<{ slug: string }>();
  const planta = slug ? getPlantaBySlug(slug) : undefined;
  const [tab, setTab] = useState('visao-geral');

  if (!planta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 text-forest-900 px-6">
        <div className="text-center max-w-md">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-forest-900/50 mb-4">
            Species not found
          </div>
          <h1 className="font-display text-3xl mb-8">There is no record for this slug in the collection.</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-lime-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-150 hover:bg-lime-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <PlantaHeader planta={planta} />
      <TabBar active={tab} onChange={setTab} />

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-12 md:py-16">
        {tab === 'visao-geral' && <VisaoGeral planta={planta} />}
        {tab === 'compostos' && <CompostosQuimicos planta={planta} />}
        {tab === 'propriedades' && <Propriedades planta={planta} />}
        {tab === 'timeline' && <LinhaDoTempo planta={planta} />}
        {tab === 'similaridade' && <SimilaridadeCompostos planta={planta} />}
        {tab === 'tradicional' && <ConhecimentoTradicional planta={planta} />}
        {tab === 'radar' && <RadarBiodiversidade />}
        {tab === 'referencias' && <ReferenciasCientificas planta={planta} />}
      </div>

      <Footer />
    </div>
  );
}
