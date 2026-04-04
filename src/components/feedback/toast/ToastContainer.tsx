'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import errorImage from '@/components/feedback/toast/assets/error.svg';
import successImage from '@/components/feedback/toast/assets/success.svg';
import warningImage from '@/components/feedback/toast/assets/warning.svg';
import type { ToastEventType, ToastType } from '@/components/feedback/toast/type';

export const toast = ({ message, eventType }: ToastType) => {
  const event = new CustomEvent('showToast', {
    detail: { message, eventType },
  });

  window.dispatchEvent(event);
};

const TOAST_DURATION = 3000;

export function ToastContainer() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const { message, eventType } = (e as CustomEvent<ToastType>).detail;

      setToast({ message, eventType });

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setToast(null);
      }, TOAST_DURATION);
    };

    window.addEventListener('showToast', handleShowToast);

    return () => {
      window.removeEventListener('showToast', handleShowToast);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!toast) return null;

  return <ToastComponent eventType={toast.eventType} message={toast.message} />;
}

function ToastComponent({ eventType, message }: { eventType: ToastEventType; message: string }) {
  const getEventTypeImage = (): ReactNode => {
    switch (eventType) {
      case 'success':
        return <Image src={successImage} alt="성공" />;
      case 'error':
        return <Image src={errorImage} alt="실패" />;
      case 'info':
        return <Image src={warningImage} alt="경고" />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto flex h-12 w-fit items-center gap-1 rounded-3xl border px-3">
      <div>{getEventTypeImage()}</div>
      <div>{message}</div>
    </div>
  );
}
