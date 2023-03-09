export interface Res<T> {
  code: number
  data: T
  message: string
}

export interface PageParams {
  page: number
  pageSize: number
}

export interface PageRes<T> {
  code: number
  data: {
    records: T
    page: number
    pageSize: number
    total: number
  }
  message: string
}
export interface ClientInfo {
  username: string
  uid: string
  drawTime: number
  created: string
}
