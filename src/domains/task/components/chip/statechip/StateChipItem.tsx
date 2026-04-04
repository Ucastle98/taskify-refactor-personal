// StateChipItem.tsx

export type StateLabel = 'To Do' | 'On Progress' | 'Done';

export default function StateChipItem({ label }: { label: StateLabel }) {
  return (
    <div className="inline-flex w-fit items-center gap-2 px-3 py-1 text-sm rounded-full bg-[#F1EFFD] text-[#5534DA] whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-[#5534DA]" />
      {label}
    </div>
  );
}
