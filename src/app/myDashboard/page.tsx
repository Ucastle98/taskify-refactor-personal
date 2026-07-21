'use client';

import Button from '@/components/ui/Button';
import InvitedDashboard from '@/domains/myDashboard/components/InvitedDashboardList';
import MyDashboardButton from '@/domains/myDashboard/components/MyDashboardButton';
import PlusMark from '@/components/icons/PlusMark';
import CreateDashboardModal from '@/domains/myDashboard/components/CreateDashboardModal';

import { useState } from 'react';
import SideMenu from '@/domains/dashboard/components/navigation/SideMenu';
import GNB from '@/domains/dashboard/components/navigation/GNB';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

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

            <MyDashboardButton
              className="h-14.5 w-full md:h-17 lg:h-17.5"
              dashboardName="2분기 계획"
              isMadeByMe={true}
              colorDot="#E8DFF5"
            />
            <MyDashboardButton
              className="h-14.5 w-full md:h-17 lg:h-17.5"
              dashboardName="2분기 계획"
              isMadeByMe={false}
              colorDot="#E8DFF5"
            />
          </section>
          <InvitedDashboard className="lg:mt-8" />
        </main>
      </div>
    </div>
  );
}
