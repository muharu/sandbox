'use client';

import { Button } from '@/components/Shared/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Shared/Form';
import { Input } from '@/components/Shared/Input';
import { TLogin, loginSchema } from '@/lib/models/loginSchema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm(): ReactElement {
  const form = useForm({
    resolver: valibotResolver(loginSchema),
    shouldFocusError: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: TLogin) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const { success, message, field } = await response.json();
    if (success) {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: '/',
      });
      form.reset();
    } else if (!success) {
      form.resetField('password');
      form.setError(field, { message });
    } else {
      console.log('Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' type='text' autoComplete='email' autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password' type='password' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full'>Login</Button>
        <div className='my-2'>
          Dont have an account?{' '}
          <Link href='/register' className='hover:underline hover:underline-offset-2'>
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
}
