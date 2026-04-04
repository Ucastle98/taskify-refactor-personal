import Image from 'next/image';

import type { User } from './useSearchDropdownContext';
import { useSearchDropdownContext } from './useSearchDropdownContext';

interface SearchDropdownUserItemProps {
  user: User;
  className?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const BASE = 'w-full h-12 px-4 py-2 gap-2 flex items-center hover:bg-[#F1EFFD] rounded-sm';

export const SearchDropdownUserItem = ({
  user,
  className = BASE,
  isSelected,
  onSelect,
}: SearchDropdownUserItemProps) => {
  const { handleToggle, setSelectedUser } = useSearchDropdownContext();

  return (
    <button
      className={className}
      onClick={() => {
        onSelect();
        setSelectedUser(user);
        handleToggle();
      }}
    >
      <div className="w-[22px] h-[22px] shrink-0">
        {isSelected && <Image src="/icons/check-item.svg" alt="선택됨" width={22} height={22} />}
      </div>
      <div className="flex gap-2">
        <div className="w-[22px] h-[22px] rounded-full overflow-hidden shrink-0">
          <Image src={user.profileImg} alt={user.content} width={22} height={22} />
        </div>
        <div>{user.content}</div>
      </div>
    </button>
  );
};
