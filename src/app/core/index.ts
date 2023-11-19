import { BRAND_NAME } from '../constants'

export const pageTitle = (title?: string) => {
  return [title, BRAND_NAME].filter(Boolean).join(' | ')
}
