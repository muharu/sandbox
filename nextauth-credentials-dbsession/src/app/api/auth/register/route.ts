import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json(
      {
        success: false,
        message: "Email already exist",
        field: "email",
      },
      { status: 400 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  await prisma.user.create({
    data: {
      email: body.email,
      password: hashPassword,
    },
  });

  return NextResponse.json({
    success: true,
    message: "User created successfully",
  });
}
