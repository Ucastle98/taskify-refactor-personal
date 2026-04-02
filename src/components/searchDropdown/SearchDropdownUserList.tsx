import type { ReactNode } from 'react';

import { useSearchDropdownContext } from './useSearchDropdownContext';

type UserItem = { id: number; content: string; profileImg: string };

interface SearchDropdownUserListProps {
  items: UserItem[];
  children: (item: UserItem) => ReactNode;
  className?: string;
}

const BASE = 'w-54 absolute border border-[#D9D9D9] rounded-md bg-[#FFFFFF]';

export const SearchDropdownUserList = ({
  items,
  children,
  className = BASE,
}: SearchDropdownUserListProps) => {
  const { searchData, isOpen } = useSearchDropdownContext();

  if (!isOpen) return null;

  const filtered =
    searchData === ''
      ? items
      : items.filter((it) => it.content.toLowerCase().includes(searchData.toLowerCase()));

  if (filtered.length === 0) {
    return null;
  }

  return <div className={className}>{filtered.map(children)}</div>;
};
