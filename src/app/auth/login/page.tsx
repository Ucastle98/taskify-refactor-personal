'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassoword] = useState(false);

  const isValid = email && password;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mb-10 flex flex-col items-center">
          <img src="/images/taskifylogo.svg" alt="Taskify 로고" />
          <div className="mt-3 flex flex-col items-center">
            <h1 className="font-bold text-6xl text-[#5534DA] mb-5">Taskify</h1>
            <span>오늘도 만나서 반가워요!</span>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-5 w-full max-w-sm">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[#333236] text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="border border-gray-500 focus:border-[#5534DA] focus:outline-[#5534DA] p-3 rounded-md"
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="
              w-full
              border border-gray-500 
              focus:border-[#5534DA] focus:outline-[#5534DA] 
              p-3 pr-12
              rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassoword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? '숨김' : '보기'}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`
            p-3 rounded-md text-white 
            ${isValid ? 'bg-[#5534DA]' : 'bg-gray-300 cursor-not-allowed'}
            `}
        >
          로그인
        </button>
      </form>
      <span className="mt-4">
        회원이 아니신가요?{' '}
        <Link href="/auth/signup" className="underline text-[#5534DA]">
          회원가입하기
        </Link>
      </span>
    </div>
  );
}
