// Chip.tsx

interface ChipProps {
  label: string;
  colorIndex: number;
  onRemove: () => void;
}

const CHIP_BG_COLORS = ['#F9EEE3', '#E7F7D8', '#F7D8F0', '#DBE6F7'];

const CHIP_TEXT_COLORS = ['#D58D49', '#86D549', '#D549B6', '#4981D5'];

export default function Chip({ label, onRemove, colorIndex }: ChipProps) {
  return (
    <div
      className="flex items-center gap-1 px-2 h-8 rounded-full text-sm"
      style={{
        backgroundColor: CHIP_BG_COLORS[colorIndex],
        color: CHIP_TEXT_COLORS[colorIndex],
      }}
    >
      <span>{label}</span>
      <button onClick={onRemove} className="hover:opacity-60 hidden">
        x
      </button>
    </div>
  );
}
