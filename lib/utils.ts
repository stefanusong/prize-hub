import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function BaseResponse(status: number, data: any, message: string) {
  return JSON.stringify({
    status,
    data,
    message,
  })
}
