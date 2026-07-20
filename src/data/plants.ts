// Hand-curated species for the demo — real photos, richer data
// (compounds, timeline, properties with varied evidence). The first 4
// replicate the text already approved in the reference design file; fields
// missing from it, as well as species added later (jambu, pracaxi, ...),
// were written in the same editorial tone from general sources, but do not
// represent curated or peer-reviewed research.
//
// The bulk of the collection (hundreds of species) comes from a real
// catalog via hortoAdapter.ts — see src/data/catalog.ts for the merged list.

export type NivelEvidencia = 'clinica' | 'pre-clinica' | 'in-vitro' | 'tradicional';

export interface Propriedade {
  nome: string;
  evidencia: NivelEvidencia;
}

export interface EventoTimeline {
  ano: number;
  evento: string;
}

export interface Planta {
  slug: string;
  nomePopular: string;
  nomeCientifico: string;
  familia: string;
  regiao: string;
  indice?: number; // 0-100, when the record has a basis for the score
  fotoDescricao: string; // guidance for the real photo used (macro, neutral background)
  descricaoCurta: string;
  descricaoLonga: string;
  compostos: string[];
  propriedades: Propriedade[];
  sintomasDoencas: string[];
  similaridade: string[]; // slugs of other plants
  usoTradicional: string;
  timeline: EventoTimeline[];
  referencias: string[];
  // true for species coming from a real catalog (e.g. hortoAdapter.ts) — in
  // that case usoTradicional/referencias are real data, not illustrative.
  fonteReal?: boolean;
}

