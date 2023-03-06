export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams extends LoginParams {
  email?: string
}

export interface UserItem {
  id: number
  username: string
  token: string
  email: string
  uid: string
  auth: number
}
