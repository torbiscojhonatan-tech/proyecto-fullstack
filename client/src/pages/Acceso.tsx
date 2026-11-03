import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
export function Acceso() {
  const [registro, setRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { entrar } = useAuth();
  const navegar = useNavigate();
  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setCargando(true);
    try {
      const respuesta = await fetch(`${API}/auth/${registro ? 'registro' : 'login'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre, correo, password }) });
      const json = await respuesta.json();
      if (!respuesta.ok || !json.success) throw new Error(json.error || 'No se pudo continuar');
      entrar(json.data.token, json.data.nombre);
      navegar('/servicios');
    } catch (e) { setError(e instanceof Error ? e.message : 'Error de conexión'); }
    finally { setCargando(false); }
  }
  return <section className="min-h-[65vh] flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-md rounded-3xl bg-white border border-border shadow-lg p-8">
      <p className="text-accent font-bold uppercase tracking-wider text-sm">Barbería · PA3</p>
      <h1 className="text-3xl font-extrabold text-primary mb-2">{registro ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
      <p className="text-muted mb-6">{registro ? 'Regístrate para administrar tus servicios.' : 'Accede al panel de servicios de tu barbería.'}</p>
      <form onSubmit={enviar} className="grid gap-4">
        {registro && <label className="grid gap-1 font-semibold">Nombre<input required minLength={2} className="border border-border rounded-lg p-3" value={nombre} onChange={e => setNombre(e.target.value)}/></label>}
        <label className="grid gap-1 font-semibold">Correo electrónico<input required type="email" className="border border-border rounded-lg p-3" value={correo} onChange={e => setCorreo(e.target.value)}/></label>
        <label className="grid gap-1 font-semibold">Contraseña<input required minLength={6} type="password" className="border border-border rounded-lg p-3" value={password} onChange={e => setPassword(e.target.value)}/></label>
        {error && <p role="alert" className="text-red-700 bg-red-50 rounded-lg p-3">{error}</p>}
        <button disabled={cargando} className="rounded-lg bg-primary text-white font-bold py-3 disabled:opacity-50 cursor-pointer">{cargando ? 'Procesando...' : registro ? 'Registrarme' : 'Entrar'}</button>
      </form>
      <button className="mt-5 text-secondary underline cursor-pointer" onClick={() => { setRegistro(!registro); setError(''); }}>{registro ? 'Ya tengo cuenta' : 'Crear una cuenta nueva'}</button>
    </div>
  </section>;
}
