import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import { BaseResponse } from "@/lib/utils"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(BaseResponse(401, null, "Unauthorized"), {
      status: 401,
    })
  }

  //   const workspaces = [
  //     {
  //       label: "Workspace Satu",
  //       value: "workspace-satu",
  //     },
  //     {
  //       label: "Workspace Dua",
  //       value: "workspace-dua",
  //     },
  //   ]

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  const workspaces = await prisma.workspaceUsers.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      Workspace: true,
    },
  })

  const resp = workspaces.map((x) => {
    return { name: x.Workspace.name, id: x.Workspace.id }
  })

  return new NextResponse(BaseResponse(200, resp, "Success"), {
    status: 200,
  })
}
