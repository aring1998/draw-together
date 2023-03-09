import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/styles/index.scss'
import { createPinia } from 'pinia'
import { userToken } from './api/user/user'
import { useUserStore } from './store/modules/user'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale })
app.use(createPinia())
;(async () => {
  try {
    if (localStorage.getItem('token')) {
      const res = await userToken()
      const { data } = res
      localStorage.setItem('token', data.token)
      useUserStore().token = data.token
      useUserStore().userInfo = data
    }
  } catch {
    localStorage.removeItem('token')
  } finally {
    app.mount('#app')
  }
})()
