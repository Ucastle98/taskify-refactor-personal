'use client';

import GNB from '@/domains/dashboard/components/navigation/GNB';
import SideMenu from '@/domains/dashboard/components/navigation/SideMenu';

import PasswordEdit from '../components/PasswordEdit';
import ProfileEdit from '../components/ProfileEdit';

export default function MyPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <GNB title="계정관리" />

      <div className="flex gap-5">
        <SideMenu />

        {/* //** 뒤로가기 */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-2 mt-4">
            <button className="font-bold text-2xl ">&lt;</button>
            <p className="text-bold text-xl">돌아가기</p>
          </div>

          <div className="w-2xl flex flex-col gap-6">
            {/* 프로필 수정 (이미지, 닉네임) */}
            <ProfileEdit />

            {/* 비밀번호 변경 */}
            <PasswordEdit />
          </div>
        </div>
      </div>
    </div>
  );
}
