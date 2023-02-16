import io from 'socket.io-client'
import type { Res, UserInfo } from '@/types'

export interface DrawEvent {
  index: number
  color: string
}

export const socket = io(import.meta.env.VITE_API_BASE_URL)

export function initSocket(userInfo: UserInfo, func: (res: Res<string[]>) => void) {
  socket.on('connect', () => {
    socket.emit('init', userInfo, (res: Res<string[]>) => {
      func(res)
    })
  })
}

export function handleDraw(index: number, color: string, func: (res: Res<any>) => void) {
  socket.emit('draw', { index, color }, (res: Res<any>) => {
    func(res)
  })
}

export function drawEvent(func: (data: DrawEvent) => void) {
  socket.on('draw', (data: DrawEvent) => {
    func(data)
  })
}

export function getColor(index: number, func: (res: Res<string>) => void) {
  socket.emit('getColor', index, (res: Res<string>) => {
    func(res)
  })
}
