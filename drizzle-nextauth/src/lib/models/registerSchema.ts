import { Input, email, maxLength, minLength, object, regex, string } from 'valibot';

const usernameRegex = /^[a-z0-9_]+$/i;

export const registerSchema = object({
  username: string('Username must be a string', [
    minLength(5, 'Username must be at least 5 characters'),
    maxLength(20, 'Username must be at most 20 characters'),
    regex(usernameRegex, 'Username can only contain letters, numbers, and underscores'),
  ]),
  email: string('Email must be a valid email address', [email('Please enter a valid email address')]),
  password: string('Password must be a string', [
    minLength(8, 'Password must be at least 8 characters'),
    regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    regex(/\d/, 'Password must contain at least one digit number'),
    regex(/[^a-z0-9]/i, 'Password must contain at least one special character (e.g. !@#$%^&*)'),
    maxLength(50, 'Password must be at most 50 characters'),
  ]),
});

export type TRegister = Input<typeof registerSchema> | undefined;
