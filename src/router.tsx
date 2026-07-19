import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { PlantaPage } from './pages/PlantaPage';
import { BuscaPage } from './pages/BuscaPage';
import { EmConstrucao } from './pages/EmConstrucao';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/planta/:slug', element: <PlantaPage /> },
  { path: '/busca', element: <BuscaPage /> },
  { path: '*', element: <EmConstrucao /> },
]);
