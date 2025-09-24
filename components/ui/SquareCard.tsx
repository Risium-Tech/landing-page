import Image from "next/image";

interface SquareCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function SquareCard({ iconSrc, iconAlt, title, description }: SquareCardProps) {
  return (
    <div className="shadow-card flex h-full flex-col justify-start rounded-xl bg-white px-6 py-16 transition hover:shadow-lg">
      <div className="mb-4 flex items-center">
        <div className="bg-yellow-normal flex h-20 w-20 items-center justify-center rounded-full">
          <Image src={iconSrc} alt={iconAlt} width={36} height={36} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