export const plantas: Planta[] = [
  {
    slug: 'unha-de-gato',
    nomePopular: "Cat's claw",
    nomeCientifico: 'Uncaria tomentosa',
    familia: 'Rubiaceae',
    regiao: 'Western Amazon',
    indice: 92,
    fotoDescricao: 'Macro of dried, fragmented bark, reddish-brown tone, neutral background.',
    descricaoCurta:
      'Woody vine whose bark concentrates oxindole alkaloids with a strong action on the immune system.',
    descricaoLonga:
      "A vine native to terra firme forests, cat's claw has its inner bark historically prepared as a decoction. Pentacyclic oxindole alkaloids are associated with immune response modulation and control of chronic inflammatory processes, with the most robust body of evidence among the species in this selection.",
    compostos: ['Oxindole alkaloids', 'Quinovic acid glycosides', 'Polyphenols'],
    propriedades: [
      { nome: 'Immunomodulator', evidencia: 'clinica' },
      { nome: 'Anti-inflammatory', evidencia: 'clinica' },
      { nome: 'Antioxidant', evidencia: 'pre-clinica' },
    ],
    sintomasDoencas: ['Joint inflammation', 'Low immunity', 'Arthritis'],
    similaridade: ['copaiba'],
    usoTradicional:
      'Used by Amazonian peoples in bark decoctions for joint inflammation and as a general body fortifier.',
    timeline: [
      { ano: 1994, evento: 'First isolations of pentacyclic oxindole alkaloids documented in scientific literature.' },
      { ano: 2001, evento: 'Initial clinical trials assess effect on inflammatory markers in humans.' },
      { ano: 2015, evento: 'Systematic reviews consolidate use as an immunomodulatory adjuvant.' },
    ],
    referencias: [
      'Keplinger et al., "Uncaria tomentosa (Willd.) DC. — Ethnomedicinal use and pharmacological results", Journal of Ethnopharmacology.',
      'Sandoval et al., "Anti-inflammatory and antioxidant activities of cat\'s claw", Free Radical Biology and Medicine.',
    ],
  },
  {
    slug: 'andiroba',
    nomePopular: 'Andiroba',
    nomeCientifico: 'Carapa guianensis',
    familia: 'Meliaceae',
    regiao: 'Lower Amazon',
    indice: 88,
    fotoDescricao: 'Macro of dense oil extracted from the seeds, amber tone, neutral background.',
    descricaoCurta:
      'Large tree whose seeds provide a dense oil, traditionally used for wound healing and as a repellent.',
    descricaoLonga:
      'The oil extracted from andiroba seeds is rich in fatty acids and limonoids such as andirobin. It is applied topically for wound healing, against skin inflammation, and as a natural insect repellent, with consistent pre-clinical support and extensive ethnobotanical record.',
    compostos: ['Andirobin', 'Limonoids', 'Unsaturated fatty acids'],
    propriedades: [
      { nome: 'Wound healing', evidencia: 'pre-clinica' },
      { nome: 'Antiseptic', evidencia: 'in-vitro' },
      { nome: 'Repellent', evidencia: 'tradicional' },
    ],
    sintomasDoencas: ['Superficial wounds', 'Insect bites', 'Skin inflammation'],
    similaridade: ['copaiba', 'pracaxi'],
    usoTradicional:
      'Seed oil used in massages, wound and burn care, and as a base for repellent candles in riverside communities.',
    timeline: [
      { ano: 1985, evento: 'Ethnobotanical studies catalog riverside use of the cold-extracted oil.' },
      { ano: 2006, evento: 'Research isolates andirobin and characterizes its limonoid profile.' },
      { ano: 2018, evento: 'Pre-clinical trials assess topical wound-healing action in animal models.' },
    ],
    referencias: [
      'Penido et al., "Anti-inflammatory effects of Carapa guianensis oil", Journal of Ethnopharmacology.',
      'Silva et al., "Larvicidal and repellent activity of andiroba oil", Parasitology Research.',
    ],
  },
  {
    slug: 'copaiba',
    nomePopular: 'Copaiba',
    nomeCientifico: 'Copaifera officinalis',
    familia: 'Fabaceae',
    regiao: 'Central Amazon',
    indice: 90,
    fotoDescricao: 'Macro of translucent oleoresin in a glass container, neutral background.',
    descricaoCurta:
      'Tree that exudes a translucent oleoresin, one of the most studied medicinal substances of the forest.',
    descricaoLonga:
      'Copaiba oleoresin, collected by drilling the trunk, concentrates sesquiterpenes such as β-caryophyllene and diterpene acids. It is investigated for its analgesic, anti-inflammatory, and antimicrobial actions, ranking among the most commercially traded non-timber forest products.',
    compostos: ['β-caryophyllene', 'Copalic acid', 'Sesquiterpenes'],
    propriedades: [
      { nome: 'Analgesic', evidencia: 'clinica' },
      { nome: 'Antimicrobial', evidencia: 'in-vitro' },
      { nome: 'Anti-inflammatory', evidencia: 'clinica' },
    ],
    sintomasDoencas: ['Muscle pain', 'Wounds', 'Respiratory conditions'],
    similaridade: ['unha-de-gato', 'andiroba'],
    usoTradicional:
      'The resin is ingested in small doses or applied to the skin for pain, wounds, and respiratory conditions.',
    timeline: [
      { ano: 1972, evento: 'Pharmacognostic surveys catalog the Copaifera species used in the region.' },
      { ano: 2008, evento: 'Studies characterize the sesquiterpene profile and its anti-inflammatory action.' },
      { ano: 2019, evento: 'Clinical trials assess topical analgesic efficacy in small samples.' },
    ],
    referencias: [
      'Veiga Jr. & Pinto, "O gênero Copaifera", Química Nova.',
      'Lima et al., "Anti-inflammatory and analgesic effects of copaiba oleoresin", Phytotherapy Research.',
    ],
  },
  {
    slug: 'jaborandi',
    nomePopular: 'Jaborandi',
    nomeCientifico: 'Pilocarpus microphyllus',
    familia: 'Rutaceae',
    regiao: 'Eastern Amazon',
    indice: 84,
    fotoDescricao: 'Macro of stacked dried leaves, olive-green tone, neutral background.',
    descricaoCurta:
      'Shrub whose leaves are the natural source of pilocarpine, an alkaloid with an established ophthalmological use.',
    descricaoLonga:
      "Jaborandi leaves contain pilocarpine, a cholinergic alkaloid industrially extracted for the treatment of glaucoma and xerostomia. The species illustrates the bridge between traditional knowledge and modern pharmacology, even though part of its popular indications lack clinical validation.",
    compostos: ['Pilocarpine', 'Isopilocarpine', 'Essential oils'],
    propriedades: [
      { nome: 'Stimulant', evidencia: 'tradicional' },
      { nome: 'Sialagogue', evidencia: 'clinica' },
      { nome: 'Alkaloids', evidencia: 'in-vitro' },
    ],
    sintomasDoencas: ['Glaucoma', 'Xerostomia', 'Low salivation'],
    similaridade: ['jambu'],
    usoTradicional:
      'Leaf infusion traditionally used as a sudorific and to stimulate salivation and the scalp.',
    timeline: [
      { ano: 1875, evento: 'Initial isolation of pilocarpine from jaborandi leaves.' },
      { ano: 1950, evento: 'Use of pilocarpine becomes established in glaucoma treatment.' },
      { ano: 1994, evento: 'Approval of an oral formulation for post-radiotherapy xerostomia.' },
    ],
    referencias: [
      'Holmstedt et al., "Jaborandi: an interdisciplinary approach", Journal of Ethnopharmacology.',
      'Fox, "Pilocarpine and cevimeline in the treatment of xerostomia", Clinical Reviews.',
    ],
  },
  {
    slug: 'jambu',
    nomePopular: 'Toothache plant',
    nomeCientifico: 'Acmella oleracea',
    familia: 'Asteraceae',
    regiao: 'Lower Amazon',
    indice: 79,
    fotoDescricao: 'Macro of small yellow button-shaped flowers, green foliage in the background, neutral background.',
    descricaoCurta:
      'Herbaceous plant whose flowers and leaves produce a characteristic tingling and numbing sensation, used in cooking and Amazonian folk medicine.',
    descricaoLonga:
      "Native to the Amazon and cultivated mainly in Pará, jambu is a central ingredient in dishes like tacacá and duck in tucupi. Its flowers and leaves contain spilanthol, an alkylamide responsible for the numbing, tingling sensation in the mouth, historically explored as a topical anesthetic and salivation stimulant.",
    compostos: ['Spilanthol', 'Flavonoids', 'Essential oils'],
    propriedades: [
      { nome: 'Topical anesthetic', evidencia: 'pre-clinica' },
      { nome: 'Anti-inflammatory', evidencia: 'in-vitro' },
      { nome: 'Sialagogue', evidencia: 'tradicional' },
    ],
    sintomasDoencas: ['Toothache', 'Mouth ulcers', 'Low salivation'],
    similaridade: ['jaborandi'],
    usoTradicional:
      'Flowers chewed fresh or taken as an infusion to relieve toothache and stimulate salivation; also consumed as an appetite stimulant in typical dishes from Pará.',
    timeline: [
      { ano: 1899, evento: 'First botanical descriptions of the species in northern Brazil.' },
      { ano: 1996, evento: 'Isolation and characterization of spilanthol as the compound responsible for the anesthetic effect.' },
      { ano: 2012, evento: 'Pre-clinical studies assess topical anesthetic potential in dentistry.' },
    ],
    referencias: [
      'Prachayasittikul et al., "Acmella oleracea: A plant with a long history of use", Molecules.',
      'Barbosa et al., "Spilanthol content and topical anesthetic effect of Acmella oleracea", Journal of Ethnopharmacology.',
    ],
  },
  {
    slug: 'pracaxi',
    nomePopular: 'Pracaxi',
    nomeCientifico: 'Pentaclethra macroloba',
    familia: 'Fabaceae',
    regiao: 'Lower Amazon',
    indice: 81,
    fotoDescricao: 'Macro of peeled seeds on a banana leaf, light brown tone, neutral background.',
    descricaoCurta:
      'Floodplain tree whose seeds provide an oil rich in fatty acids, traditionally used for skin and hair care.',
    descricaoLonga:
      'Pracaxi is a common tree in the flooded forests of the Amazon. Its seeds, after processing, yield a vegetable butter rich in behenic acid and other long-chain fatty acids, used by riverside communities for wound healing and hair strengthening, with growing use in the cosmetics industry.',
    compostos: ['Behenic acid', 'Oleic acid', 'Saponins'],
    propriedades: [
      { nome: 'Wound healing', evidencia: 'pre-clinica' },
      { nome: 'Anti-inflammatory', evidencia: 'in-vitro' },
      { nome: 'Emollient', evidencia: 'tradicional' },
    ],
    sintomasDoencas: ['Wounds', 'Dry skin', 'Hair loss'],
    similaridade: ['andiroba'],
    usoTradicional:
      'Seed oil applied to wounds, insect bites, and the scalp to strengthen hair, widely used among riverside communities of the lower Amazon.',
    timeline: [
      { ano: 1978, evento: 'First ethnobotanical records of pracaxi oil use by riverside communities.' },
      { ano: 2009, evento: 'Chemical characterization of pracaxi butter and its high behenic acid content.' },
      { ano: 2017, evento: 'Expansion of pracaxi butter use in the domestic cosmetics industry.' },
    ],
    referencias: [
      'Oliveira et al., "Pentaclethra macroloba seed oil: composition and skin applications", Industrial Crops and Products.',
      'Rodrigues et al., "Traditional use and phytochemistry of Amazonian oilseeds", Economia Botânica.',
    ],
  },
];
