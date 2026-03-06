// PageToast.tsx

import { useState } from 'react';

export default function usePageToast() {
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const Toast = message ? (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg z-50">
      {message}
    </div>
  ) : null;

  return { showToast, Toast };
}
