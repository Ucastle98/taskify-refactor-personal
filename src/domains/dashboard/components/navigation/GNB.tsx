'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import DropdownMenu from '@/components/dropdown/DropdownMenu';
import usePageToast from '@/components/toast/pagetoast/usePageToast';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { deleteDashboard } from '@/services/dashboard';
import { getMembers } from '@/services/member';
import { useAuthStore } from '@/store/useAuthStore';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import InviteModal from '../modal/InviteModal';

// type Member = {
//   id: number;
//   nickname: string;
//   profileImageUrl?: string;
// };

type GNBProps = {
  title: string;
  isOwner?: boolean;
  dashboardId?: number;
};

const AVATAR_COLORS = [
  'bg-yellow-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
  'bg-orange-400',
];

const getAvatarColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length];

// 닉네임에 이모지가 들어있을때를 대비 "😀안녕" => ["😀","안","녕"] 안깨지게 꺼내줌
const getInitial = (nickname: string) => Array.from(nickname)[0] ?? '';

export default function GNB({ title, isOwner = false, dashboardId }: GNBProps) {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const ManageDropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);

  const { showToast, Toast } = usePageToast();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['members', dashboardId],
    queryFn: () => getMembers(dashboardId!),
    enabled: dashboardId !== undefined,
  });

  const dashboardDeleteMutation = useMutation({
    mutationFn: () => deleteDashboard(dashboardId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      router.push('/myDashboard');
    },
    onError: (error) => {
      alert(getAxiosErrorMessage(error, '대시보드 삭제에 실패했습니다.'));
    },
  });

  const members = data?.members ?? [];

  const MAX_VISIBLE = 5;
  const visibleMembers = members.slice(0, MAX_VISIBLE);
  const extraCount = (data?.totalCount ?? members.length) - visibleMembers.length;

  const handleInviteClick = () => {
    if (dashboardId === undefined) {
      showToast('대시보드에 입장 후 초대해주세요!');
      return;
    }
    setIsOpen(true);
  };

  const handleManageClick = () => {
    if (dashboardId === undefined) {
      showToast('대시보드에 입장 후 이용해주세요!');
      return;
    }

    if (!isOwner) {
      showToast('내가 만든 대시보드에서만 관리할 수 있어요!');
      return;
    }

    setIsManageDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();

      router.push('/auth/login');
    }
  };

  const handleDelete = () => {
    if (dashboardDeleteMutation.isPending) return;
    if (!window.confirm('삭제 후 복구가 불가능합니다. 삭제 하시겠습니까?')) return;
    dashboardDeleteMutation.mutate();
  };

  const handleGoMyPage = () => {
    router.push('/myPage');
  };

  const handleModify = () => {};

  //  멤버 확인 -> 멤버 보이는 모달 그 안에서 멤버 강퇴 기능

  const menuItem = [
    { label: '로그아웃', onClick: handleLogout },
    { label: '계정관리', onClick: handleGoMyPage },
  ];

  const manageMenuItem = [
    { label: '삭제하기', onClick: handleDelete },
    { label: '수정하기', onClick: handleModify },
    // { label: '멤버 확인', onClick: },
  ];

  return (
    <header className="flex h-17.5 items-center justify-between border-b border-gray-300 px-8">
      {/* 왼쪽 */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-[#333236]">{title}</h2>
        {isOwner && <span>👑</span>}
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-6">
        {/* 버튼 영역(추후 공통컴포넌트로 제작) */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={ManageDropdownRef}>
            <button
              type="button"
              onClick={handleManageClick}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#787486] hover:bg-gray-200 hover:opacity-70"
            >
              대시보드 관리
            </button>
            <DropdownMenu
              items={manageMenuItem}
              open={isManageDropdownOpen}
              onClose={() => setIsManageDropdownOpen(false)}
              menuRef={ManageDropdownRef}
            />
          </div>

          <button
            onClick={handleInviteClick}
            type="button"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#787486] hover:bg-gray-200 hover:opacity-70"
          >
            초대하기
          </button>
          <InviteModal open={isOpen} dashboardId={dashboardId} onClose={() => setIsOpen(false)} />
          {Toast}
        </div>

        {/*멤버 (대시보드 상세에서만 표시)*/}
        {isLoading && <p className="px-3 text-xs text-[#9FA6B2]">불러오는 중..</p>}

        {isError && (
          <div className="flex flex-col gap-1 px-3">
            <p>목록을 불러오지 못했어요.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-left text-xs text-[#5534DA] underline"
            >
              다시 시도
            </button>
          </div>
        )}

        {members.length > 0 && (
          <div className="flex items-center -space-x-2">
            {visibleMembers.map((member) => (
              <div
                key={member.id}
                role="img"
                aria-label={member.nickname}
                className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white text-xs text-white ${getAvatarColor(member.userId)}`}
              >
                {member.profileImageUrl ? (
                  <img src={member.profileImageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  getInitial(member.nickname)
                )}
              </div>
            ))}

            {extraCount > 0 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-xs text-gray-700">
                +{extraCount}
              </div>
            )}
          </div>
        )}

        {/* 프로필 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 border-l border-gray-200 pl-4 hover:opacity-60"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full overflow-hidden text-xs text-white ${hasHydrated && user ? getAvatarColor(user.id) : 'bg-gray-300'}`}
            >
              {/* {hasHydrated ? (user?.nickname?.[0] ?? '') : ''} */}
              {hasHydrated && user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : hasHydrated ? (
                getInitial(user?.nickname ?? '')
              ) : (
                ''
              )}
            </div>
            <span className="text-sm font-medium text-[#333236]">
              {hasHydrated ? user?.nickname : ''}
            </span>
          </button>
          <DropdownMenu
            items={menuItem}
            open={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            menuRef={dropdownRef}
          />
        </div>
      </div>
    </header>
  );
}
