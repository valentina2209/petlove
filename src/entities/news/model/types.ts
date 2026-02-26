export interface News {
  _id: string
  imgUrl: string
  title: string
  text: string
  date: string
  url: string
}

export interface NewsResponse {
  page: number
  perPage: number
  totalPages: number
  results: News[]
}

export interface GetNewsParams {
  page: number
  search: string
}