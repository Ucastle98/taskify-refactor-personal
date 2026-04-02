import { type ReactNode, useCallback, useState } from 'react';

import { SearchDropdownTrigger } from '@/components/searchDropdown/SearchDropdownTrigger';
import { SearchDropdownUserItem } from '@/components/searchDropdown/SearchDropdownUserItem';
import { SearchDropdownUserList } from '@/components/searchDropdown/SearchDropdownUserList';
import type { User } from '@/components/searchDropdown/useSearchDropdownContext';
import { SearchDropdownContext } from '@/components/searchDropdown/useSearchDropdownContext';
import { useDropdownClose } from '@/hooks/useDropdownClose';

interface SearchDropdownProps {
  children: ReactNode;
  className?: string;
}

const BASE = 'w-54';

export const SearchDropdown = ({ children, className = BASE }: SearchDropdownProps) => {
  const [searchData, setSearchData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = (data: string) => {
    setSearchData(data);
  };

  const handleToggle = useCallback(() => {
    setSearchData('');
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchData('');
  }, []);

  const dropdownRef = useDropdownClose(handleClose);

  return (
    <SearchDropdownContext.Provider
      value={{
        searchData,
        handleSearch,
        isOpen,
        handleToggle,
        selectedUser,
        setSelectedUser,
      }}
    >
      <div ref={dropdownRef} className={className}>
        {children}
      </div>
    </SearchDropdownContext.Provider>
  );
};

SearchDropdown.Trigger = SearchDropdownTrigger;
SearchDropdown.UserList = SearchDropdownUserList;
SearchDropdown.UserItem = SearchDropdownUserItem;
