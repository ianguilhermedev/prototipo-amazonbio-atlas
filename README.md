# AmazonBio Atlas — MVP

MVP interativo do AmazonBio Atlas, fiel ao arquivo de design aprovado
`AmazonBio Atlas Home.html` para a Home, e estendendo a mesma linguagem
visual para a busca e a página de espécie. Construído com Vite + React +
TypeScript + Tailwind CSS + React Router.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Extração de imagens reais

As 5 fotos reais (logo e 4 espécies) e o fundo do hero usados neste projeto
já foram extraídos do arquivo de referência `AmazonBio Atlas Home.html` (que
as embute como base64) e salvos em `src/assets/images/`. Caso precise
reextrair (por exemplo, para adicionar fotos de novas espécies presentes no
mesmo arquivo), rode:

```bash
npm run extract-assets
```

## Escopo desta entrega

- **`/`** — Home: hero com busca e preview ao vivo, carrossel de espécies em
  destaque e seção do sistema de evidências (taxonomia corrigida de 4
  níveis).
- **`/planta/:slug`** — página da espécie: cabeçalho com selos de evidência,
  8 abas (4 funcionais com dado real do mock — Visão Geral, Compostos
  Químicos, Propriedades, Linha do Tempo Científica — e 4 marcadas como
  "dados ilustrativos" — Similaridade de Compostos, Conhecimento Tradicional,
  Radar da Biodiversidade, Referências Científicas).
- **`/busca?q=`** — busca com filtro por nível de evidência sobre o mock,
  reaproveitando o visual do card do carrossel em grade estática, e estado
  vazio com a mesma voz editorial do site.

4 espécies estão no dataset (Unha-de-gato, Andiroba, Copaíba, Jaborandi).
Qualquer outra rota mostra uma tela de "em construção", não um erro.

## Estrutura

```
src/
  data/plants.ts       # mock de espécies (dataset ilustrativo)
  data/plantImages.ts  # mapa slug -> foto real extraída
  lib/evidence.ts       # fonte única da taxonomia de evidência (4 níveis)
  lib/search.ts         # filtro de busca (texto + nível de evidência)
  components/layout/    # Nav, Footer
  components/common/    # Pill, EvidenceDot, IllustrativeBadge
  components/home/      # Hero, HeroSearchBar, SpeciesCarousel, ThumbnailTrack, EvidenceSystem
  components/planta/    # PlantaHeader, TabBar, panels/ (8 abas)
  components/busca/     # BuscaHeader, EvidenceFilter, SearchResultCard
  pages/Home.tsx
  pages/PlantaPage.tsx
  pages/BuscaPage.tsx
  pages/EmConstrucao.tsx
  router.tsx
```
