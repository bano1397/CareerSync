"use client";

import Link from "next/link";



export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to CareerSync
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Your AI-powered smart job companion. Match with jobs, track your
        applications, and grow your career.
      </p>

      {/* Optional: You can insert a <ProfilePreview /> component here in future */}

      <div className="flex space-x-4">
        <Link
          href="/dashboard"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/auth/loginForm"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Log In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-white text-indigo-600 px-6 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
