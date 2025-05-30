"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard"); // ✅ change to your post-login route
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-gray-800 p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-300">Log in to continue capturing memories.</p>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full p-8 md:p-10">
          <h2 className="text-2xl font-semibold mb-4">Log in to your account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-violet-400 hover:underline">
              Sign up
            </Link>
          </p>

          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-right text-sm">
              <Link
                href="/auth/forgot-password"
                className="text-violet-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-lg font-medium"
            >
              Log in
            </button>
          </form>

          <div className="flex items-center gap-2 my-6">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="text-sm text-gray-400">or log in with</span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <FcGoogle size={20} />
              <span className="ml-2">Google</span>
            </button>
            <button
              onClick={() => signIn("github")}
              className="flex items-center justify-center w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <FaGithub size={20} />
              <span className="ml-2">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
