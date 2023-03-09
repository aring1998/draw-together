import type { ClientInfo } from '@/types'

/**
 * 根据服务端返回设置用户信息
 */
export function setClientInfo(clientInfo: ClientInfo) {
  localStorage.setItem('clientInfo', JSON.stringify(clientInfo || '{}'))
}

/**
 * 修改用户绘画时间
 */
export function updateClientDrawTime() {
  const userInfo: ClientInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (!userInfo.uid) return
  userInfo.drawTime = new Date().getTime()
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

