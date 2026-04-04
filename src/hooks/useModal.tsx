'use client';

import { useCallback, useState } from 'react';

interface UseModalOptions {
  initialOpen?: boolean;
}

export function useModal(options: UseModalOptions = {}) {
  const { initialOpen = false } = options;
  const [open, setOpen] = useState<boolean>(initialOpen);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toggleModal = useCallback(() => setOpen((v) => !v), []);

  return { open, openModal, closeModal, toggleModal, setOpen };
}
