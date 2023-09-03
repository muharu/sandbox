'use client';

import { SessionProvider as NextAuthSession } from 'next-auth/react';
import { PropsWithChildren, ReactElement } from 'react';

export default function SessionProvider({ children }: PropsWithChildren): ReactElement {
  return <NextAuthSession>{children}</NextAuthSession>;
}
