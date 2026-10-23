import Button from '@/components/ui/Button';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { answerInvite } from '@/services/invitation';
import type { Invitation } from '@/types/invitation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface InvitedDashboardCardProps {
  invitation: Invitation;
}

export default function InvitedDashboardCard({ invitation }: InvitedDashboardCardProps) {
  const queryClient = useQueryClient();

  const answerInviteMutation = useMutation({
    mutationFn: (inviteAccepted: boolean) => {
      return answerInvite(invitation.id, { inviteAccepted });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
    onError: (error) => {
      alert(getAxiosErrorMessage(error, '초대 응답에 실패했습니다'));
    },
  });

  return (
    <div className="px-4 py-3.5 md:px-7 md:py-5 flex flex-col gap-3.5 md:gap-0 md:grid md:grid-cols-[auto_1fr_auto] border-b border-[#D9D9D9]">
      {/** 1열: 이름 */}
      <div className="flex gap-8 md:block">
        <p className="md:hidden text-sm text-[#9FA6B2]">이름</p>
        <p className="text-sm text-[#333236]">{invitation.dashboard.title}</p>
      </div>
      {/* <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 md:gap-x-16 lg:gap-x-73">
        <p className="md:hidden text-sm text-[#9FA6B2]">이름</p>
        <p className="text-sm text-[#333236]">{invitation.dashboard.title}</p>
      </div> */}

      {/** 2열: 초대자 */}
      <div className="flex gap-8 md:block md:text-center">
        <p className="md:hidden md:text-center text-sm text-[#9FA6B2]">초대자</p>
        <p className="text-sm text-[#333236]">{invitation.inviter.nickname}</p>
      </div>

      {/** 3열: 버튼 */}
      <div className="flex gap-2.5 md:justify-end">
        <Button
          onClick={() => answerInviteMutation.mutate(true)}
          variant="v"
          className="w-full md:w-18 h-8 md:h-7.5 text-xs md:text-sm font-medium hover:opacity-60"
        >
          수락
        </Button>
        <Button
          onClick={() => answerInviteMutation.mutate(false)}
          variant="wv"
          className="w-full md:w-18 h-8 md:h-7.5 text-xs md:text-sm font-medium hover:opacity-60"
        >
          거절
        </Button>
      </div>
    </div>
  );
}
