"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {session ? `Welcome back to CareerSync` : `Welcome to CareerSync`}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {session
            ? "Continue your job search journey with personalized recommendations."
            : "Your AI-powered smart job companion. Please login to get started."}
        </p>
      </div>

      {/* Lottie Animation */}
      <div className="w-full max-w-md mx-auto mb-8 h-64 md:h-80">
        <Lottie 
          animationData={require("../../public/animation.json")}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>

      {/* Conditional CTA Button */}
      <div className="animate-fade-in-up">
        {session ? (
          <Link
            href="/dashboard"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition shadow-lg text-lg"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            href="/auth/loginForm"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition shadow-lg text-lg"
          >
            Login to Get Started
          </Link>
        )}
      </div>
    </main>
  );
}