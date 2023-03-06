import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      loading: false,
      accountShow: false
    }
  }
})
