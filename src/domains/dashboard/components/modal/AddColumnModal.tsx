'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

export default function AddColumnModal({ open, onClose, onCreate }: Props) {
  const [columnName, setColumnName] = useState('');

  const isValid = columnName.trim() !== '';

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
              disabled={!isValid}
              onClick={() => {
                onCreate(columnName);
                onClose();
              }}
              className={`flex-1 py-3 rounded-lg ${isValid ? 'text-white bg-[#5534DA] hover:opacity-50' : 'cursor-not-allowed bg-gray-300'}`}
            >
              생성
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
