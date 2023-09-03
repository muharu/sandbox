import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";

export const authOptions: AuthOptions = {
  secret: "asdadad",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password as string
        );

        if (!isValid) return null;

        const sessionToken = randomUUID();
        const tokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await prisma.session.create({
          data: {
            userId: user.id,
            sessionToken: sessionToken,
            expires: tokenExpiration,
          },
        });

        return { ...user, sessionToken, tokenExpiration } as unknown as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.sessionToken = user.sessionToken;
        token.tokenExpiration = user.tokenExpiration;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.id = token.id;
      session.sessionToken = token.sessionToken;

      return session;
    },
  },
};
