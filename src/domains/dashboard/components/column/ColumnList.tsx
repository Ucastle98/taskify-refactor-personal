import ActionChip from '@/components/chip/actionchip/ActionChip';
import { getColumns } from '@/services/column';

import { useQuery } from '@tanstack/react-query';

import ColumnCard from './ColumnCard';

type Props = {
  dashboardId: number;
  onAddColumn: () => void;
};

export default function ColumnList({ dashboardId, onAddColumn }: Props) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['columns', dashboardId],
    queryFn: () => getColumns(dashboardId),
  });

  const columns = data?.data ?? [];

  return (
    <div className="flex gap-4 overflow-x-auto">
      {isPending && <p className="text-sm text-[#9FA6B2]">불러오는 중...</p>}

      {isError && <p className="text-sm text-red-500">컬럼을 불러오지 못했습니다.</p>}

      {!isPending &&
        !isError &&
        columns.map((column) => <ColumnCard key={column.id} title={column.title} />)}

      <div>
        <ActionChip variant="column" onClick={onAddColumn} />
      </div>
    </div>
  );
}
