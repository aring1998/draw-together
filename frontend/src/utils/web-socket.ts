import io from 'socket.io-client'
import type { ClientInfo, Res } from '@/types'
import type { UserItem } from '@/api/user/types/user-types'

export interface DrawEvent {
  index: number
  color: string
}

export const socket = io(import.meta.env.VITE_API_BASE_URL)

interface initWsRes {
  clientInfo: ClientInfo
  boardData: string[]
}

export function initSocket(userInfo: Partial<UserItem>, func: (res: Res<initWsRes>) => void) {
  socket.on('connect', () => {
    socket.emit('init', userInfo, (res: Res<initWsRes>) => {
      func(res)
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
    console.log(data)
    func(data)
  })
}

export function getColor(index: number, func: (res: Res<string>) => void) {
  socket.emit('getColor', index, (res: Res<string>) => {
    func(res)
  })
}
