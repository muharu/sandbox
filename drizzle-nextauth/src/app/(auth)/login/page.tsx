import { authOptions } from '@/lib/auth';
import { env } from '@/lib/env';
import { Bird } from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from './_components/LoginForm';

export const metadata: Metadata = {
  title: `${env.APP_NAME} | Login`,
};

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }
  return (
    <section className='mx-6 w-full md:w-[400px]'>
      <div>
        <Bird size={50} />
      </div>
      <div className='mb-5 mt-2 text-xl font-bold'>Login to Community</div>
      <LoginForm />
    </section>
  );
}
