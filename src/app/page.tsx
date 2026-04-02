'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from './components/Button';
import FormField from './components/FormField';
import Modal from './components/Modal';
import { useModal } from './hooks/useModal';

type FormValues = {
  email: string;
  password: string;
  description: string;
  category: string;
};

export default function Home() {
  const { open, openModal, closeModal } = useModal();
  const [category, setCategory] = useState('');

  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      description: '',
      category: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <main className="p-10">
      <h1 className="typo-32-b mb-4">Taskify</h1>
      <div className="w-35">
        <p className="bg-primary-tw text-white typo-32-m p-2">
          Refactoring Start (dev 브랜치에 병합)
        </p>
      </div>
      <Modal open={open} onClose={closeModal} closeOnEsc closeOnOverlayClick lockScroll>
        <div className="w-30 rounded-lg bg-white p-6">
          <h2 className="text-lg font-semibold">제목</h2>
          <p className="mt-2 text-sm text-gray-600">내용</p>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={closeModal}>닫기</button>
            <button>확인</button>
          </div>
        </div>
      </Modal>
      <Button className="w-30 h-12" variant="w" onClick={openModal}>
        로그인
      </Button>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField<FormValues>
            name="email"
            label="이메일"
            rules={{
              required: '이메일은 필수입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            }}
            inputProps={{ placeholder: '이메일', type: 'email' }}
          />

          <FormField<FormValues>
            name="password"
            label="비밀번호"
            rules={{
              required: '비밀번호는 필수입니다.',
              minLength: {
                value: 6,
                message: '비밀번호는 6자리 이상이어야 합니다.',
              },
            }}
            inputProps={{ placeholder: '비밀번호', type: 'password' }}
          />

          <FormField<FormValues>
            name="description"
            label="설명"
            inputProps={{ as: 'textarea', placeholder: '설명 입력' }}
          />

          <FormField<FormValues>
            name="category"
            label="카테고리"
            inputProps={{
              as: 'select',
              placeholderOption: '선택',
              options: [
                { value: 'frontend', label: '프론트엔드' },
                { value: 'backend', label: '백엔드' },
              ],
            }}
          />

          <Button type="submit" variant="v" className="h-12">
            제출
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
