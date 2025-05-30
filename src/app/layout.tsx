import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import AuthSessionProvider from "./auth/AuthSessionProvider"
import Navbar from "@/components/navbar"
import ChatbotWidget from "@/components/ChatbotWidget"
import { ReactNode } from "react"
// import { NextAuthProvider } from "@/app/providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CareerSync",
  description: "Job search and career management platform",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0E0E23] text-white`}
      >
        <AuthSessionProvider>
          <Navbar />
          {children}
        </AuthSessionProvider>
        <ChatbotWidget />
      </body>
    </html>
  )
}
