// app/about/page.tsx
"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import aboutAnimation from "@/components/AboutAnimation.json"; // ← Put a relevant animation in this path

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0E0E23] text-white px-6 py-12 flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">About CareerSync</h1>
        <p className="text-gray-300 text-lg mb-6">
          CareerSync is your AI-powered job search and career management platform designed to connect you with the best opportunities, help you prepare, and grow your career.
        </p>

        <div className="w-full max-w-sm mx-auto mb-10">
          <Lottie animationData={aboutAnimation} loop autoplay />
        </div>

        <div className="text-left space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-2">🔍 Smart Job Matching</h2>
            <p className="text-gray-400">
              Instantly find jobs tailored to your interests, skills, and location. Integrated with real-time data via RapidAPI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">🤖 AI Career Assistant</h2>
            <p className="text-gray-400">
              Ask our chatbot about resumes, interviews, salaries, or specific job roles. Powered by generative AI to help you stay ahead.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">🔐 Secure & Personalized</h2>
            <p className="text-gray-400">
              Your data is secured with NextAuth authentication. Personalized dashboards adapt to your profile dynamically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">📊 Career Insights</h2>
            <p className="text-gray-400">
              Understand job market trends, learn about employers, and make data-informed career moves.
            </p>
          </section>
        </div>

        <Link href="/" className="mt-10 inline-block px-6 py-3 bg-indigo-600 rounded-md hover:bg-indigo-700 transition font-medium">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
