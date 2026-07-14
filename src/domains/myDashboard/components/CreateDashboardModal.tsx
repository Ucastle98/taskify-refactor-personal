'use client';

import Modal from '@/components/ui/Modal';
import ColorChip from '@/domains/dashboard/components/chip/ColorChip';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { createDashboard } from '@/services/dashboard';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateDashboardModal({ open, onClose }: Props) {
  const [selectedColor, setSelectedColor] = useState('#7AC555');
  const [dashboardName, setDashboardName] = useState('');

  const queryClient = useQueryClient();

  const isValid = dashboardName.trim() !== '';

  const createMutation = useMutation({
    mutationFn: createDashboard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      setDashboardName('');
      onClose();
    },

    onError: (error) => {
      console.error(error);

      const message = isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ?? '대시보드 생성에 실패했습니다.')
        : '대시보드 생성에 실패했습니다.';

      alert(message);
    },
  });

  const handleCreate = () => {
    if (!isValid) return;

    createMutation.mutate({
      title: dashboardName,
      color: selectedColor,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-135 rounded-lg bg-white p-8">
        <h2 className="mb-6 text-xl font-bold">새로운 대시보드</h2>
        <label className="mb-2 block text-lg">대시보드 이름</label>
        <input
          type="text"
          placeholder="뉴프로젝트"
          value={dashboardName}
          onChange={(e) => setDashboardName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 mb-4"
        />
        <ColorChip selected={selectedColor} onSelect={setSelectedColor} />
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 py-3 text-center text-gray-600"
          >
            취소
          </button>
          <button
            type="button"
            disabled={!isValid || createMutation.isPending}
            onClick={handleCreate}
            className={`flex-1 rounded-lg bg-[#5534DA] py-3 text-center text-white
              ${isValid ? 'bg-[#5534DA]' : 'bg-gray-400 cursor-not-allowed'}
              `}
          >
            {createMutation.isPending ? '생성 중...' : '생성'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
