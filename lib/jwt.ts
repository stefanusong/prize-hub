import jwt, { JwtPayload } from "jsonwebtoken"

interface SignOption {
  expiresIn?: string | number
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
}

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const jwtSecret = process.env.JWT_SECRET
  const token = jwt.sign(payload, jwtSecret!, options)
  return token
}

export function verifyJwt(token: string) {
  try {
    const jwtSecret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, jwtSecret!)
    return decoded as JwtPayload
  } catch (error) {
    console.error(error)
    return null
  }
}
