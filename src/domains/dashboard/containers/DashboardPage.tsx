'use client';

import { useState } from 'react';

import { getDashboard } from '@/services/dashboard';

import { useQuery } from '@tanstack/react-query';

import ColumnList from '../components/column/ColumnList';
import AddColumnModal from '../components/modal/AddColumnModal';
import GNB from '../components/navigation/GNB';
import SideMenu from '../components/navigation/SideMenu';

type Props = {
  dashboardId: number;
};

export default function DashboardPage({ dashboardId }: Props) {
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

  const {
    data: dashboard,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['dashboard', dashboardId],
    queryFn: () => getDashboard(dashboardId),
  });

  return (
    <div>
      <div className="flex">
        <SideMenu />

        <div className="flex flex-1 flex-col gap-4">
          <GNB
            title={isPending ? '' : (dashboard?.title ?? '대시보드')}
            isOwner={dashboard?.createdByMe}
          />

          <main className="p-4">
            {isError && <p className="text-sm text-red-500">대시보드를 불러오지 못했습니다.</p>}

            <AddColumnModal
              open={isAddColumnModalOpen}
              onClose={() => setIsAddColumnModalOpen(false)}
              dashboardId={dashboardId}
            />

            <ColumnList
              dashboardId={dashboardId}
              onAddColumn={() => setIsAddColumnModalOpen(true)}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

// TODO: 추후 API 연결시 수정하기 버튼 모달안에서 해결되게 연결
