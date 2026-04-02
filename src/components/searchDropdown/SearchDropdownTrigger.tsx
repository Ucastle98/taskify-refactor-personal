import Image from 'next/image';

import { useSearchDropdownContext } from './useSearchDropdownContext';

interface SearchDropdownTriggerProps {
  label?: string;
  className?: string;
}

const BASE = 'w-full h-12 border border-[#D9D9D9] pl-4 rounded-md focus:outline-[#5534DA]';

export const SearchDropdownTrigger = ({ label, className = BASE }: SearchDropdownTriggerProps) => {
  const { handleToggle, handleSearch, searchData, selectedUser, setSelectedUser } =
    useSearchDropdownContext();

  const showSelectedPlaceholder = !!selectedUser && searchData === '';

  return (
    <div className="relative">
      {showSelectedPlaceholder && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          <div className="w-[22px] h-[22px] rounded-full overflow-hidden">
            <Image
              src={selectedUser.profileImg}
              alt={selectedUser.content}
              width={22}
              height={22}
            />
          </div>
          <span>{selectedUser.content}</span>
        </div>
      )}
      <input
        type="text"
        className={className}
        onClick={handleToggle}
        value={searchData}
        placeholder={!selectedUser ? label : ''}
        onChange={(e) => {
          handleSearch(e.target.value);

          // if (selectedUser && e.target.value !== selectedUser.content) {
          //   setSelectedUser(null);
          // }
        }}
      />
    </div>
  );
};
