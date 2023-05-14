import * as bcrypt from "bcrypt"

import { signJwtAccessToken } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import { BaseResponse } from "@/lib/utils"

interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user
    const accessToken = signJwtAccessToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      accessToken,
    }
    return BaseResponse(result)
  }
  return BaseResponse(null)
}
