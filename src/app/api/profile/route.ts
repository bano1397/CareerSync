import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig as authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const data = await req.json()
    console.log('Received data:', data) // Debug log

    // Find or create user
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      create: { email: session.user.email },
      update: {}
    })

    // Save profile
    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        name: data.name,
        email: session.user.email,
        project: data.project,
        tools: JSON.stringify(data.tools || []),
        imageUrl: data.imageUrl
      },
      update: {
        name: data.name,
        project: data.project,
        tools: JSON.stringify(data.tools || []),
        imageUrl: data.imageUrl
      }
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error('Full error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save profile',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}