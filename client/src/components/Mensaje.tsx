import type { MensajeEstado } from "../types/Mensaje";

interface MensajeProps {
  mensaje: MensajeEstado;
  onCerrar: () => void;
}

// Aviso de confirmación (verde) o error (rojo)
export const Mensaje = ({ mensaje, onCerrar }: MensajeProps) => {
  const color =
    mensaje.tipo === "exito" ? "bg-success text-white" : "bg-danger text-white";

  return (
    <div
      role="alert"
      className={`${color} rounded-2xl px-5 py-3 mb-6 flex items-start justify-between gap-4`}
    >
      <span>{mensaje.texto}</span>
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar mensaje"
        className="font-bold cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};
