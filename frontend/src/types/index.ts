export interface UserInfo {
  uid: string
  drawTime: number
}

export interface Res<T> {
  code: number
  data: T
  message: string
}
