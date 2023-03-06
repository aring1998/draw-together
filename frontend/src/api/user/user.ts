import request from '@/request'
import type { UserItem, LoginParams, RegisterParams } from './types/user-types'

enum API {
  login = '/user/login',
  register = '/user/register',
  token = '/user/token'
}

export function userLogin(data: LoginParams) {
  return request<UserItem>({
    url: API.login,
    method: 'POST',
    data,
  })
}

export function userRegister(data: RegisterParams) {
  return request<UserItem>({
    url: API.register,
    method: 'POST',
    data,
  })
}

export function userToken() {
  return request<UserItem>({
    url: API.token,
    method: 'POST',
  })
}
