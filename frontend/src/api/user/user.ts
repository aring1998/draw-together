import request from '@/request'
import type { Res } from '@/types'
import type { UserItem, LoginParams, RegisterParams } from './types/user-types'

enum API {
  login = '/user/login',
  register = '/user/register',
  token = '/user/token',
}

export function userLogin(data: LoginParams) {
  return request<Res<UserItem>>({
    url: API.login,
    method: 'POST',
    data,
  })
}

export function userRegister(data: RegisterParams) {
  return request<Res<UserItem>>({
    url: API.register,
    method: 'POST',
    data,
  })
}

export function userToken() {
  return request<Res<UserItem>>({
    url: API.token,
    method: 'POST',
  })
}
