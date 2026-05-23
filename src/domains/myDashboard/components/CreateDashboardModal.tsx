'use client';

import Modal from '@/components/ui/Modal';
import ColorChip from '@/domains/dashboard/components/chip/ColorChip';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateDashboardModal({ open, onClose }: Props) {
  const [selectedColor, setSelectedColor] = useState('#7AC555');
  const [dashboardName, setDashboardName] = useState('');

  const isValid = dashboardName.trim() !== '';

  const handleCreate = () => {
    console.log(selectedColor);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[540px] rounded-lg bg-white p-8">
        <h2 className="mb-6 text-xl font-bold">새로운 대시보드</h2>
        <label className="mb-2 block text-lg">대시보드 이름</label>
        <input
          type="text"
          placeholder="뉴프로젝트"
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
            disabled={!isValid}
            onClick={handleCreate}
            className={`flex-1 rounded-lg bg-[#5534DA] py-3 text-center text-white
              ${isValid ? 'bg-[#5534DA]' : 'bg-gray-400 cursor-not-allowed'}
              `}
          >
            생성
          </button>
        </div>
      </div>
    </Modal>
  );
}
