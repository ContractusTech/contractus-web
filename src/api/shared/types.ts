export type Media = {
  id: number
  url: string
  type: string
  name: string
}

export type PaginationMeta = {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export type Coordinates = {
  lat: number
  lng: number
}
