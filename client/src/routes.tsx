import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { Servicios } from './pages/Servicios';
import { Acceso } from './pages/Acceso';
import { Pagina404 } from './pages/Pagina404';
import { useAuth } from './auth/AuthContext';
function Protegida({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/acceso" replace />;
}
export const router = createBrowserRouter([{ path: '/', element: <RootLayout />, children: [
  { index: true, element: <Home /> },
  { path: 'acceso', element: <Acceso /> },
  { path: 'servicios', element: <Protegida><Servicios /></Protegida> },
  { path: '*', element: <Pagina404 /> },
]}]);
