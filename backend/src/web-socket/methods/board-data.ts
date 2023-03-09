import { writeFile, readFileSync } from 'fs'
import * as dotenv from 'dotenv'
import { getCurrentTime } from 'src/common/utils/time'
dotenv.config()

export function saveBoardData(boardData: string[]) {
  writeFile(process.env.BACKUP_PATH, JSON.stringify(boardData), err => {
    if (err) return console.error(err)
    console.log(`${getCurrentTime()} 备份创建成功`)
  })
}

export function getBoardData() {
  try {
    const data = readFileSync(process.env.BACKUP_PATH)
    return JSON.parse(data.toString())
  } catch {
    return undefined
  }
}
