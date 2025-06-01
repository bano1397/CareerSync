"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import contactAnimation from "@/components/contactAnimation.json";
import successAnimation from "@/components/successAnimation.json";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0E0E23] text-white px-6 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-12">
        {/* Left Side: Animation and Intro */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center">
          <Lottie animationData={contactAnimation} className="w-64 h-64 mb-6" loop autoplay />
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-gray-400">
            Have questions, suggestions, or just want to say hello? Fill out the form — we’d love to hear from you!
          </p>
        </div>

        {/* Right Side: Form or Confirmation */}
        <div className="w-full lg:w-1/2 bg-[#12172A] p-8 rounded-lg shadow-lg">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#1E253C] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#1E253C] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#1E253C] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-md font-medium"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-400">
                Your message has been sent successfully!
              </h2>
              <div className="mt-6 w-full flex justify-center">
                <Lottie
                  animationData={successAnimation}
                  className="w-48 h-48"
                  loop={false}
                  autoplay
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
