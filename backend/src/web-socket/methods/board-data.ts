import { readFileSync, writeFileSync } from 'fs'
import * as dotenv from 'dotenv'
import { getCurrentTime } from 'src/common/utils/time'
import { Logger } from '@nestjs/common'
dotenv.config()

export function saveBoardData(boardData: string[]): Error | undefined {
  try {
    writeFileSync(process.env.BACKUP_PATH, JSON.stringify(boardData))
    Logger.verbose(`${getCurrentTime()} 备份画板数据成功`)
  } catch (err) {
    Logger.error(`备份画板数据失败，${err}`)
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
