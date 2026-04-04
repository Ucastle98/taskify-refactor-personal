import { createContext, useContext } from 'react';

export type User = { id: number; content: string; profileImg: string };

interface SearchDropdownContextValue {
  searchData: string;
  isOpen: boolean;
  handleSearch: (value: string) => void;
  handleToggle: () => void;

  selectedUser: User | null;
  setSelectedUser: (u: User | null) => void;
}

export const SearchDropdownContext = createContext<SearchDropdownContextValue | null>(null);

export function useSearchDropdownContext() {
  const ctx = useContext(SearchDropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within <SearchDropdown>.');
  return ctx;
}
