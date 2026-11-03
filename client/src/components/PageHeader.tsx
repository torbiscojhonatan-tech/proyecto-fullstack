import Heading from "./Headings"

interface PageHeaderProps {
    titulo: string,
    etiqueta: string,
    subtitulo: string
}

export const PageHeader = ({titulo, etiqueta, subtitulo}: PageHeaderProps) => {
  return (
    <header className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8 md:py-12">
  <div className="max-w-3xl">
    <div className="mb-2 flex items-center gap-3">
      <span className="h-px w-8 bg-accent" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {etiqueta}
      </span>
    </div>

    <Heading level={1} className="text-4xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
      {titulo}
    </Heading>

    <p className="mt-0 max-w-2xl text-sm leading-7 text-muted md:text-base">
      {subtitulo}
    </p>

    <div
      aria-hidden="true"
      className="mt-2 flex items-center gap-2"
    >
      <span className="h-1 w-16 rounded-full bg-primary" />
      <span className="h-1 w-8 rounded-full bg-accent" />
    </div>
  </div>
</header>
  )
}
