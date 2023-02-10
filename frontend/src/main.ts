import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale })

app.mount('#app')
