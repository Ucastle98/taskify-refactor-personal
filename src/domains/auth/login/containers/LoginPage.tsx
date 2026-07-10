'use client';

import { useState } from 'react';
import LoginForm from '../components/LoginForm';

import type { LoginFormValues } from '@/types/form';

export default function LoginPage() {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const isValid = formValues.email.trim() !== '' && formValues.password.trim() !== '';

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
          formValues={formValues}
          showPassword={showPassword}
          isValid={isValid}
          onChangeEmail={(value) =>
            setFormValues((prev) => ({
              ...prev,
              email: value,
            }))
          }
          onChangePassword={(value) =>
            setFormValues((prev) => ({
              ...prev,
              password: value,
            }))
          }
          onTogglePassword={() => setShowPassword((prev) => !prev)}
        />
      </div>
    </div>
  );
}
