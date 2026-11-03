import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PageHeader } from "../components/PageHeader"
import { ServicioForm } from "../components/ServicioForm"
import { Mensaje } from "../components/Mensaje"
import { EstadisticaCard } from "../components/EstadisticaCard"
import { calcularEstadisticas, SERVICIOS_KEY, useServicios } from "../hooks/useServicios"
import {
  actualizarServicio,
  crearServicio,
  eliminarServicio,
  obtenerMensajeError,
} from "../services/serviciosService"
import type { Servicio, ServicioInput } from "../types/Servicio"
import type { MensajeEstado } from "../types/Mensaje"

const formatoMoneda = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" })

export const Servicios = () => {
  const queryClient = useQueryClient()
  const { data = [], isPending, isError, error, refetch } = useServicios()

  const [mensaje, setMensaje] = useState<MensajeEstado | null>(null)
  const [editando, setEditando] = useState<Servicio | null>(null)
  const [busqueda, setBusqueda] = useState("")

  // Después de crear, editar o eliminar se vuelve a consultar la lista a la API
  const refrescar = () => queryClient.invalidateQueries({ queryKey: SERVICIOS_KEY })

  const crear = useMutation({ mutationFn: crearServicio, onSuccess: refrescar })
  const actualizar = useMutation({
    mutationFn: ({ id, datos }: { id: string; datos: ServicioInput }) => actualizarServicio(id, datos),
    onSuccess: refrescar,
  })
  const eliminarMutation = useMutation({ mutationFn: eliminarServicio, onSuccess: refrescar })

  // CREATE y UPDATE
  const guardar = async (datos: ServicioInput): Promise<boolean> => {
    try {
      if (editando) {
        const actualizado = await actualizar.mutateAsync({ id: editando._id, datos })
        setMensaje({ tipo: "exito", texto: `Servicio "${actualizado.nombre}" actualizado correctamente` })
        setEditando(null)
      } else {
        const creado = await crear.mutateAsync(datos)
        setMensaje({ tipo: "exito", texto: `Servicio "${creado.nombre}" registrado correctamente` })
      }
      return true
    } catch (err) {
      setMensaje({ tipo: "error", texto: obtenerMensajeError(err) })
      return false
    }
  }

  // DELETE con confirmación previa
  const eliminar = async (servicio: Servicio) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${servicio.nombre}"?`)) return

    try {
      await eliminarMutation.mutateAsync(servicio._id)
      if (editando?._id === servicio._id) setEditando(null)
      setMensaje({ tipo: "exito", texto: `Servicio "${servicio.nombre}" eliminado` })
    } catch (err) {
      setMensaje({ tipo: "error", texto: obtenerMensajeError(err) })
    }
  }

  // Filtro de búsqueda
  const texto = busqueda.trim().toLowerCase()
  const filtrados = data.filter((s) =>
    `${s.nombre} ${s.categoria}`.toLowerCase().includes(texto)
  )

  return (
    <>
      <PageHeader etiqueta="Panel de control" titulo="Servicios" subtitulo="Registra, consulta, edita y elimina los servicios que ofrece la barbería." />
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-3">

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {calcularEstadisticas(data).map((e) => (
              <EstadisticaCard key={e.titulo} titulo={e.titulo} valor={e.valor} />
            ))}
          </div>

          {mensaje && <Mensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />}

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* key reinicia el formulario al cambiar de servicio */}
            <ServicioForm
              key={editando?._id ?? "nuevo"}
              servicio={editando}
              onGuardar={guardar}
              onCancelar={() => setEditando(null)}
            />

            <div className="lg:col-span-2">
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o categoría..."
                className="w-full rounded-lg border border-border bg-white px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
              />

              {isPending ? (
                <p>Cargando...</p>
              ) : isError ? (
                <div className="rounded-2xl bg-red-50 p-5 text-red-700">
                  <p className="font-semibold">Ocurrió un error</p>
                  <p className="text-sm">{obtenerMensajeError(error)}</p>
                  <button
                    onClick={() => refetch()}
                    className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white cursor-pointer">
                    Reintentar
                  </button>
                </div>
              ) : filtrados.length === 0 ? (
                <p className="text-muted">
                  {data.length === 0
                    ? "No hay servicios registrados todavía."
                    : "Ningún servicio coincide con la búsqueda."}
                </p>
              ) : (
                <div className="overflow-x-auto rounded-2xl">
                  <table className="w-full overflow-hidden bg-background rounded-2xl text-left text-sm shadow-sm">
                    <thead className="bg-primary text-background">
                      <tr>
                        {["Servicio", "Categoría", "Precio", "Duración", "Acciones"].map((h) => (
                          <th className="px-5 py-4 text-xs font-bold uppercase" key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtrados.map((servicio) => (
                        <tr key={servicio._id} className="hover:bg-surface-subtle transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-semibold text-primary mb-0!">{servicio.nombre}</p>
                            <p className="text-muted text-xs mb-0!">{servicio.descripcion || "Sin descripción"}</p>
                          </td>
                          <td className="px-5 py-4 font-semibold text-primary">{servicio.categoria}</td>
                          <td className="px-5 py-4 font-semibold text-primary">{formatoMoneda.format(servicio.precio)}</td>
                          <td className="px-5 py-4 font-semibold text-primary">{servicio.duracion} min</td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditando(servicio)}
                                className="bg-secondary text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-primary cursor-pointer"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => eliminar(servicio)}
                                className="bg-danger text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:opacity-85 cursor-pointer"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
