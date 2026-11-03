import type { RespuestaApi, Servicio, ServicioInput } from '../types/Servicio';
const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/servicios';
const cabeceras = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.getItem('pa3_token') || ''}` });
async function procesar<T>(respuesta: Response): Promise<RespuestaApi<T>> {
  const json: RespuestaApi<T> = await respuesta.json().catch(() => ({ success: false }));
  if (!respuesta.ok || !json.success) throw new Error(json.error ?? 'Ocurrió un error en la solicitud');
  return json;
}
export const obtenerMensajeError = (error: unknown): string => error instanceof Error ? error.message : 'Error desconocido';
export const listarServicios = async (): Promise<Servicio[]> => (await procesar<Servicio[]>(await fetch(API_URL, { headers: cabeceras() }))).data ?? [];
export const crearServicio = async (datos: ServicioInput): Promise<Servicio> => (await procesar<Servicio>(await fetch(API_URL, { method: 'POST', headers: cabeceras(), body: JSON.stringify(datos) }))).data!;
export const actualizarServicio = async (id: string, datos: ServicioInput): Promise<Servicio> => (await procesar<Servicio>(await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: cabeceras(), body: JSON.stringify(datos) }))).data!;
export const eliminarServicio = async (id: string): Promise<void> => { await procesar<null>(await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: cabeceras() })); };
