'use client';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import { Dropdown } from '@/components/dropdown/Dropdown';
import Modal from '@/components/ui/Modal';
import StateChipItem, {
  type StateLabel,
} from '@/domains/task/components/chip/statechip/StateChipItem';
import StateChipList from '@/domains/task/components/chip/statechip/StateChipList';
import ChipInput from '@/domains/task/components/chip/textchip/ChipInput';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ModifyTaskModal({ open, onClose }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<StateLabel>('To Do');

  return (
    <Modal open={open} onClose={onClose}>
      <div className="max-w-[520px] rounded-lg bg-white p-8">
        <h2 className="font-bold text-xl mb-6">할 일 수정</h2>

        <div className="flex flex-1 gap-5 mb-6">
          <Dropdown>
            <div className="relative flex-1">
              <label className="block mb-2">상태</label>

              <Dropdown.Trigger label={<StateChipItem label={status} />} />

              <Dropdown.List className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 shadow-lg p-1">
                <Dropdown.InputItem
                  onSelect={() => setStatus('To Do')}
                  isSelected={status === 'To Do'}
                >
                  <StateChipItem label="To Do" />
                </Dropdown.InputItem>

                <Dropdown.InputItem
                  onSelect={() => setStatus('On Progress')}
                  isSelected={status === 'On Progress'}
                >
                  <StateChipItem label="On Progress" />
                </Dropdown.InputItem>

                <Dropdown.InputItem
                  onSelect={() => setStatus('Done')}
                  isSelected={status === 'Done'}
                >
                  <StateChipItem label="Done" />
                </Dropdown.InputItem>
              </Dropdown.List>
            </div>
          </Dropdown>

          <div>
            <label className="block mb-2">담당자</label>
            <input className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex gap-1 mb-2">
            제목<span className="text-purple-700 font-bold text-base">*</span>
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        <div className="mb-6">
          <label className="flex gap-1 mb-2">
            설명<span className="text-purple-700 font-bold text-base">*</span>
          </label>
          <textarea
            placeholder="설명을 입력해주세요"
            className="border border-gray-300 rounded-lg resize-none w-full h-24 p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">마감일</label>
          <input
            type="text"
            placeholder="날짜를 입력해 주세요"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">태그</label>
          <ChipInput value={tags} onChange={setTags} placeholder="입력 후 Enter" />
        </div>

        <div className="mb-6">
          <label className="block mb-2">이미지</label>
          <ActionChip variant="task" onClick={() => console.log('이미지 업로드')} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg p-2 hover:opacity-50"
          >
            취소
          </button>
          <button className="flex-1 border bg-[#5534DA] text-white rounded-lg p-2 hover:opacity-50">
            생성
          </button>
        </div>
      </div>
    </Modal>
  );
}
