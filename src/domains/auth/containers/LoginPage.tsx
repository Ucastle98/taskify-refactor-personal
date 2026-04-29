'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassoword] = useState(false);

  const isValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div className="mb-10 flex flex-col items-center">
          <img src="/images/taskifylogo.svg" alt="Taskify 로고" />
          <div className="mt-3 flex flex-col items-center">
            <h1 className="font-bold text-6xl text-[#5534DA] mb-5">Taskify</h1>
            <span>오늘도 만나서 반가워요!</span>
          </div>
        </div>

        <LoginForm
          email={email}
          password={password}
          showPassword={showPassword}
          isValid={isValid}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
          onTogglePassword={() => setShowPassoword((prev) => !prev)}
        />
      </div>
    </div>
  );
}
