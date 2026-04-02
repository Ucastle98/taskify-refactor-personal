import type { ReactNode } from 'react';
import Image from 'next/image';

import checkItem from '@/components/dropdown/assets/check-item.svg';

import { useDropdownContext } from './Dropdown';

interface DropdownItemProps {
  children: ReactNode;
  height?: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const DropdownInputItem = ({
  children,
  height = 12,
  isSelected,
  onSelect,
}: DropdownItemProps) => {
  const { handleToggle } = useDropdownContext();

  return (
    <div className={`h-${height} flex items-center hover:bg-[#F1EFFD] rounded-sm`}>
      <button
        className="w-full text-left"
        onClick={() => {
          onSelect();
          handleToggle();
        }}
      >
        <div className="mx-4 my-2">
          <div className="flex items-center gap-2">
            <div className="w-[22px] h-[22px] shrink-0">
              {isSelected && <Image src={checkItem} alt="선택됨" />}
            </div>
            {children}
          </div>
        </div>
      </button>
    </div>
  );
};
