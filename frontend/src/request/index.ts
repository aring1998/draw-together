import { useCommonStore } from '@/store/modules/common'
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}api`,
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status <= 600,
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    useCommonStore().loading = true
    config.headers.token = localStorage.getItem('token') || ''
    return config
  },
  (err: AxiosError) => {
    console.log(err)
  },
)
// 响应拦截
instance.interceptors.response.use(
  (res) => {
    useCommonStore().loading = false
    if (res.status >= 300) {
      ElMessage.error(`网络请求错误，错误：${res.data.message}，ErrorCode：${res.data.statusCode}`)
      throw new Error(res.statusText)
    }
    if (res.data.code !== 200) {
      ElMessage.error(res.data.message || '网络请求错误')
      throw new Error(res.data.message)
    } else {
      if (res.data.message) ElMessage.success(res.data.message)
    }
    return res
  },
  (err: AxiosError) => {
    console.error(err)
  },
)
export default function request<T>(config: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    instance
      .request<T>(config)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
