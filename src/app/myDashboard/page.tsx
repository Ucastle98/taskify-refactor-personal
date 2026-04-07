'use client';

import Button from '@/components/ui/Button';
import InvitedDashboard from '@/domains/myDashboard/components/InvitedDashboard';
import MyDashboardButton from '@/domains/myDashboard/components/MyDashboardButton';

export default function Page() {
  return (
    <div>
      <main className="mt-10 ml-6 md:ml-9 lg:ml-10 flex w-full flex-col gap-8 lg:max-w-240">
        <section className="grid w-65 md:w-126 lg:w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Button variant="add" className="h-14.5 w-full md:h-17 lg:h-17.5">
            <p className="text-sm font-semibold md:text-base">새로운 대시보드</p>
          </Button>
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
  );
}
