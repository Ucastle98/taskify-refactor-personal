import Button from '@/components/ui/Button';

import type { Invitation } from '@/types/invitation';

interface InvitedDashboardCardProps {
  invitation: Invitation;
}

export default function InvitedDashboardCard({ invitation }: InvitedDashboardCardProps) {
  return (
    <div className="px-4 py-3.5 md:px-7 md:py-5 flex flex-col gap-3.5 md:gap-0 md:grid md:grid-cols-[auto_1fr_auto] border-b border-[#D9D9D9]">
      <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 md:gap-x-16 lg:gap-x-73">
        <p className="md:hidden text-sm text-[#9FA6B2]">이름</p>
        <p className="text-sm text-[#333236]">{invitation.dashboard.title}</p>

        <p className="md:hidden text-sm text-[#9FA6B2]">초대자</p>
        <p className="text-sm text-[#333236]">{invitation.inviter.nickname}</p>
      </div>
      <div className="flex gap-2.5 md:justify-end">
        <Button variant="v" className="w-full md:w-18 h-8 md:h-7.5 text-xs md:text-sm font-medium">
          수락
        </Button>
        <Button variant="wv" className="w-full md:w-18 h-8 md:h-7.5 text-xs md:text-sm font-medium">
          거절
        </Button>
      </div>
    </div>
  );
}
