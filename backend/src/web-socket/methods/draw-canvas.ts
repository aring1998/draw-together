import { createCanvas } from 'canvas'
import * as dayjs from 'dayjs'
import { writeFileSync } from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

export function saveDrawCanvas(data: string[]) {
  const canvas = createCanvas(1000, 600)
  const ctx = canvas.getContext('2d')
  data.forEach((item, index) => {
    const x = (index % 200) * 5
    const y = Math.floor(index / 200) * 5
    ctx.fillStyle = item
    ctx.fillRect(x, y, 5, 5)
  })
  try {
    const fileName = `${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}.png`
    writeFileSync(`${process.env.CANVAS_PATH}${fileName}`, canvas.toBuffer())
    return `${process.env.IMG_URL}${fileName}`
  } catch {
    return false
  }
}
