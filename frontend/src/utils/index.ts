/**
 * 根据坐标获取数组下标
 * @param {Number} index 数组下标
 */
export function getPosByIndex(index: number) {
  return {
    x: (index % 200) * 5,
    y: Math.floor(index / 200) * 5,
  }
}

/**
 * 根据数组下标获取坐标
 * @param {Number} x x轴坐标
 * @param {Number} y y轴坐标
 */
export function getIndexByPos(x: number, y: number) {
  return x / 5 + (y / 5) * 200
}

/**
 * base64转文件流
 * @param {string} code base64编码
 */
export function base64ToBlob(code: string) {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}
