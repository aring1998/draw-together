export function initBoardData() {
  const arr: string[] = []
  for (let i = 0; i < 24000; i++) {
    arr.push('#ffffff')
  }
  return arr
}

export const getPayload = <T extends object>(data: T, temp: (keyof T)[]): T => {
  const res: T = Object()
  for (let key in data) {
    if (temp.includes(key) && (data[key] ?? '') !== '') res[key] = data[key]
  }
  return res
}
