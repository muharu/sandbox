import { Input, email, maxLength, minLength, object, regex, string } from 'valibot';

export const loginSchema = object({
  email: string('Username must be a string', [email('Email must be a valid email address')]),
  password: string('Password must be a string', [
    minLength(8, 'Password must be at least 8 characters'),
    regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    regex(/\d/, 'Password must contain at least one digit number'),
    regex(/[^a-z0-9]/i, 'Password must contain at least one special character (e.g. !@#$%^&*)'),
    maxLength(50, 'Password must be at most 50 characters'),
  ]),
});

export type TLogin = Input<typeof loginSchema>;
