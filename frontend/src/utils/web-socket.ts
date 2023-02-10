import io from 'socket.io-client'

interface Res<T> {
  code: number
  data: T
  message: string
}
export interface DrawEvent {
  index: number
  color: string
}

export const socket = io(import.meta.env.VITE_API_BASE_URL)

export function initSocket(uid: string, func: (res: Res<string[]>) => void) {
  socket.on('connect', () => {
    socket.emit('init', { uid }, (res: Res<string[]>) => {
      func(res)
    })
  })
}

export function handleDraw(index: number, color: string) {
  socket.emit('draw', { index, color })
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
