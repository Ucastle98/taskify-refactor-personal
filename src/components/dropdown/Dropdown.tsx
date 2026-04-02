import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';

import { DropdownInputItem } from '@/components/dropdown/DropdownInputItem';
import { DropdownList } from '@/components/dropdown/DropdownList';
import { DropdownTrigger } from '@/components/dropdown/DropdownTrigger';

interface DropdownContextValue {
  isOpen: boolean;
  handleToggle: () => void;
}

interface DropdownProps {
  children: ReactNode;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within <DropdownProvider>.');
  return ctx;
}

export const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, handleToggle }}>
      <div>{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.InputItem = DropdownInputItem;
