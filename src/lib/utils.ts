import { type ClassValue, clsx } from 'clsx'
import { setCookie } from 'cookies-next'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

import { Tokens } from '@/api/generated-api'
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

export function calculateMD5(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', function (event) {
      const data = event.target?.result
      if (!data || typeof data !== 'string') {
        return reject('No data')
      }
      const md5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data)).toString()
      resolve(md5)
    })
    reader.addEventListener('error', error => reject(error))
    reader.readAsBinaryString(file)
  })
}

export const getApprovedTokens = (tokens?: Tokens) =>
  (tokens ?? []).filter(token => !token.native)

export function formatNumber(num: number): string {
  if (num === 0) {
    return '0'
  } else if (num < 1) {
    return '<1.0'
  } else if (num < 1000) {
    return num
      .toFixed(2)
      .toString()
      .replace(/\.?0+$/, '')
  } else if (num < 1_000_000) {
    let thousands = (num / 1000).toFixed(2).replace(/\.?0+$/, '')
    if (thousands.endsWith('.')) {
      thousands = thousands.slice(0, -1)
    }
    return thousands + 'k'
  } else {
    let millions = (num / 1_000_000).toFixed(2).replace(/\.?0+$/, '')
    if (millions.endsWith('.')) {
      millions = millions.slice(0, -1)
    }
    return millions + 'm'
  }
}
