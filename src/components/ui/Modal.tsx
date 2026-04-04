'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  lockScroll?: boolean;
  rootClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;
  container?: HTMLElement | null;
};

export default function Modal({
  open,
  onClose,
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  lockScroll = true,
  rootClassName,
  contentClassName,
  overlayClassName,
  container,
}: ModalProps) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open || !lockScroll) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, lockScroll]);

  if (!open) return null;

  const target = container ?? document.body;

  return createPortal(
    <div className={`fixed inset-0 z-50 isolate ${rootClassName ?? ''}`}>
      <div
        className={`absolute inset-0 ${overlayClassName ?? 'bg-black/40'}`}
        aria-hidden="true"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          className={`pointer-events-auto ${contentClassName ?? ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    target,
  );
}
