// AngleBrackets.tsx

type AngleBracketsProps = {
  direction: 'left' | 'right';
  size?: number;
  thickness?: number;
  colorClass?: string; // border 색
};

export default function AngleBrackets({
  direction,
  size = 12,
  thickness = 2,
  colorClass = 'border-gray-600',
}: AngleBracketsProps) {
  const rotateClass = direction === 'left' ? 'rotate-45' : '-rotate-135';

  return (
    <span aria-hidden="true" className="inline-block" style={{ width: size, height: size }}>
      <span
        className={`block w-full h-full border-l border-b cursor-pointer ${colorClass} ${rotateClass}`}
        style={{ borderLeftWidth: thickness, borderBottomWidth: thickness }}
      />
    </span>
  );
}
