'use client';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import Modal from '@/components/ui/Modal';
import ChipInput from '@/domains/task/components/chip/textchip/ChipInput';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

export type Task = {
  title: string;
  description?: string;
  dueDate: Date | null;
  tags: string[];
  imageUrl?: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
};

export default function CreateTaskModal({ open, onClose, onCreate }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCreate = () => {
    onCreate({
      title,
      description,
      dueDate: date,
      tags,
      imageUrl: preview,
    });

    onClose();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const handleRemoveImage = () => {
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[520px] rounded-lg bg-white p-8">
        <h2 className="mb-6 text-xl font-bold">할 일 생성</h2>

        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block ">담당자</label>
            <select className="w-full rounded-lg border border-gray-300 p-3">
              <option>이름을 입력해 주세요</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block  flex gap-1">
              제목<span className="text-purple-700 font-bold text-base">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="제목을 입력해 주세요"
            />
          </div>

          <div>
            <label className="mb-2 block  flex gap-1">
              설명<span className="text-purple-700 font-bold text-base">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3"
              placeholder="설명을 입력해 주세요"
            />
          </div>

          <div>
            <label className="mb-2 block ">마감일</label>
            <DatePicker
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="날짜를 선택해 주세요"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block ">태그</label>
            <ChipInput value={tags} onChange={setTags} placeholder="입력 후 Enter" />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 block ">이미지</label>

            <div className="relative h-14 w-14">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="선택한 이미지"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs text-white hover:opacity-80"
                  >
                    X
                  </button>
                </>
              ) : (
                <ActionChip variant="task" onClick={handleImageClick} />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChage}
            />
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
