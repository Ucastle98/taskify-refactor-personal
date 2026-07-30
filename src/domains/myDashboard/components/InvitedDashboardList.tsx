import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/cn';
import { getInvitations } from '@/services/invitation';

import InvitedDashboardCard from './InvitedDashboardCard';
import NothingInvitedDashboard from '@/components/icons/NothingInvitedDashboard';

interface InvitedDashboardListProps {
  className?: string;
}

export default function InvitedDashboardList({ className }: InvitedDashboardListProps) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations,
  });

  const invitations = data?.invitations ?? [];
  const isEmpty = !isPending && !isError && invitations.length === 0;

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

      {isPending && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-xs text-[#9FA6B2] md:text-lg">불러오는 중이에요...</p>
        </div>
      )}

      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <p className="text-xs text-red-500 md:text-lg">목록을 불러오지 못했어요.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-[#787486] hover:bg-gray-50"
          >
            다시 시도
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
          <div className="h-15 w-15 shrink-0 md:h-25 md:w-25">
            <NothingInvitedDashboard className="h-full w-full" />
          </div>
          <p className="text-xs text-[#9FA6B2] md:text-lg">아직 초대받은 대시보드가 없어요</p>
        </div>
      )}

      {!isPending && !isError && invitations.length > 0 && (
        <div className="flex flex-col mt-18 md:mt-16.75 lg:mt-24 gap-3.25 md:gap-8">
          <div className="flex justify-center">검색</div>
          <section>
            <div className="hidden md:grid grid-cols-[auto_1fr_auto] text-base text-[#9FA6B2] md:pl-7 md:pr-14">
              <p>이름</p>
              <p className="text-center">초대자</p>
              <p className="pr-1">수락 여부</p>
            </div>
            {invitations.map((invitation) => (
              <InvitedDashboardCard key={invitation.id} invitation={invitation} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
