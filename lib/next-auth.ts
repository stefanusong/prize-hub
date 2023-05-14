import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        })

        if (existingUser) {
          console.log(`${user.email!} signed in`)
          return true
        }

        const createdUser = await prisma.user.create({
          data: {
            name: user.name!,
            email: user.email!,
          },
        })
        console.log(`${createdUser.email} inserted to db`)
        return true
      } catch (error) {
        console.error(`failed to sign in: ${error}`)
        return false
      }
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
}
