import { readFileSync, writeFileSync } from 'fs'
import * as dotenv from 'dotenv'
import { getCurrentTime } from 'src/common/utils/time'
dotenv.config()

export function saveBoardData(boardData: string[]): Error | undefined {
  try {
    writeFileSync(process.env.BACKUP_PATH, JSON.stringify(boardData))
    console.log(`${getCurrentTime()} 备份创建成功`)
  } catch (err) {
    console.error(err)
    return err
  }
}

export function getBoardData() {
  try {
    const data = readFileSync(process.env.BACKUP_PATH)
    return JSON.parse(data.toString()) as string[]
  } catch {
    return undefined
  }
}
