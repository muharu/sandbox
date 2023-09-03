'use client';

import { Button } from '@/components/Shared/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Shared/Form';
import { Input } from '@/components/Shared/Input';
import { TRegister, registerSchema } from '@/lib/models/registerSchema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm(): ReactElement {
  const form = useForm({
    resolver: valibotResolver(registerSchema),
    shouldFocusError: true,
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: TRegister) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (response.status === 500) {
      return alert('Something went wrong. Please try again later.'); // Self Note: Gonna change this to a toast or alert component
    }

    const { success, message, field } = await response.json();

    if (success) {
      location.replace(`/login?message=${message}`);
    } else {
      form.setError(field, { message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' type='text' autoComplete='off' autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' type='text' autoComplete='email' {...field} />
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
        <Button className='w-full'>Register</Button>
        <div className='my-2'>
          Already have an account?{' '}
          <Link href='/login' className='hover:underline hover:underline-offset-2'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
