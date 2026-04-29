'use client';

import Link from 'next/link';

type Props = {
  email: string;
  password: string;
  showPassword: boolean;
  isValid: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onTogglePassword: () => void;
};

export default function LoginForm({
  email,
  password,
  showPassword,
  isValid,
  onChangeEmail,
  onChangePassword,
  onTogglePassword,
}: Props) {
  return (
    <>
      <form className="flex flex-col gap-12 w-full max-w-2xl mb-20">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[#333236] text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="border border-gray-500 focus:border-[#5534DA] focus:outline-[#5534DA] p-5 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[#333236] text-sm font-medium">
            비밀번호
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
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
            disabled={!isValid}
            className={`
                p-5 rounded-md text-white 
                ${isValid ? 'bg-[#5534DA] cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}
                `}
          >
            로그인
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
