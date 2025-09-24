interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="mx-auto flex max-w-xs flex-col items-center px-4 text-center">
      {/* Ícone em círculo */}
      <div className="border-yellow-normal mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white shadow-md">
        {icon}
      </div>

      {/* Título */}
      <h3 className="text-yellow-normal text-lg font-semibold">{title}</h3>

      {/* Descrição */}
      <p className="mt-2 text-base text-white">{description}</p>
    </div>
  );
}
