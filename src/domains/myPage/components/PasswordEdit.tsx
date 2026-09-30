'use client';

import { useState } from 'react';

import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { editPassword } from '@/services/auth';

import { useMutation } from '@tanstack/react-query';

type PasswordFormValues = {
  nowPassword: string;
  newPassword: string;
  newPasswordConfig: string;
};

export default function PasswordEdit() {
  const [formValues, setFormValues] = useState<PasswordFormValues>({
    nowPassword: '',
    newPassword: '',
    newPasswordConfig: '',
  });

  const isFormValid =
    formValues.nowPassword !== '' &&
    formValues.newPassword !== '' &&
    formValues.newPasswordConfig !== '' &&
    formValues.newPassword.length >= 8 &&
    formValues.newPassword !== formValues.nowPassword &&
    formValues.newPassword === formValues.newPasswordConfig;

  const passwordMutation = useMutation({
    mutationFn: editPassword,
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다!');

      setFormValues({
        nowPassword: '',
        newPassword: '',
        newPasswordConfig: '',
      });
    },
    onError: (error) => {
      alert(getAxiosErrorMessage(error, '비밀번호 변경에 실패했습니다.'));
    },
  });

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    passwordMutation.mutate({
      password: formValues.nowPassword,
      newPassword: formValues.newPassword,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#FFFFFF]  p-5 flex flex-col gap-5 rounded-lg">
      <h2 className="font-bold text-2xl">비밀번호 변경</h2>
      <div className="flex flex-col gap-5">
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-2">
          <label htmlFor="password" className="flex flex-col gap-2">
            현재 비밀번호
            <input
              onChange={handleChange}
              value={formValues.nowPassword}
              name="nowPassword"
              type="password"
              placeholder="비밀번호 입력"
              className="p-4 min-w-100 border border-[#D9D9D9] rounded-lg focus:border-[#5534DA] focus:outline-none"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            새 비밀번호
            <input
              onChange={handleChange}
              value={formValues.newPassword}
              name="newPassword"
              type="password"
              placeholder="새 비밀번호 입력"
              className="p-4 min-w-100 border border-[#D9D9D9] rounded-lg focus:border-[#5534DA] focus:outline-none"
            />
            {formValues.newPassword !== '' && formValues.newPassword.length < 8 && (
              <p className="text-sm text-red-500">비밀번호는 8자 이상이여야 합니다.</p>
            )}
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            새 비밀번호 확인
            <input
              onChange={handleChange}
              value={formValues.newPasswordConfig}
              name="newPasswordConfig"
              type="password"
              placeholder="새 비밀번호 입력"
              className="p-4 min-w-100 border border-[#D9D9D9] rounded-lg focus:border-[#5534DA] focus:outline-none"
            />
            {formValues.newPasswordConfig !== '' &&
              formValues.newPasswordConfig !== formValues.newPassword && (
                <p className="text-sm text-red-500">비밀번호가 일치하지 않습니다!</p>
              )}
          </label>
          <button
            disabled={!isFormValid}
            type="submit"
            className="
            border bg-[#5534DA] text-white rounded-lg p-4 mt-2 hover:opacity-70
            disabled:cursor-not-allowed
            disabled:bg-[#D9D9D9]
            disabled:text-[#999999]
            disabled:hover:opacity-100
            "
          >
            변경
          </button>
        </form>
      </div>
    </div>
  );
}
