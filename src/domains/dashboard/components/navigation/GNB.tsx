'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import DropdownMenu from '@/components/dropdown/DropdownMenu';
import { useAuthStore } from '@/store/useAuthStore';

import InviteModal from '../modal/InviteModal';

type Member = {
  id: number;
  nickname: string;
};

type GNBProps = {
  title: string;
  isOwner?: boolean;
  members?: Member[];
};

export default function GNB({ title, isOwner = false, members }: GNBProps) {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();

      router.push('/auth/login');
    }
  };

  const handleGoMyPage = () => {
    router.push('/');
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
            onClick={() => setIsOpen(true)}
            type="button"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#787486] hover:bg-gray-200 hover:opacity-70"
          >
            초대하기
          </button>
          <InviteModal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>

        {/*멤버 (대시보드 상세에서만 표시)*/}
        {members && members.length > 0 && (
          <div className="flex items-center -space-x-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-xs text-white"
              >
                {member.nickname[0]}
              </div>
            ))}
          </div>
        )}

        {/* 프로필 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 border-l border-gray-200 pl-4 hover:opacity-60"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-xs text-white">
              {hasHydrated ? (user?.nickname?.[0] ?? '') : ''}
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
