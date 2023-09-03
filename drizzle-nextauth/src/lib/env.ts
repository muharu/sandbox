import { enumType, minLength, object, parse, string, url } from 'valibot';

const envSchema = object({
  NODE_ENV: enumType(['development', 'production', 'test']),
  APP_NAME: string([minLength(1)]),
  APP_DESCRIPTION: string([minLength(1)]),
  DATABASE_URL: string([minLength(1)]),
  NEXTAUTH_SECRET: string([minLength(1)]),
  NEXTAUTH_URL: string([minLength(1), url()]),
});

const rawEnv = {
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const env = parse(envSchema, rawEnv);
