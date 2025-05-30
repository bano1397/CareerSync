import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password, // in prod, use bcrypt!
    },
  });

  return NextResponse.json({ user: newUser });
}
