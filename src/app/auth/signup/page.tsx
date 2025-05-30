"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      setError("You must agree to the terms.");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Registration failed");
      return;
    }

    // Auto login after signup
    const loginRes = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (loginRes?.ok) {
      router.push("/dashboard"); // ✅ Change to your dashboard route
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-tr from-purple-700 to-indigo-900 relative p-6 hidden md:flex flex-col justify-between">
          <div>
            <img src="/logo.svg" alt="CareerSync Logo" className="h-8 mb-6" />
            <button className="text-sm border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition">
              Back to website →
            </button>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              Capturing Moments, <br /> Creating Memories
            </h2>
            <div className="mt-4 flex gap-2">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="w-2 h-2 bg-white rounded-full opacity-50" />
              <span className="w-2 h-2 bg-white rounded-full opacity-50" />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-gray-800 p-10">
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?{" "}
            <Link href="/auth/loginForm" className="text-blue-400 hover:underline">
              Log in
            </Link>
          </p>

          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="accent-purple-500"
              />
              I agree to the{" "}
              <a href="#" className="underline text-purple-400">
                Terms & Conditions
              </a>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-md font-medium"
            >
              Create account
            </button>

            <div className="text-center text-gray-500 mt-4">Or register with</div>

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white text-black rounded-md hover:bg-gray-100"
              >
                <FcGoogle size={20} /> Google
              </button>
              <button
                type="button"
                onClick={() => signIn("github")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white text-black rounded-md hover:bg-gray-100"
              >
                <FaGithub size={20} /> GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
