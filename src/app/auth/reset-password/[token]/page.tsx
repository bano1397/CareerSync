'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

// import { db } from '@/lib/db' // your Prisma instance
// import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export default function ResetPasswordPage() {
  const router = useRouter()
  // const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ token, password }),
    })

    if (res.ok) {
      setMessage('Password reset successfully! Redirecting...')
      setTimeout(() => router.push('/auth/loginForm'), 3000)
    } else {
      const data = await res.json()
      setMessage(data.message || 'Something went wrong.')
    }
  }

//   export async function POST(req: Request) {
//   try {
//     const { token, password } = await req.json()

//     if (!token || !password) {
//       return NextResponse.json({ message: 'Missing token or password' }, { status: 400 })
//     }

//     const resetRecord = await db.passwordResetToken.findUnique({
//       where: { token },
//     })

//     if (!resetRecord || resetRecord.expiresAt < new Date()) {
//       return NextResponse.json({ message: 'Token is invalid or expired' }, { status: 400 })
//     }

//     const hashedPassword = await hash(password, 12)

//     await db.user.update({
//       where: { id: resetRecord.userId },
//       data: { password: hashedPassword },
//     })

//     await db.passwordResetToken.delete({ where: { token } })

//     return NextResponse.json({ message: 'Password updated successfully' })
//   } catch (error) {
//     console.error('[RESET_PASSWORD_ERROR]', error)
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//   }
// }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
        {message && <p className="text-sm text-center text-yellow-400 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            placeholder="New password"
            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-medium"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
