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
