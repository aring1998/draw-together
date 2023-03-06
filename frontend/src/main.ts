import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/styles/index.scss'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale })
app.use(createPinia())

app.mount('#app')
