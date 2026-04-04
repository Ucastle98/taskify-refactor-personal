// ColorChip.tsx

import { useState } from 'react';

const COLORS = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'] as const;

// TODO: 대시보드 생성 시 선택 상태

export default function ColorChip() {
  const [selected, setSelected] = useState<(typeof COLORS)[number]>(COLORS[0]);

  const handleSelect = (color: (typeof COLORS)[number]) => {
    setSelected(color);
  };

  return (
    <div className="flex items-center gap-2">
      {COLORS.map((color) => {
        const isSelected = selected === color;

        return (
          <button
            key={color}
            type="button"
            onClick={() => handleSelect(color)}
            className="relative w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          >
            {isSelected && (
              <span className="absolute inset-0 grid place-items-center text-white text-sm font-bold">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// 대시보드 생성 폼 확장
// const handleSelect = (color: string) => {
//   setSelected(color);
//   setForm((prev) => ({...prev, color}));
// }
