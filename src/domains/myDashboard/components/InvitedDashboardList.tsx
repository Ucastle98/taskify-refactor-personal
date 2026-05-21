import { cn } from '@/lib/cn';

import InvitedDashboardCard from './InvitedDashboardCard';

interface InvitedDashboardListProps {
  className?: string;
}

export default function InvitedDashboardList({ className }: InvitedDashboardListProps) {
  return (
    // <div
    //   className={cn(
    //     'relative h-81.75 w-65 rounded-2xl bg-white md:w-126 md:h-97.5 md:mt-2 lg:w-240 lg:mt-10.5 flex justify-center flex-col  items-center',
    //     className,
    //   )}
    // >
    //   <p className="absolute top-6 left-5 text-sm font-semibold md:left-10 md:text-2xl">
    //     초대받은 대시보드
    //   </p>
    //   <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
    //     <div className="h-15 w-15 shrink-0 md:h-25 md:w-25">
    //       <NothingInvitedDashboard className="h-full w-full" />
    //     </div>
    //     <p className="text-xs text-[#9FA6B2] md:text-lg">아직 초대받은 대시보드가 없어요</p>
    //   </div>
    // </div>
    <div
      className={cn(
        'relative h-81.75 w-65 rounded-2xl bg-white md:w-126 md:h-97.5 md:mt-2 lg:w-240 lg:mt-10.5 flex flex-col',
        className,
      )}
    >
      <p className="absolute top-6 left-5 text-sm font-semibold md:left-10 md:text-2xl">
        초대받은 대시보드
      </p>
      <div className="flex flex-col mt-18 md:mt-16.75 lg:mt-24 gap-3.25 md:gap-8">
        <div className="flex justify-center">검색</div>
        <section className="">
          <div className="hidden md:grid grid-cols-[auto_1fr_auto] text-base text-[#9FA6B2] md:pl-7 md:pr-14">
            <p>이름</p>
            <p className="text-center">초대자</p>
            <p className="pr-1">수락 여부</p>
          </div>
          <InvitedDashboardCard />
          <InvitedDashboardCard />
          <InvitedDashboardCard />
        </section>
      </div>
    </div>
  );
}
