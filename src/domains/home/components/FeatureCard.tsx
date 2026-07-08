import Image from 'next/image';

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export default function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col">
      <div className="flex h-65 items-center justify-center rounded-t-xl bg-[#4B4B4B] p-4">
        <Image
          src={image}
          alt={title}
          width={200}
          height={100}
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="rounded-b-xl h-25 bg-[#171717] p-4">
        <span className="font-bold text-white">{title}</span>
        <p className="mt-2 text-[12px] text-white">{description}</p>
      </div>
    </div>
  );
}
