'use client';

import Button from '@/components/ui/Button';
import InvitedDashboard from '@/domains/myDashboard/components/InvitedDashboardList';
import MyDashboardButton from '@/domains/myDashboard/components/MyDashboardButton';
import PlusMark from '@/components/icons/PlusMark';
import CreateDashboardModal from '@/domains/myDashboard/components/CreateDashboardModal';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SideMenu from '@/domains/dashboard/components/navigation/SideMenu';
import GNB from '@/domains/dashboard/components/navigation/GNB';
import { getDashboards } from '@/services/dashboard';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['dashboards'],
    queryFn: getDashboards,
  });

  const dashboards = data?.dashboards ?? [];

  return (
    <div className="flex min-h-screen">
      <SideMenu />

      <div className="flex flex-1 flex-col">
        <GNB title="내 대시보드" />

        <main className="mt-10 ml-6 md:ml-9 lg:ml-10 flex w-full flex-col gap-8 lg:max-w-240">
          <section className="grid w-65 md:w-126 lg:w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <Button
              onClick={() => setIsOpen(true)}
              variant="add"
              className="h-14.5 w-full md:h-17 lg:h-17.5"
            >
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold md:text-base">새로운 대시보드</p>
                <PlusMark size={12} thickness={1} />
              </div>
            </Button>
            <CreateDashboardModal open={isOpen} onClose={() => setIsOpen(false)} />

            {isPending && (
              <div className="col-span-full flex items-center justify-center py-10 text-m text-[#9FA6B2]">
                대시보드를 불러오는 중이에요...
              </div>
            )}

            {isError && (
              <div className="col-span-full flex flex-col items-center justify-center gap-3 py-10">
                <p className="text-sm text-red-500">대시보드를 불러오지 못했어요.</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-[#787486] hover:bg-gray-50"
                >
                  다시 시도
                </button>
              </div>
            )}

            {!isPending &&
              !isError &&
              dashboards.map((dashboard) => (
                <MyDashboardButton
                  key={dashboard.id}
                  dashboardId={dashboard.id}
                  className="h-14.5 w-full md:h-17 lg:h-17.5"
                  dashboardName={dashboard.title}
                  isMadeByMe={dashboard.createdByMe}
                  colorDot={dashboard.color}
                />
              ))}
          </section>
          <InvitedDashboard className="lg:mt-8" />
        </main>
      </div>
    </div>
  );
}
