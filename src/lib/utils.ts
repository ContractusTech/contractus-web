import { type ClassValue, clsx } from 'clsx'
import { setCookie } from 'cookies-next'
import dayjs from 'dayjs'
// import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import { COOKIES } from '@/app/constants/cookies'
import { PreparedToken } from '@/app/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateBase64Token(prepared: PreparedToken) {
  const json = JSON.stringify(prepared)
  const base64String = Buffer.from(json).toString('base64')
  setCookie(COOKIES.AUTH_TOKEN, base64String)
}

export function transformString(input: string): string {
  if (input.length <= 8) {
    return input
  }

  const firstPart = input.slice(0, 4)
  const lastPart = input.slice(-4)

  const bothPart = `${firstPart}...${lastPart}`
  return bothPart
}

export function getTimeUnitFromNow(targetDate: string) {
  const currentDate = dayjs()
  const targetDateParsed = dayjs(targetDate)

  const duration = dayjs.duration(targetDateParsed.diff(currentDate))

  const minutes = Math.abs(duration.minutes())
  const hours = Math.abs(duration.hours())
  const days = Math.abs(duration.days())

  if (days > 0) {
    return `${days}d`
  }

  if (hours > 0) {
    return `${hours}h`
  }

  if (minutes > 0) {
    return `${minutes}m`
  }

  return '0s'
}
