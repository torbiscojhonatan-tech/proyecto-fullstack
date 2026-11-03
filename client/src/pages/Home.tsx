import { Link } from "react-router"
import Heading from "../components/Headings"
import { EstadisticaCard } from "../components/EstadisticaCard"
import { calcularEstadisticas, useServicios } from "../hooks/useServicios"

export const Home = () => {
  const { data = [], isPending, isError } = useServicios()

  return (
    <>
      <section className="bg-primary text-background py-20">
        <div className="max-w-7xl mx-auto px-3">
          <Heading level={1}>Estilo y precisión en cada corte</Heading>
          <p className="text-lg max-w-2xl">
            Administra los servicios de tu barbería: registra, consulta, edita y elimina desde un solo lugar.
          </p>
          <Link
            to="/servicios"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-semibold text-foreground transition duration-200 hover:-translate-y-0.5"
          >
            Gestionar servicios
            <span aria-hidden="true">↘</span>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-3">
          <Heading level={2} className="text-muted">Resumen</Heading>
          {isPending ? (
            <p>Cargando...</p>
          ) : isError ? (
            <p className="text-danger">No se pudo cargar el resumen. Verifica que el backend esté encendido.</p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {calcularEstadisticas(data).map((e) => (
                <EstadisticaCard key={e.titulo} titulo={e.titulo} valor={e.valor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
