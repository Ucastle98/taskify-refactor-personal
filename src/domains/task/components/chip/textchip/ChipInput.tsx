// ChipInput.tsx
'use client';

import type { KeyboardEvent } from 'react';
import { useState } from 'react';

import Chip from './Chip';

interface ChipInputProps {
  value: string[];
  onChange: (chips: string[]) => void;
  placeholder?: string;
}

export default function ChipInput({ value, onChange, placeholder }: ChipInputProps) {
  const [input, setInput] = useState('');

  const addChip = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addChip(input);
    }

    if (e.key === 'Backspace' && input === '' && value.length > 0) {
      e.preventDefault();
      onChange(value.slice(0, -1));
    }
  };

  const removeAt = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg focus-within:border-blue-500 min-h-[44px]">
      {value.map((label, idx) => (
        <Chip key={label} label={label} colorIndex={idx % 4} onRemove={() => removeAt(idx)} />
      ))}
      <input
        className="flex-1 min-w-[120px] h-8 px-1 outline-none text-sm bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? '입력 후 Enter'}
      />
    </div>
  );
}
