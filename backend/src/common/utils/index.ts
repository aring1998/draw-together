/**
 * 初始化画板数据
 * @returns 纯白Hex值数组
 */
export function initBoardData(): '#ffffff'[] {
  const arr = []
  for (let i = 0; i < 24000; i++) {
    arr.push('#ffffff')
  }
  return arr
}

/**
 * 控制接收参数
 * @param data 参数
 * @param temp 参数选取范围
 * @returns 选取后的参数
 */
export function getPayload<T extends object>(data: T, temp: (keyof T)[]): T {
  const res: T = Object()
  for (const key in data) {
    if (temp.includes(key)) res[key] = data[key]
  }
  return res
}

/**
 * 校验并过滤(null, undefined, '')参数
 * @param data 参数
 * @returns 过滤后的参数
 */
export function ValidationPayload(data: { [key: string]: any } | any[]) {
  const res = data instanceof Array ? [] : {}
  for (const key in data) {
    if (data[key] ?? '' !== '') {
      res[key] = typeof data[key] === 'object' ? ValidationPayload(data[key]) : data[key]
    }
  }
  return res
}
