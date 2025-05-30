// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
