import { defineStore } from 'pinia'
import { useCommonStore } from './modules/common'
import { useUserStore } from './modules/user'
const useStore = () => {
  return {
    user: useUserStore,
    common: useCommonStore,
  }
}
export default useStore
