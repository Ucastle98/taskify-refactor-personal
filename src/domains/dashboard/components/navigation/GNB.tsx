'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import DropdownMenu from '@/components/dropdown/DropdownMenu';
import usePageToast from '@/components/toast/pagetoast/usePageToast';
import { getMembers } from '@/services/member';
import { useAuthStore } from '@/store/useAuthStore';

import { useQuery } from '@tanstack/react-query';

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

export default function GNB({ title, isOwner = false, dashboardId }: GNBProps) {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { showToast, Toast } = usePageToast();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['members', dashboardId],
    queryFn: () => getMembers(dashboardId!),
    enabled: dashboardId !== undefined,
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

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();

      router.push('/auth/login');
    }
  };

  const handleGoMyPage = () => {
    router.push('/myPage');
  };

  const menuItem = [
    { label: '로그아웃', onClick: handleLogout },
    { label: '계정관리', onClick: handleGoMyPage },
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
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#787486] hover:bg-gray-200 hover:opacity-70"
          >
            관리(대시보드 수정, 계정관리)
          </button>
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
                className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white text-xs text-white ${getAvatarColor(member.id)}`}
              >
                {member.profileImageUrl ? (
                  <img
                    src={member.profileImageUrl}
                    alt={member.nickname}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  member.nickname[0]
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
              className={`flex h-8 w-8 items-center justify-center rounded-full overflow-hidden text-xs text-white "
               ${user ? getAvatarColor(user.id) : 'bg-green-400'}
              `}
            >
              {/* {hasHydrated ? (user?.nickname?.[0] ?? '') : ''} */}
              {hasHydrated && user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : hasHydrated ? (
                (user?.nickname?.[0] ?? '')
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
