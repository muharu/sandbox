import { db } from '@/lib/db';
import { registerSchema } from '@/lib/models/registerSchema';
import { users } from '@/lib/schema/auth';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { ValiError, parse } from 'valibot';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const validatedPayload = parse(registerSchema, payload, {
      abortEarly: false,
    });

    const { username, email, password } = validatedPayload;

    const existingUsername = await db.select().from(users).where(eq(users.username, username));

    if (existingUsername.length) {
      return NextResponse.json(
        { success: false, message: 'Username already exists', field: 'username' },
        { status: 400 },
      );
    }

    const existingEmail = await db.select().from(users).where(eq(users.email, email));

    if (existingEmail.length) {
      return NextResponse.json(
        { success: false, message: 'Email already registered', field: 'email' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, message: 'Register Success' });
  } catch (error) {
    if (error instanceof ValiError) {
      const field = error.issues[0].path ? error.issues[0].path[0].key : null;
      return NextResponse.json({ success: false, message: error.message, field }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: 'Unknown Error' }, { status: 500 });
  }
}
