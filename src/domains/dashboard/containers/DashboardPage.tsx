'use client';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import GNB from '../components/navigation/GNB';
import SideMenu from '../components/navigation/SideMenu';
import { useState } from 'react';
import CreateTaskModal from '../components/modal/CreateTaskModal';
import ModifyTaskModal from '../components/modal/ModifyTaskModal';

export default function DashboardPage() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isModifyTaskModalOpen, setIsModifyTaskModalOpen] = useState(false);

  return (
    <div>
      <div className="flex">
        <SideMenu />

        <div className="flex flex-1 flex-col gap-4">
          <GNB />

          <main className="p-4">
            <ActionChip onClick={() => setIsCreateTaskModalOpen(true)} variant="column" />

            <CreateTaskModal
              open={isCreateTaskModalOpen}
              onClose={() => setIsCreateTaskModalOpen(false)}
            />
            <button
              onClick={() => setIsModifyTaskModalOpen(true)}
              className="border border-gray-300 mt-5 cursor-pointer hover:bg-gray-500 p-3"
            >
              수정하기
            </button>
            <ModifyTaskModal
              open={isModifyTaskModalOpen}
              onClose={() => setIsModifyTaskModalOpen(false)}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

// TODO: 추후 API 연결시 수정하기 버튼 모달안에서 해결되게 연결
