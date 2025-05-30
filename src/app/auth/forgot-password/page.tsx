"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (res.ok) {
    setSubmitted(true);
  } else {
    const data = await res.json();
    alert(data.message || 'Error sending reset link.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-4">Forgot your password?</h2>
        <p className="text-gray-400 mb-6">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-lg font-medium"
            >
              Send reset link
            </button>
          </form>
        ) : (
          <div className="text-green-400 text-center">
            <p>Check your email for the password reset link.</p>
            <Link href="/auth/loginForm" className="text-violet-400 hover:underline">
              Back to login
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link href="/auth/loginForm" className="text-violet-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
