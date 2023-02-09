import io from 'socket.io-client'

interface Res {
  code: number
  data: any
  message: string
}
interface DrawEvent {
  index: number
  color: string
}

export const socket = io('http://124.221.181.20:3525')

export function initSocket(uid: string, func: (res: Res) => void) {
  socket.on('connect', () => {
    socket.emit('init', { uid }, (res: Res) => {
      func(res)
    })
  })
}

export function handleDraw(index: number, color: string, func: (res: Res) => void) {
  socket.emit('draw', { index, color }, (res: Res) => {
    func(res)
  })
}

export function drawEvent(func: (data: DrawEvent) => void) {
  socket.on('draw', (data: DrawEvent) => {
    func(data)
  })
}