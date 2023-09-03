import { env } from '@/lib/env';
import { Bird } from 'lucide-react';
import { Metadata } from 'next';
import { ReactElement } from 'react';
import RegisterForm from './_components/RegisterForm';

export const metadata: Metadata = {
  title: `${env.APP_NAME} | Register`,
  description: env.APP_DESCRIPTION,
};

export default function Register(): ReactElement {
  return (
    <section className='mx-6 w-full md:w-[400px]'>
      <div>
        <Bird size={50} />
      </div>
      <div className='mb-5 mt-2 text-xl font-bold'>Register to Community</div>
      <RegisterForm />
    </section>
  );
}
