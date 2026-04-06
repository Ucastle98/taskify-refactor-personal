import NothingInvitedDashboard from '@/domains/myDashboard/assets/nothingInvitedDashboard.svg';
import { cn } from '@/lib/cn';

interface InvitedDashboardProps {
  className?: string;
}

export default function InvitedDashboard({ className }: InvitedDashboardProps) {
  return (
    <div
      className={cn(
        'relative h-81.75 w-65 rounded-2xl bg-white md:w-126 md:h-97.5 md:mt-2 lg:w-240 lg:mt-10.5 flex justify-center flex-col  items-center',
        className,
      )}
    >
      <p className="absolute top-6 left-5 text-sm font-semibold md:left-10 md:text-2xl">
        초대받은 대시보드
      </p>
      <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
        <div className="h-15 w-15 shrink-0 md:h-25 md:w-25">
          <NothingInvitedDashboard className="h-full w-full" />
        </div>
        <p className="text-xs text-[#9FA6B2] md:text-lg">아직 초대받은 대시보드가 없어요</p>
      </div>
    </div>
  );
}
