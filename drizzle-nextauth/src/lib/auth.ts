import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { env } from './env';
import { users } from './schema/auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        if (!credentials?.password) return null;
        const user = await db.select().from(users).where(eq(users.email, credentials.email));
        if (user.length === 0) return null;
        const password = user[0].password ? user[0].password : '';
        const isPasswordValid = await bcrypt.compare(credentials.password, password);
        if (!isPasswordValid) return null;
        const currentUser = user[0] ? user[0] : null;
        return currentUser as unknown as User;
      },
    }),
  ],
  pages: { signIn: '/login' },
  secret: env.NEXTAUTH_SECRET,
};
