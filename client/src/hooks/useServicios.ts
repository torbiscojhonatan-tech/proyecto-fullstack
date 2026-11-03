import { useQuery } from "@tanstack/react-query";
import type { Servicio } from "../types/Servicio";
import { listarServicios } from "../services/serviciosService";

export const SERVICIOS_KEY = ["Servicios"];

// Consulta compartida: la usan el Home (dashboard) y la página de Servicios
export const useServicios = () =>
  useQuery<Servicio[]>({
    queryKey: SERVICIOS_KEY,
    queryFn: listarServicios,
  });

// Estadísticas calculadas a partir de la lista
export const calcularEstadisticas = (servicios: Servicio[]) => {
  const total = servicios.length;
  const precioPromedio =
    total > 0 ? servicios.reduce((suma, s) => suma + s.precio, 0) / total : 0;
  const duracionPromedio =
    total > 0 ? servicios.reduce((suma, s) => suma + s.duracion, 0) / total : 0;

  return [
    { titulo: "Servicios registrados", valor: String(total) },
    { titulo: "Precio promedio", valor: `S/ ${precioPromedio.toFixed(2)}` },
    { titulo: "Duración promedio", valor: `${Math.round(duracionPromedio)} min` },
  ];
};
