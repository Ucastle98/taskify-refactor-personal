'use client';

import GNB from '../components/navigation/GNB';
import SideMenu from '../components/navigation/SideMenu';
import { useState } from 'react';
import AddColumnModal from '../components/modal/AddColumnModal';
import ColumnList from '../components/column/ColumnList';

export default function DashboardPage() {
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);

  const handleAddColumn = (columnName: string) => {
    setColumns((prev) => [...prev, columnName]);
  };

  return (
    <div>
      <div className="flex">
        <SideMenu />

        <div className="flex flex-1 flex-col gap-4">
          <GNB />

          <main className="p-4">
            <AddColumnModal
              open={isAddColumnModalOpen}
              onClose={() => setIsAddColumnModalOpen(false)}
              onCreate={handleAddColumn}
            />

            <ColumnList columns={columns} onAddColumn={() => setIsAddColumnModalOpen(true)} />
          </main>
        </div>
      </div>
    </div>
  );
}

// TODO: 추후 API 연결시 수정하기 버튼 모달안에서 해결되게 연결
