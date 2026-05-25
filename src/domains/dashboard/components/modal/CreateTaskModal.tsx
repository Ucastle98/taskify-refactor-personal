'use client';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import Modal from '@/components/ui/Modal';
import ChipInput from '@/domains/task/components/chip/textchip/ChipInput';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateTaskModal({ open, onClose }: Props) {
  const [tags, setTags] = useState<string[]>([]);

  const handleCreate = () => {
    console.log({
      tags,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[520px] rounded-lg bg-white p-8">
        <h2 className="mb-6 text-xl font-bold">할 일 생성</h2>

        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-base font-medium">담당자</label>
            <select className="w-full rounded-lg border border-gray-300 p-3">
              <option>이름을 입력해 주세요</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-base font-mediun flex gap-1">
              제목<span className="text-purple-700 font-bold text-base">*</span>
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="제목을 입력해 주세요"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium flex gap-1">
              설명<span className="text-purple-700 font-bold text-base">*</span>
            </label>
            <textarea
              className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3"
              placeholder="설명을 입력해 주세요"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium">마감일</label>
            <input
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="날짜를 입력해 주세요"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium">태그</label>
            <ChipInput value={tags} onChange={setTags} placeholder="입력 후 Enter" />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 block text-base font-medium">이미지</label>

            <ActionChip variant="task" onClick={() => console.log('이미지 업로드')} />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 py-3"
          >
            취소
          </button>
          <button
            onClick={handleCreate}
            type="button"
            className="flex-1 rounded-lg bg-[#5534DA] py-3 text-white"
          >
            생성
          </button>
        </div>
      </div>
    </Modal>
  );
}
