import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
type AuthState = { token: string | null; nombre: string; entrar: (token: string, nombre: string) => void; salir: () => void };
const AuthContext = createContext<AuthState | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('pa3_token'));
  const [nombre, setNombre] = useState(() => sessionStorage.getItem('pa3_nombre') || '');
  const entrar = (nuevoToken: string, nuevoNombre: string) => { sessionStorage.setItem('pa3_token', nuevoToken); sessionStorage.setItem('pa3_nombre', nuevoNombre); setToken(nuevoToken); setNombre(nuevoNombre); };
  const salir = () => { sessionStorage.removeItem('pa3_token'); sessionStorage.removeItem('pa3_nombre'); setToken(null); setNombre(''); };
  return <AuthContext.Provider value={{ token, nombre, entrar, salir }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const auth = useContext(AuthContext); if (!auth) throw new Error('AuthProvider requerido'); return auth; }
