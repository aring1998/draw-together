import { v4 as uuidv4 } from 'uuid'
import type { UserInfo } from '@/types'

/**
 * 自动生成用户信息
 */
export function createUserInfo() {
  let userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (userInfo.uid) return userInfo

  const res: UserInfo = {
    uid: uuidv4(),
    drawTime: 0,
  }
  localStorage.setItem('userInfo', JSON.stringify(res))
  return res
}

/**
 * 修改用户绘画时间
 */

export function updateUserDrawTime() {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (!userInfo.uid) return
  userInfo.drawTime = new Date().getTime()
  console.log(userInfo)
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}
