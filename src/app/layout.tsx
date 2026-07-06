import { ToastContainer } from '@/components/feedback/toast/ToastContainer';

import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
