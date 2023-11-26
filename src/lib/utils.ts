import { type ClassValue, clsx } from 'clsx'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import { COOKIES } from '@/app/constants/cookies'
import { PreparedToken } from '@/app/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateBase64Token(prepared: PreparedToken) {
  const json = JSON.stringify(prepared)
  const base64String = Buffer.from(json).toString('base64')
  Cookies.set(COOKIES.AUTH_TOKEN, base64String)
}

export function transformString(input: string): string {
  if (input.length <= 8) {
    return input
  }

  const firstPart = input.slice(0, 4)
  const lastPart = input.slice(-4)

  return `${firstPart}...${lastPart}`
}
