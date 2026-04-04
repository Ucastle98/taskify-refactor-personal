// StateChipList.tsx
import type { StateLabel } from './StateChipItem';
import StateChipItem from './StateChipItem';

const CHIPS: StateLabel[] = ['To Do', 'On Progress', 'Done'];

export default function StateChipList() {
  return (
    <div className="flex flex-col gap-3">
      {CHIPS.map((chip) => (
        <StateChipItem key={chip} label={chip} />
      ))}
    </div>
  );
}
