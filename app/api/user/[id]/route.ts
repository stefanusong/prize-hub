import { verifyJwt } from "@/lib/jwt"
import { BaseResponse } from "@/lib/utils"

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get("authorization")
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ success: false }), {
      status: 401,
    })
  }
  return BaseResponse(JSON.stringify({ success: true }))
}
