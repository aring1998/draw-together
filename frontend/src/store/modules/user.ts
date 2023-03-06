import { defineStore } from 'pinia'
import type { UserItem } from '@/api/user/types/user-types'

export const useUserStore = defineStore('user', {
  state: (): {
    token: string
    userInfo: Partial<UserItem>
  } => {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: {},
    }
  },
})
