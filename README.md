# AmazonBio Atlas — MVP (Home)

MVP interativo da Home do AmazonBio Atlas, fiel ao arquivo de design aprovado
`AmazonBio Atlas Home.html`. Construído com Vite + React + TypeScript +
Tailwind CSS + React Router.

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

## Escopo desta etapa

Esta entrega cobre apenas a **Home** (rota `/`), conforme a ordem de execução
sugerida no prompt do projeto: hero com busca e preview ao vivo, carrossel de
espécies em destaque (4 espécies: Unha-de-gato, Andiroba, Copaíba,
Jaborandi) e seção do sistema de evidências (com a taxonomia corrigida de 4
níveis). As rotas `/planta/:slug` e `/busca` ainda não foram construídas —
navegar para elas (ex.: clicando em "Ver detalhes") mostra uma tela de
"em construção", não um erro.

## Estrutura

```
src/
  data/plants.ts       # mock de espécies (dataset ilustrativo)
  data/plantImages.ts  # mapa slug -> foto real extraída
  lib/evidence.ts       # fonte única da taxonomia de evidência (4 níveis)
  components/layout/    # Nav, Footer
  components/home/      # Hero, HeroSearchBar, SpeciesCarousel, ThumbnailTrack, EvidenceSystem
  components/common/    # Pill, EvidenceDot
  pages/Home.tsx
  pages/EmConstrucao.tsx
  router.tsx
```
