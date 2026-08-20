'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { createColumn } from '@/services/column';

type Props = {
  open: boolean;
  onClose: () => void;
  dashboardId: number;
};

export default function AddColumnModal({ open, onClose, dashboardId }: Props) {
  const [columnName, setColumnName] = useState('');

  const queryClient = useQueryClient();

  const isValid = columnName.trim() !== '';

  const createColumnMutation = useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
      setColumnName('');
      onClose();
    },
    onError: (error) => {
      console.error(error);

      const message = isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ?? '컬럼 생성에 실패했습니다.')
        : '컬럼 생성에 실패했습니다.';

      alert(message);
    },
  });

  const handleCreate = () => {
    if (!isValid) return;

    createColumnMutation.mutate({
      title: columnName,
      dashboardId,
    });
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className="w-[520px] rounded-lg bg-white p-8">
          <h2 className="font-bold mb-5 text-xl">새 컬럼 생성</h2>

          <div className="flex flex-col flex-1 mb-3">
            <label className="block mb-1">이름</label>
            <input
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
              placeholder="새로운 프로젝트"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg hover:opacity-50 border border-gray-300"
            >
              취소
            </button>
            <button
              type="button"
              disabled={!isValid || createColumnMutation.isPending}
              onClick={handleCreate}
              className={`flex-1 py-3 rounded-lg ${isValid ? 'text-white bg-[#5534DA] hover:opacity-50' : 'cursor-not-allowed bg-gray-300'}`}
            >
              {createColumnMutation.isPending ? '생성 중...' : '생성'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
