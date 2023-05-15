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
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        })

        if (existingUser) {
          console.log(`${user.email!} signed in`)
          return true
        }

        // Only for new users
        // Insert user, workspace, and assign to workspace user
        await prisma.$transaction(async (prisma) => {
          const newUser = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
            },
          })

          const newWorkspace = await prisma.workspace.create({
            data: {
              name: `${user.name!.split(" ")[0]}'s Workspace`,
              Author: {
                connect: {
                  id: newUser.id,
                },
              },
            },
          })

          const newWorkspaceUser = await prisma.workspaceUsers.create({
            data: {
              assignedBy: user.email!,
              assignedAt: new Date(),
              User: {
                connect: {
                  id: newUser.id,
                },
              },
              Workspace: {
                connect: {
                  id: newWorkspace.id,
                },
              },
            },
          })

          console.log(`${newUser.email} inserted to db`)
          console.log(`${newWorkspace.name} inserted to db`)
          console.log(
            `user ${newWorkspaceUser.userId} assigned to workspace ${newWorkspaceUser.workspaceId}`
          )
        })

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
