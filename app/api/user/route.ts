import * as bcrypt from "bcrypt"

import prisma from "@/lib/prisma"
import { BaseResponse } from "@/lib/utils"

interface RequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()

  function formatName(name: string) {
    const words = name.split(" ")
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    const formattedName = formattedWords.join(" ")
    return formattedName
  }

  const user = await prisma.user.create({
    data: {
      name: formatName(body.name),
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  })

  const { password, ...userWithoutPass } = user

  return BaseResponse(userWithoutPass)
}
