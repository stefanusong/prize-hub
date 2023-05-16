import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import { BaseResponse } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse(BaseResponse(401, null, "Unauthorized"), {
        status: 401,
      })
    }

    const resp = await prisma.$queryRaw`
    SELECT c.name, c.id 
    FROM
      users a
      JOIN workspace_users b
      ON a.id = b."userId"
      JOIN workspaces c
      ON b."workspaceId" = c.id
    WHERE a.email = ${session.user.email};
  `

    return new NextResponse(BaseResponse(200, resp, "Success"), {
      status: 200,
    })
  } catch (error) {
    console.error("error getting workspace:", error)
    return new NextResponse(BaseResponse(500, null, error), {
      status: 500,
    })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(BaseResponse(401, null, "Unauthorized"), {
        status: 401,
      })
    }

    const req = await request.json()
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    const newWorkspace = await prisma.workspace.create({
      data: {
        name: req.name,
        Author: {
          connect: {
            id: user?.id,
          },
        },
      },
    })

    const newWorkspaceUser = await prisma.workspaceUsers.create({
      data: {
        assignedBy: user?.email!,
        assignedAt: new Date(),
        User: {
          connect: {
            id: user?.id,
          },
        },
        Workspace: {
          connect: {
            id: newWorkspace.id,
          },
        },
      },
    })

    console.log(`${newWorkspace.name} inserted to db`)
    console.log(
      `user ${newWorkspaceUser.userId} assigned to workspace ${newWorkspaceUser.workspaceId}`
    )

    return new NextResponse(
      BaseResponse(
        200,
        { name: newWorkspace.name, id: newWorkspace.id },
        "Success"
      ),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error("error creating workspace:", error)
    return new NextResponse(BaseResponse(500, null, error), {
      status: 500,
    })
  }
}
