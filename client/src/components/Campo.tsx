import type { ReactNode } from "react";

interface CampoProps {
  etiqueta: string;
  nombre: string;
  error?: string;
  children: ReactNode;
}

// Envoltorio reutilizable: etiqueta + control + mensaje de error
export const Campo = ({ etiqueta, nombre, error, children }: CampoProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={nombre} className="block font-semibold mb-1">
        {etiqueta}
      </label>
      {children}
      {error && <p className="text-danger text-sm mt-1 mb-0!">{error}</p>}
    </div>
  );
};
