import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Servicio, ServicioInput } from "../types/Servicio";
import Heading from "./Headings";
import { Campo } from "./Campo";

interface ServicioFormProps {
  servicio: Servicio | null; // null = crear, con valor = editar
  onGuardar: (datos: ServicioInput) => Promise<boolean>;
  onCancelar: () => void;
}

// En el formulario todo es texto; precio y duración se convierten a número al enviar
interface ValoresForm {
  nombre: string;
  categoria: string;
  precio: string;
  duracion: string;
  descripcion: string;
}

type Errores = Partial<Record<keyof ValoresForm, string>>;

const CATEGORIAS = ["Cabello", "Barba", "Afeitado", "Combo", "Cuidado"];

const VACIO: ValoresForm = {
  nombre: "",
  categoria: "",
  precio: "",
  duracion: "",
  descripcion: "",
};

const estiloControl =
  "w-full rounded-lg border border-border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring";

const validar = (v: ValoresForm): Errores => {
  const errores: Errores = {};
  const precio = Number(v.precio);
  const duracion = Number(v.duracion);

  if (v.nombre.trim().length < 3) {
    errores.nombre = "El nombre es obligatorio (mínimo 3 caracteres)";
  }
  if (!v.categoria) {
    errores.categoria = "Selecciona una categoría";
  }
  if (v.precio.trim() === "") {
    errores.precio = "El precio es obligatorio";
  } else if (Number.isNaN(precio) || precio < 0) {
    errores.precio = "El precio debe ser un número mayor o igual a 0";
  }
  if (v.duracion.trim() === "") {
    errores.duracion = "La duración es obligatoria";
  } else if (!Number.isInteger(duracion) || duracion < 5 || duracion > 300) {
    errores.duracion = "La duración debe ser un entero entre 5 y 300 minutos";
  }
  if (v.descripcion.length > 200) {
    errores.descripcion = "La descripción no puede superar 200 caracteres";
  }
  return errores;
};

export const ServicioForm = ({ servicio, onGuardar, onCancelar }: ServicioFormProps) => {
  // Estado inicial: datos del servicio si estamos editando, vacío si estamos creando
  const [valores, setValores] = useState<ValoresForm>(
    servicio
      ? {
          nombre: servicio.nombre,
          categoria: servicio.categoria,
          precio: String(servicio.precio),
          duracion: String(servicio.duracion),
          descripcion: servicio.descripcion,
        }
      : VACIO
  );
  const [errores, setErrores] = useState<Errores>({});
  const [guardando, setGuardando] = useState(false);

  // Un solo handler para todos los campos (formulario controlado)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores = validar(valores);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setGuardando(true);
    const exito = await onGuardar({
      nombre: valores.nombre.trim(),
      categoria: valores.categoria,
      precio: Number(valores.precio),
      duracion: Number(valores.duracion),
      descripcion: valores.descripcion.trim(),
    });
    setGuardando(false);

    // Si se creó uno nuevo, limpiamos el formulario
    if (exito && !servicio) setValores(VACIO);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-surface border border-border rounded-2xl p-6"
    >
      <Heading level={3}>{servicio ? "Editar servicio" : "Nuevo servicio"}</Heading>

      <Campo etiqueta="Nombre" nombre="nombre" error={errores.nombre}>
        <input
          id="nombre"
          name="nombre"
          value={valores.nombre}
          onChange={handleChange}
          className={estiloControl}
          placeholder="Ej: Corte Clásico"
        />
      </Campo>

      <Campo etiqueta="Categoría" nombre="categoria" error={errores.categoria}>
        <select
          id="categoria"
          name="categoria"
          value={valores.categoria}
          onChange={handleChange}
          className={estiloControl}
        >
          <option value="">-- Selecciona --</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Campo>

      <div className="grid grid-cols-2 gap-4">
        <Campo etiqueta="Precio (S/)" nombre="precio" error={errores.precio}>
          <input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            value={valores.precio}
            onChange={handleChange}
            className={estiloControl}
            placeholder="0.00"
          />
        </Campo>

        <Campo etiqueta="Duración (min)" nombre="duracion" error={errores.duracion}>
          <input
            id="duracion"
            name="duracion"
            type="number"
            value={valores.duracion}
            onChange={handleChange}
            className={estiloControl}
            placeholder="30"
          />
        </Campo>
      </div>

      <Campo etiqueta="Descripción" nombre="descripcion" error={errores.descripcion}>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          value={valores.descripcion}
          onChange={handleChange}
          className={estiloControl}
          placeholder="Breve descripción (opcional)"
        />
      </Campo>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={guardando}
          className="bg-primary text-background px-5 py-2 rounded-full font-semibold hover:bg-secondary disabled:opacity-60 cursor-pointer"
        >
          {guardando ? "Guardando..." : servicio ? "Actualizar" : "Registrar"}
        </button>
        {servicio && (
          <button
            type="button"
            onClick={onCancelar}
            className="border border-border px-5 py-2 rounded-full font-semibold hover:bg-surface-subtle cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
