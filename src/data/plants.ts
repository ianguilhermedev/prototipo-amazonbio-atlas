// Dataset ilustrativo — mock data para o MVP de demonstração do AmazonBio Atlas.
// As 4 espécies abaixo replicam os textos já aprovados no arquivo de design de
// referência; os campos ausentes do arquivo original (familia, sintomasDoencas,
// similaridade, timeline, referencias) foram redigidos no mesmo tom editorial,
// mas não representam pesquisa real.

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
  indice: number; // 0–100
  fotoDescricao: string; // orientação para a foto real usada (macro, fundo neutro)
  descricaoCurta: string;
  descricaoLonga: string;
  compostos: string[];
  propriedades: Propriedade[];
  sintomasDoencas: string[];
  similaridade: string[]; // slugs de outras plantas
  usoTradicional: string;
  timeline: EventoTimeline[];
  referencias: string[];
}

export const plantas: Planta[] = [
  {
    slug: 'unha-de-gato',
    nomePopular: 'Unha-de-gato',
    nomeCientifico: 'Uncaria tomentosa',
    familia: 'Rubiaceae',
    regiao: 'Amazônia Ocidental',
    indice: 92,
    fotoDescricao: 'Macro do córtex seco e fragmentado, tom castanho-avermelhado, fundo neutro.',
    descricaoCurta:
      'Trepadeira lenhosa cujo córtex concentra alcaloides oxindólicos com forte ação sobre o sistema imune.',
    descricaoLonga:
      'Cipó nativo das florestas de terra firme, a unha-de-gato tem seu córtex interno historicamente decoccionado. Os alcaloides oxindólicos pentacíclicos são associados à modulação da resposta imune e ao controle de processos inflamatórios crônicos, com o corpo de evidência mais robusto entre as espécies desta seleção.',
    compostos: ['Alcaloides oxindólicos', 'Glicosídeos do ácido quinóvico', 'Polifenóis'],
    propriedades: [
      { nome: 'Imunomodulador', evidencia: 'clinica' },
      { nome: 'Anti-inflamatório', evidencia: 'clinica' },
      { nome: 'Antioxidante', evidencia: 'pre-clinica' },
    ],
    sintomasDoencas: ['Inflamação articular', 'Baixa imunidade', 'Artrite'],
    similaridade: ['copaiba'],
    usoTradicional:
      'Empregada por povos amazônicos em decocções do córtex para inflamações articulares e como fortificante geral do organismo.',
    timeline: [
      { ano: 1994, evento: 'Primeiros isolamentos de alcaloides oxindólicos pentacíclicos documentados em literatura científica.' },
      { ano: 2001, evento: 'Ensaios clínicos iniciais avaliam efeito sobre marcadores inflamatórios em humanos.' },
      { ano: 2015, evento: 'Revisões sistemáticas consolidam uso como adjuvante imunomodulador.' },
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
    regiao: 'Baixo Amazonas',
    indice: 88,
    fotoDescricao: 'Macro do óleo denso extraído das sementes, tom âmbar, fundo neutro.',
    descricaoCurta:
      'Árvore de grande porte cujas sementes fornecem um óleo denso, tradicionalmente usado em cicatrização e repelência.',
    descricaoLonga:
      'O óleo extraído das sementes da andiroba é rico em ácidos graxos e limonoides como a andirobina. É aplicado topicamente em processos cicatriciais, contra inflamações da pele e como repelente natural de insetos, com respaldo pré-clínico consistente e amplo registro etnobotânico.',
    compostos: ['Andirobina', 'Limonoides', 'Ácidos graxos insaturados'],
    propriedades: [
      { nome: 'Cicatrizante', evidencia: 'pre-clinica' },
      { nome: 'Antisséptico', evidencia: 'in-vitro' },
      { nome: 'Repelente', evidencia: 'tradicional' },
    ],
    sintomasDoencas: ['Feridas superficiais', 'Picadas de inseto', 'Inflamação da pele'],
    similaridade: ['copaiba'],
    usoTradicional:
      'Óleo das sementes usado em massagens, no cuidado de feridas e queimaduras e como base de velas repelentes em comunidades ribeirinhas.',
    timeline: [
      { ano: 1985, evento: 'Estudos etnobotânicos catalogam o uso ribeirinho do óleo extraído a frio.' },
      { ano: 2006, evento: 'Pesquisas isolam a andirobina e caracterizam seu perfil de limonoides.' },
      { ano: 2018, evento: 'Ensaios pré-clínicos avaliam ação cicatrizante tópica em modelos animais.' },
    ],
    referencias: [
      'Penido et al., "Anti-inflammatory effects of Carapa guianensis oil", Journal of Ethnopharmacology.',
      'Silva et al., "Larvicidal and repellent activity of andiroba oil", Parasitology Research.',
    ],
  },
  {
    slug: 'copaiba',
    nomePopular: 'Copaíba',
    nomeCientifico: 'Copaifera officinalis',
    familia: 'Fabaceae',
    regiao: 'Amazônia Central',
    indice: 90,
    fotoDescricao: 'Macro da oleorresina translúcida em recipiente de vidro, fundo neutro.',
    descricaoCurta:
      'Árvore que exsuda uma oleorresina translúcida, uma das substâncias medicinais mais estudadas da floresta.',
    descricaoLonga:
      'A oleorresina de copaíba, coletada por perfuração do tronco, concentra sesquiterpenos como o β-cariofileno e ácidos diterpênicos. É investigada por suas ações analgésica, anti-inflamatória e antimicrobiana, figurando entre os produtos florestais não-madeireiros mais comercializados.',
    compostos: ['β-cariofileno', 'Ácido copálico', 'Sesquiterpenos'],
    propriedades: [
      { nome: 'Analgésico', evidencia: 'clinica' },
      { nome: 'Antimicrobiano', evidencia: 'in-vitro' },
      { nome: 'Anti-inflamatório', evidencia: 'clinica' },
    ],
    sintomasDoencas: ['Dor muscular', 'Feridas', 'Afecções respiratórias'],
    similaridade: ['unha-de-gato', 'andiroba'],
    usoTradicional:
      'A resina é ingerida em pequenas doses ou aplicada sobre a pele para dores, feridas e afecções respiratórias.',
    timeline: [
      { ano: 1972, evento: 'Levantamentos farmacognósticos catalogam as espécies de Copaifera usadas na região.' },
      { ano: 2008, evento: 'Estudos caracterizam o perfil de sesquiterpenos e sua ação anti-inflamatória.' },
      { ano: 2019, evento: 'Ensaios clínicos avaliam eficácia analgésica tópica em pequenas amostras.' },
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
    regiao: 'Amazônia Oriental',
    indice: 84,
    fotoDescricao: 'Macro de folhas secas empilhadas, tom verde-oliva, fundo neutro.',
    descricaoCurta:
      'Arbusto cujas folhas são a fonte natural da pilocarpina, alcaloide de uso oftalmológico consagrado.',
    descricaoLonga:
      'As folhas do jaborandi contêm pilocarpina, alcaloide colinérgico extraído industrialmente para o tratamento do glaucoma e da xerostomia. A espécie ilustra a ponte entre o conhecimento tradicional e a farmacologia moderna, ainda que parte de suas indicações populares careça de validação clínica.',
    compostos: ['Pilocarpina', 'Isopilocarpina', 'Óleos essenciais'],
    propriedades: [
      { nome: 'Estimulante', evidencia: 'tradicional' },
      { nome: 'Sialagogo', evidencia: 'clinica' },
      { nome: 'Alcaloides', evidencia: 'in-vitro' },
    ],
    sintomasDoencas: ['Glaucoma', 'Xerostomia', 'Baixa salivação'],
    similaridade: [],
    usoTradicional:
      'Infusão das folhas usada tradicionalmente como sudorífico e para estimular a salivação e o couro cabeludo.',
    timeline: [
      { ano: 1875, evento: 'Isolamento inicial da pilocarpina a partir das folhas do jaborandi.' },
      { ano: 1950, evento: 'Uso da pilocarpina se consolida no tratamento do glaucoma.' },
      { ano: 1994, evento: 'Aprovação de formulação oral para xerostomia pós-radioterapia.' },
    ],
    referencias: [
      'Holmstedt et al., "Jaborandi: an interdisciplinary approach", Journal of Ethnopharmacology.',
      'Fox, "Pilocarpine and cevimeline in the treatment of xerostomia", Clinical Reviews.',
    ],
  },
];

export function getPlantaBySlug(slug: string): Planta | undefined {
  return plantas.find((p) => p.slug === slug);
}
