'use client';

import { useEffect, useRef, useState } from 'react';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { modifyMyPage, uploadProfileImage } from '@/services/auth';
import { useAuthStore } from '@/store/useAuthStore';

import { useMutation } from '@tanstack/react-query';

export default function ProfileEdit() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [nickname, setNickName] = useState('');

  useEffect(() => {
    if (user?.nickname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNickName(user.nickname);
    }
  }, [user?.nickname]);

  // useEffect(() => {
  //   if (user?.nickname) {
  //     setNickName(user.nickname);
  //   }
  // }, [user?.nickname]);
  {
    /** useEffect 사용안하고 단순하게 변경 
    --하려했지만 타이핑 할때마다 값을 뒤집어써서 
    무한 루프에 걸림
    useEffect 사용하는게 맞다 현재 eslint가 너무 엄격함 */
  }

  {
    /*단순 조건문으로 해결하려했지만 무한루프 발동 */
  }
  // if (user?.nickname !== nickname) {
  //   setNickName(user?.nickname ? 'user.nickname' : '')
  // };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (result) => {
      if (user) {
        updateUser({ ...user, profileImageUrl: result.profileImageUrl });
      }
    },
    onError: () => {
      alert('이미지 업로드에 실패했습니다.');
    },
  });

  const handleImageChgange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    uploadMutation.mutate(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const isNicknameChanged = nickname.trim() !== '' && nickname.trim() !== (user?.nickname ?? '');

  const NickNameMutation = useMutation({
    mutationFn: modifyMyPage,
    onSuccess: (result) => {
      setNickName(result.nickname);
      updateUser(result);
      alert('닉네임이 변경 됐습니다!');
    },
    onError: (error) => {
      alert(getAxiosErrorMessage(error, '닉네임은 10자 이하로 작성해주세요.'));
    },
  });

  const handleNickNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    NickNameMutation.mutate({
      nickname: nickname,
      ...(user?.profileImageUrl && {
        profileImageUrl: user.profileImageUrl,
      }),
    });
  };
  return (
    <div className="flex flex-col gap-5 p-4 rounded-lg bg-[#FFFFFF]">
      <h2 className="font-bold text-2xl">프로필</h2>
      <div className="flex gap-10">
        <ActionChip
          variant="avatar"
          imageUrl={hasHydrated ? (user?.profileImageUrl ?? undefined) : ''}
          onClick={handleImageClick}
          className="w-45.5 h-45.5 bg-[#F5F5F5]"
        />
        <input
          type="file"
          onChange={handleImageChgange}
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-col gap-3">
          <form onSubmit={handleNickNameSubmit} className="flex flex-col gap-2">
            <label htmlFor="email" className="flex flex-col gap-2">
              이메일
              <input
                type="text"
                id="email"
                className="p-4 min-w-100 border rounded-lg border-[#D9D9D0] cursor-not-allowed"
                value={hasHydrated ? (user?.email ?? '') : ''}
                disabled
              />
            </label>
            <label htmlFor="nickname" className="flex flex-col gap-2">
              닉네임
              <input
                type="text"
                id="nickname"
                className="p-4 min-w-100 border rounded-lg border-[#D9D9D9] focus:border-[#5534DA] focus:outline-none"
                value={nickname}
                onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              disabled={!isNicknameChanged || NickNameMutation.isPending}
              className="rounded-lg mt-2 p-4 bg-[#5534DA] text-white hover:opacity-70
              disabled:cursor-not-allowed 
              disabled:bg-[#D9D9D9] 
              disabled:text-[#999999] 
              disabled:hover:opacity-100"
            >
              {NickNameMutation.isPending ? '제출 중..' : '저장'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
