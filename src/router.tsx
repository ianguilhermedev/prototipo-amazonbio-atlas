import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { EmConstrucao } from './pages/EmConstrucao';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  // NEXT PASS: { path: '/planta/:slug', element: <PlantaPage /> }
  // NEXT PASS: { path: '/busca', element: <BuscaPage /> }
  { path: '*', element: <EmConstrucao /> },
]);
