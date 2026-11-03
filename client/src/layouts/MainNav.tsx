import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
export const MainNav = () => {
  const { token, nombre, salir } = useAuth();
  const navegar = useNavigate();
  const link = 'rounded-full px-4 py-2 text-sm font-semibold hover:bg-surface-subtle';
  return <nav className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur"><div className="max-w-7xl mx-auto px-3 py-3 flex flex-wrap justify-between items-center gap-3">
    <div className="flex gap-2"><NavLink className={link} to="/">Inicio</NavLink><NavLink className={link} to="/servicios">Servicios</NavLink></div>
    <div className="flex items-center gap-3">{token ? <><span className="text-sm text-muted">Hola, {nombre}</span><button className="bg-primary text-white px-4 py-2 rounded-full text-sm cursor-pointer" onClick={() => { salir(); navegar('/acceso'); }}>Cerrar sesión</button></> : <NavLink className="bg-primary text-white px-4 py-2 rounded-full text-sm" to="/acceso">Ingresar / Registrarse</NavLink>}</div>
  </div></nav>;
};
