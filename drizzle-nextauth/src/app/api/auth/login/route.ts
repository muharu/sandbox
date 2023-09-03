import { db } from '@/lib/db';
import { loginSchema } from '@/lib/models/loginSchema';
import { users } from '@/lib/schema/auth';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { ValiError, parse } from 'valibot';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const validatedPayload = parse(loginSchema, payload, {
      abortEarly: false,
    });

    const user = await db.select().from(users).where(eq(users.email, validatedPayload.email));

    if (user.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Email not found in our database', field: 'email' },
        { status: 400 },
      );
    }

    const dbPassword = user[0].password ? user[0].password : '';
    const isPasswordValid = await bcrypt.compare(validatedPayload.password, dbPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Email or password is not valid', field: 'email' },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, message: 'Login Success' });
  } catch (error) {
    if (error instanceof ValiError) {
      const field = error.issues[0].path ? error.issues[0].path[0].key : null;
      return NextResponse.json({ success: false, message: error.message, field }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: 'Unknown Error' }, { status: 500 });
  }
}
