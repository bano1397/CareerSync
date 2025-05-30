// import NextAuth from "next-auth"
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"

// const handler = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     }),
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/auth/loginForm',
//   },
// })

// export { handler as GET, handler as POST }

// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth"

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }

