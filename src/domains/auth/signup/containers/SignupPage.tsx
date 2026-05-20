'use client';

import { useState } from 'react';
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [uiState, setUiState] = useState({
    showPassword: false,
    showPasswordConfirm: false,
  });

  const [error, setError] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = (field: 'showPassword' | 'showPasswordConfirm') => {
    setUiState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let message = '';

    if (name === 'email' && !emailRegex.test(value)) {
      message = '올바른 이메일 형식이 아닙니다.';
    }

    if (name === 'nickname' && value.length > 10) {
      message = '닉네임은 10자 이하로 입력해주세요';
    }

    if (name === 'password' && value.length < 8) {
      message = '비밀번호는 8자 이상 입력해주세요.';
    }

    if (name === 'passwordConfirm' && value !== formValues.password) {
      message = '비밀번호가 일치하지 않습니다.';
    }

    setError((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid =
    formValues.email !== '' &&
    formValues.nickname !== '' &&
    formValues.password !== '' &&
    formValues.passwordConfirm !== '' &&
    isAgreed &&
    !error.email &&
    !error.nickname &&
    !error.password &&
    !error.passwordConfirm;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <img src="/images/taskifylogo.svg" alt="Taskify 로고"></img>
        <h1 className="font-bold text-6xl text-[#5534DA] mb-4">Taskify</h1>
        <span className="text-[#333236] font-bold">첫 방문을 환영합니다!</span>
      </div>

      <div className="mt-5 w-full max-w-[520px]">
        <SignupForm
          formValues={formValues}
          uiState={uiState}
          error={error}
          isAgreed={isAgreed}
          isFormValid={isFormValid}
          onChange={handleChange}
          onTogglePassword={handleTogglePassword}
          onBlur={handleBlur}
          onAgreementChange={handleAgreementChange}
        />
      </div>
    </div>
  );
}

// TODO: 상태 많으면 객체로 관리하기, 핸들러 함수도 묶어보기
