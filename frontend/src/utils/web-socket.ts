import io from 'socket.io-client'
import type { ClientInfo, Res } from '@/types'
import type { UserItem } from '@/api/user/types/user-types'
import { ElLoading } from 'element-plus'

export interface DrawEvent {
  index: number
  color: string
}

export const socket = io(import.meta.env.VITE_WS_BASE_URL, {
  path: import.meta.env.VITE_WS_BASE_PATH,
})

interface initWsRes {
  clientInfo: ClientInfo
  boardData: string[]
}

export function initSocket(userInfo: Partial<UserItem>, func: (res: Res<initWsRes>) => void) {
  let loading: any
  const timer = setTimeout(() => {
    loading = ElLoading.service({
      lock: true,
      text: '加载画板中，如长时间未响应，请尝试刷新页面',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }, 200)
  socket.on('connect', () => {
    socket.emit('init', userInfo, (res: Res<initWsRes>) => {
      func(res)
      clearTimeout(timer)
      loading?.close()
    })
  })
}

export function handleDraw(data: { uid: string; index: number; color: string }, func: (res: Res<any>) => void) {
  socket.emit('draw', data, (res: Res<any>) => {
    func(res)
  })
}

export function drawEvent(func: (data: DrawEvent) => void) {
  socket.on('draw', (data: DrawEvent) => {
    func(data)
  })
}

export function clientsEvent(func: (data: ClientInfo[]) => void) {
  socket.on('clients', (data: ClientInfo[]) => {
    func(data)
  })
}

export function onUserLogin(data: UserItem & { oldUid: string }, func: (data: ClientInfo) => void) {
  socket.emit('login', data, (res: ClientInfo) => {
    func(res)
  })
}

export function getColor(index: number, func: (res: Res<string>) => void) {
  socket.emit('getColor', index, (res: Res<string>) => {
    func(res)
  })
}
