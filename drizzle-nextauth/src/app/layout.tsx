import SessionProvider from '@/components/SessionProvider';
import { env } from '@/lib/env';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: env.APP_NAME,
  description: env.APP_DESCRIPTION,
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning className='dark'>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
