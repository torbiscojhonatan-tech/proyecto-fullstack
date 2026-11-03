interface EstadisticaCardProps {
  titulo: string;
  valor: string;
}

// Tarjeta reutilizable para los números del dashboard
export const EstadisticaCard = ({ titulo, valor }: EstadisticaCardProps) => {
  return (
    <div className="bg-primary text-background rounded-2xl p-6">
      <p className="text-sm opacity-80 mb-1!">{titulo}</p>
      <p className="text-3xl font-extrabold mb-0!">{valor}</p>
    </div>
  );
};
