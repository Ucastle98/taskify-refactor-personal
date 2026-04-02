// PlusMark.tsx

type PlusMarkProps = {
  size?: number;
  thickness?: number;
  colorClass?: string;
  className?: string;
};

export default function PlusMark({
  size = 14,
  thickness = 2,
  colorClass = 'bg-[#5534DA]',
  className = '',
}: PlusMarkProps) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 ${colorClass}`}
        style={{ height: thickness }}
      />
      <span
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 ${colorClass}`}
        style={{ width: thickness }}
      />
    </span>
  );
}
