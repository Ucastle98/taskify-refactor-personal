'use client';

import CountChip from '@/domains/task/components/chip/countchip/CountChip';
import SettingButton from '../icons/SettingIcon';
import Dot from '../ui/Dot';
import PlusMark from '@/components/icons/PlusMark';
import CreateTaskModal, { Task } from '../modal/CreateTaskModal';
import { useState } from 'react';
import ModifyTaskModal from '../modal/ModifyTaskModal';
import Chip from '@/domains/task/components/chip/textchip/Chip';

type Props = {
  title: string;
};

export default function ColumnCard({ title }: Props) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isModifyTaskModalOpen, setIsModifyTaskModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <section className="w-70 rounded-lg border border-gray-300 bg-white p-4">
      <div className="flex justify-between mb-2">
        <div className="flex justify-center items-center gap-1">
          <Dot />
          <h2 className="font-bold text-[#333236]">{title}</h2>
          <CountChip count={tasks.length} />
        </div>

        <div className="relative">
          <button
            type="button"
            className="hover:opacity-50"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <SettingButton />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-8 z-10 w-28 rounded-lg border border-gray-300 bg-white shadow-md">
              <button
                type="button"
                onClick={() => {
                  setIsModifyTaskModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                수정하기
              </button>

              <button
                type="button"
                onClick={() => {
                  setTasks([]);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
        <ModifyTaskModal
          open={isModifyTaskModalOpen}
          onClose={() => setIsModifyTaskModalOpen(false)}
        />
      </div>
      <button
        onClick={() => setIsCreateTaskModalOpen(true)}
        className="w-full border border-gray-300 rounded-lg p-1 mb-2"
      >
        <span className="inline-flex rounded-md bg-violet-100 p-2 hover:opacity-50">
          <PlusMark size={11} thickness={2} />
        </span>
      </button>
      <CreateTaskModal
        open={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreate={handleCreateTask}
      />
      {tasks.map((task, index) => (
        <div key={`${task.title}-${index}`} className="rounded-lg border border-gray-300 p-3 mb-2">
          {task.imageUrl && (
            <img
              src={task.imageUrl}
              alt={task.title}
              className="mb-2 h-40 w-full rounded-lg object-cover"
            />
          )}

          <h3 className="font-bold">{task.title}</h3>

          <div className="flex gap-1">
            {task.tags.map((tag, idx) => (
              <Chip key={tag} label={tag} colorIndex={idx % 4} />
            ))}
          </div>
          {/* <p className="text-gray-500 font-bold">
            {task.dueDate?.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </p> */}
          <p className="text-sm text-[#787486]">{formatDate(task.dueDate)}</p>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="mt-4 text-sm text-gray-400">아직 할 일이 없습니다.</div>
      )}
    </section>
  );
}
