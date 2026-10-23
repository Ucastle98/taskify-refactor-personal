'use client';

import { useState } from 'react';

import Modal from '@/components/ui/Modal';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { inviteDashboard } from '@/services/dashboard';

import { useMutation } from '@tanstack/react-query';

type Props = {
  open: boolean;
  onClose: () => void;
  dashboardId?: number;
};

export default function InviteModal({ open, onClose, dashboardId }: Props) {
  const [email, setEmail] = useState('');

  const isFormValid = email.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const inviteMutation = useMutation({
    mutationFn: (email: string) => {
      if (dashboardId === undefined) {
        throw new Error('대시보드 정보가 없습니다.');
      }
      return inviteDashboard(dashboardId, { email });
    },
    onSuccess: () => {
      alert('대시보드 초대 완료했습니다!');
      setEmail('');
      onClose();
    },
    onError: (error) => {
      alert(getAxiosErrorMessage(error, '대시보드 초대를 실패했습니다.'));
    },
  });

  const handleInviteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inviteMutation.isPending) return;
    inviteMutation.mutate(email);
  };

  const handleClose = () => {
    if (inviteMutation.isPending) return;
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-130 bg-white rounded-lg p-8">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">초대하기</h2>
          <button
            type="button"
            disabled={inviteMutation.isPending}
            className="text-gray-500 text-xl font-bold hover:opacity-40 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleInviteSubmit}>
          <div className="mt-5">
            <label htmlFor="inviteEmail" className="flex flex-col gap-2">
              이메일
              <input
                id="inviteEmail"
                type="email"
                value={email}
                onChange={handleChange}
                className="rounded-lg border border-gray-400 p-4"
                placeholder="초대하실 이메일을 입력해주세요."
              />
            </label>
          </div>

          <div className="flex gap-1 mt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={inviteMutation.isPending}
              className="flex-1 p-3 border rounded-lg text-gray-400 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!isFormValid || inviteMutation.isPending}
              className="
          flex-1 p-3 border rounded-lg bg-[#5534DA] text-white hover:opacity-70
          disabled:cursor-not-allowed
          disabled:bg-[#D9D9D9]
          disabled:text-[#999999]
          disabled:hover:opacity-100
          "
            >
              {inviteMutation.isPending ? '초대 중..' : '초대하기'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
