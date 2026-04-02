// CountChip.tsx

// TO DO: 추후 DnD로 카드가 다른 컬럼으로 이동했을 때 count 처리 완성하기

type CountChipProps = {
  count: number;
  label?: string;
  max?: number;
  size?: 'sm' | 'md';
  variant?: 'default' | 'muted';
};

export default function CountChip({ count, label, max = 99 }: CountChipProps) {
  const display = count > max ? `${max}+` : String(count);
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs">
      {label && <span className="opacity-70">{label}</span>}
      <span className="font-semibold">{display}</span>
    </span>
  );
}
