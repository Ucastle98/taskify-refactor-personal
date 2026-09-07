'use client';

import Modal from '@/components/ui/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InviteModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-130 bg-white rounded-lg p-8">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">초대하기</h2>
          <button className="text-gray-500 text-xl font-bold hover:opacity-40" onClick={onClose}>
            X
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label>
            이메일
            <input
              className="rounded-lg border border-gray-400 p-4"
              placeholder="초대하실 이메일을 입력해주세요."
            />
          </label>
        </div>

        <div className="flex gap-1 mt-5">
          <button
            onClick={onClose}
            className="flex-1 p-3 border rounded-lg text-gray-400 hover:bg-gray-200"
          >
            취소
          </button>
          <button className="flex-1 p-3 border rounded-lg bg-[#5534DA] text-white hover:opacity-70">
            초대하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
