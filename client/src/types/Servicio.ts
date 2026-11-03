// Servicio tal como lo devuelve la API (MongoDB)
export interface Servicio {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  duracion: number; // minutos
  descripcion: string;
  createdAt?: string;
  updatedAt?: string;
}

// Datos que se envían al crear o editar
export type ServicioInput = Omit<Servicio, "_id" | "createdAt" | "updatedAt">;

// Formato de respuesta de la API: { success, data } o { success, error }
export interface RespuestaApi<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
