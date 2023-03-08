export interface UserInfo {
  uid: string
  drawTime: number
}

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
    records: T,
    page: number,
    pageSize: number,
    total: number
  }
  message: string
}