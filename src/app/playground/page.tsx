'use client';

import { useState } from 'react';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import ColorChip from '@/components/chip/colorchip/ColorChip';
import CountChip from '@/components/chip/countchip/CountChip';
import StateChipList from '@/components/chip/statechip/StateChipList';
import ChipInput from '@/components/chip/textchip/ChipInput';
import SideMenu from '@/components/sidemenu/SideMenu';

const handleClick = () => {};

export default function PlaygroundPage() {
  // textchip (ChipInput) 테스트용
  const [projects, setProjects] = useState<string[]>(['Test']);

  // CountChip 테스트용
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen">
      {/* 왼쪽 사이드 */}
      <aside className="w-[260px] h-screen shrink-0 border-r border-r-gray-200 p-4">
        <SideMenu />
      </aside>

      <main className="flex-1 bg-[#FAFAFA] p-6">
        <h1>공용 컴포넌트 테스트</h1>
        <p className="mb-14">확인용 페이지 (추후 삭제)</p>

        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-2 w-[360px] px-2 mb-7"
          >
            <label htmlFor="todo-create-tags" className="typo-14-m text-black font-bold">
              태그
            </label>
            <ChipInput value={projects} onChange={setProjects} placeholder="입력 후 Enter" />
          </form>

          <ColorChip />
          <div className="mt-4">
            <StateChipList />
          </div>

          <div className="flex flex-col gap-2 mt-4 ml-4">
            <p className="text-[#5534DA]">Plus 버튼</p>
            <ActionChip variant="task" label="할 일 생성 이미지 추가" onClick={handleClick} />
            <ActionChip variant="avatar" label="프로필 이미지 추가" onClick={handleClick} />
            <ActionChip variant="column" text="새 컬럼 만들기" onClick={handleClick} />
          </div>

          <div className="mt-6 px-2">
            <p className="typo-14-m font-bold mb-2">CountChip 테스트</p>

            <div className="flex items-center gap-3">
              <CountChip count={count} label="To do" max={99} />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border px-3 py-1"
                  onClick={() => setCount((c) => c + 1)}
                >
                  +1
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="rounded-md border px-3 py-1"
                  onClick={() => setCount((c) => Math.max(0, c - 1))}
                >
                  -1
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="rounded-md border px-3 py-1"
                  onClick={() => setCount(0)}
                >
                  reset
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
