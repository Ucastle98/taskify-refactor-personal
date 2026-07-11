import Link from 'next/link';
import { signUp } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import type { SignUpFormValues, SignUpFormErrors } from '@/types/form';

type Props = {
  formValues: SignUpFormValues;

  uiState: {
    showPassword: boolean;
    showPasswordConfirm: boolean;
  };
  error: SignUpFormErrors;

  isAgreed: boolean;

  isFormValid: boolean;

  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onAgreementChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onTogglePassword: (field: 'showPassword' | 'showPasswordConfirm') => void;
};

export default function SignupForm({
  formValues,
  uiState,
  error,
  isAgreed,
  isFormValid,
  onBlur,
  onChange,
  onAgreementChange,
  onTogglePassword,
}: Props) {
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      router.push('/auth/login');
    },

    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  // 추후 alert -> toast로 교체
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    signupMutation.mutate({
      email: formValues.email,
      password: formValues.password,
      nickname: formValues.nickname,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl mb-20">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-3">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="이메일을 입력해주세요."
            className="border border-gray-300 focus:border-[#5534DA] focus:outline-[#5534DA] p-4 rounded-lg"
          />
          {error.email && <p className="mt-1 text-sm text-red-500">{error.email}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="nickname" className="mb-3">
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={formValues.nickname}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="닉네임을 입력해주세요."
            className="border border-gray-300 focus:border-[#5534DA] focus:outline-[#5534DA] p-4 rounded-lg"
          />
          {error.nickname && <p className="mt-1 text-sm text-red-500">{error.nickname}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-3">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={uiState.showPassword ? 'text' : 'password'}
              value={formValues.password}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="비밀번호를 입력해주세요."
              className="w-full border border-gray-300 focus:border-[#5534DA] focus:outline-[#5534DA] p-4 rounded-lg"
            />
            <button
              type="button"
              onClick={() => onTogglePassword('showPassword')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
            >
              {uiState.showPassword ? '숨김' : '보기'}
            </button>
          </div>
          {error.password && <p className="mt-1 text-sm text-red-500">{error.password}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="passwordConfirm" className="mb-3">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type={uiState.showPasswordConfirm ? 'text' : 'password'}
              value={formValues.passwordConfirm}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="비밀번호를 다시 입력해주세요."
              className="w-full border border-gray-300 focus:border-[#5534DA] focus:outline-[#5534DA] p-4 rounded-lg"
            />
            <button
              type="button"
              onClick={() => onTogglePassword('showPasswordConfirm')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
            >
              {uiState.showPasswordConfirm ? '숨김' : '보기'}
            </button>
          </div>
          {error.passwordConfirm && (
            <p className="mt-1 text-sm text-red-500">{error.passwordConfirm}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={onAgreementChange}
              className="w-4 h-4 cursor-pointer accent-[#5534DA]"
            />
            이용약관에 동의합니다.
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`p-4 rounded-xl border border-gray-300 text-white ${
              isFormValid
                ? `bg-[#5534DA] cursor-pointer hover:opacity-80`
                : `bg-gray-400 cursor-not-allowed`
            }`}
          >
            가입하기
          </button>
          <span className="text-center">
            이미 회원이신가요?{' '}
            <Link href="/auth/login" className="underline text-[#5534DA]">
              로그인하기
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
