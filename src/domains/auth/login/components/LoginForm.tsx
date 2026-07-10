'use client';

import { login } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';

import type { LoginFormValues } from '@/types/form';

type Props = {
  formValues: LoginFormValues;
  showPassword: boolean;
  isValid: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onTogglePassword: () => void;
};

export default function LoginForm({
  formValues,
  showPassword,
  isValid,
  onChangeEmail,
  onChangePassword,
  onTogglePassword,
}: Props) {
  const [emailErr, setEmailErr] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (formValues.email === '') {
      setEmailErr('');
      return;
    }

    if (!emailRegex.test(formValues.email)) {
      setEmailErr('이메일 형식으로 입력해주세요.');
    } else {
      setEmailErr('');
    }
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      setAuth(result.user, result.accessToken);

      router.push('/myDashboard');
    },
    onError: (error) => {
      console.error(error);
      alert('로그인에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    loginMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full max-w-2xl mb-20">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[#333236] text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={formValues.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="이메일을 입력하세요"
            className="border border-gray-500 focus:border-[#5534DA] focus:outline-[#5534DA] p-5 rounded-md"
          />
          {emailErr && <p className="text-red-500 text-sm">{emailErr}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[#333236] text-sm font-medium">
            비밀번호
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formValues.password}
              onChange={(e) => onChangePassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="
              w-full
              border border-gray-500 
              focus:border-[#5534DA] focus:outline-[#5534DA] 
              p-5 pr-12
              rounded-md"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
            >
              {showPassword ? '숨김' : '보기'}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <button
            type="submit"
            disabled={!isValid || loginMutation.isPending}
            className={`
                p-5 rounded-md text-white 
                ${isValid && !loginMutation.isPending ? 'bg-[#5534DA] cursor-pointer hover:opacity-80' : 'bg-gray-300 cursor-not-allowed'}
                `}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
          <span className="mt-5 text-center">
            회원이 아니신가요?{' '}
            <Link href="/auth/signup" className="underline text-[#5534DA]">
              회원가입하기
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
