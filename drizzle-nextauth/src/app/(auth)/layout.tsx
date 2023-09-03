import { buttonVariants } from '@/components/Shared/Button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren, ReactElement } from 'react';

export default function AuthLayout({ children }: PropsWithChildren): ReactElement {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='ml-2 mt-7 md:ml-8'>
        <Link href='/' className={cn('flex', buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <span>
            <ChevronLeft size={16} className='pt-0.5' />
          </span>
          Home
        </Link>
      </div>
      <div className='flex flex-grow items-center justify-center'>{children}</div>
    </div>
  );
}
