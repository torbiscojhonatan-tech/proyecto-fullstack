import { Link, useNavigate } from "react-router"

export const Pagina404 = () => {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-[60vh] items-center bg-background px-6 py-20">
      <section className="mx-auto w-full max-w-7xl">
        <p className="mb-2 text-[clamp(5rem,16vw,10rem)] font-extrabold leading-none text-primary">404</p>
        <div className="mb-6 h-px w-16 bg-accent" />
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Parece que esta página tomó <span className="text-accent">otra ruta.</span>
        </h1>
        <p className="max-w-xl text-muted">
          No encontramos la página que estás buscando. Es posible que haya cambiado de dirección o que el enlace no sea correcto.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 font-semibold text-background transition duration-200 hover:bg-secondary"
          >
            Volver al inicio
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border border-primary/25 bg-surface px-6 py-3.5 font-semibold hover:bg-surface-subtle"
          >
            Volver atrás
          </button>
        </div>
      </section>
    </main>
  )
}
