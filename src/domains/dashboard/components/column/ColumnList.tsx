import ActionChip from '@/components/chip/actionchip/ActionChip';
import ColumnCard from './ColumnCard';

type Props = {
  columns: string[];
  onAddColumn: () => void;
};

export default function ColumnList({ columns, onAddColumn }: Props) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {columns.map((column) => (
        <ColumnCard key={column} title={column} />
      ))}

      <div>
        <ActionChip variant="column" onClick={onAddColumn} />
      </div>
    </div>
  );
}
