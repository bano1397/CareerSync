'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="bg-white text-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center text-lg font-semibold text-purple-600">
          CareerSync
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-700">
          <Link href="/dashboard" className="hover:text-purple-600">Dashboard</Link>
          <Link href="/profile" className="hover:text-purple-600">Profile</Link>
          <Link href="/jobs" className="hover:text-purple-600">Jobs</Link>
          <Link href="/tracker" className="hover:text-purple-600">Tracker</Link>
          <Link href="/chatbot" className="hover:text-purple-600">Chatbot</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/auth/loginForm" className="text-gray-700 font-medium hover:text-purple-600">
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link href="/dashboard" className="block text-sm hover:text-purple-600">Dashboard</Link>
          <Link href="/profile" className="block text-sm hover:text-purple-600">Profile</Link>
          <Link href="/jobs" className="block text-sm hover:text-purple-600">Jobs</Link>
          <Link href="/tracker" className="block text-sm hover:text-purple-600">Tracker</Link>
          <Link href="/chatbot" className="block text-sm hover:text-purple-600">Chatbot</Link>
          <hr className="my-2" />
          <Link href="/auth/loginForm" className="block text-sm hover:text-purple-600">Sign in</Link>
          <Link
            href="/auth/signup"
            className="block w-full text-center bg-purple-600 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  )
}
