'use client';

import { useEffect, useRef } from 'react';

type MenuItem = {
  label: string;
  onClick: () => void;
};

type DropdownMenuProps = {
  open: boolean;
  onClose: () => void;
  items?: MenuItem[];
  className?: '';
};

export default function DropdownMenu({ open, onClose, items }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (menuRef.current !== null && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute mt-1 w-23.25 h-20.5 border border-gray-300 rounded-lg bg-white"
    >
      <div className="flex flex-col items-center">
        {items?.map((item) => (
          <div key={item.label}>
            <button
              className="flex mt-1 p-1 rounded-lg hover:text-[#5534DA] hover:bg-purple-100"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// GNB에서 프로필 클릭 시 이용하는 드롭다운
