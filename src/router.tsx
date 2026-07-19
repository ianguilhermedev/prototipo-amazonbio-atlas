import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { PlantaPage } from './pages/PlantaPage';
import { BuscaPage } from './pages/BuscaPage';
import { CarrinhoPage } from './pages/CarrinhoPage';
import { RelatorioPage } from './pages/RelatorioPage';
import { EmConstrucao } from './pages/EmConstrucao';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/planta/:slug', element: <PlantaPage /> },
  { path: '/busca', element: <BuscaPage /> },
  { path: '/carrinho', element: <CarrinhoPage /> },
  { path: '/relatorio', element: <RelatorioPage /> },
  { path: '*', element: <EmConstrucao /> },
]);
