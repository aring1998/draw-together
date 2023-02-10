import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { throttle } from '@/utils/throttle'
import { drawEvent, initSocket, handleDraw, type DrawEvent, getColor } from '@/utils/web-socket'
import { getIndexByPos, getPosByIndex } from '@/utils'
import { ElMessage, type ElDropdownInjectionContext } from 'element-plus'

export const data = ref({
  color: '#000000',
  rightMenuShow: false,
  rightMenuPos: [-5, -5],
})
export function useDrawBoard(board: HTMLCanvasElement, mask: HTMLCanvasElement, rightMenu: any) {
  const boardCtx = board.getContext('2d')
  const maskCtx = mask.getContext('2d')
  if (!boardCtx || !maskCtx) throw new Error('[DrawBoard Error] Fail to get context.')
  let oldPos = [-5, -5]

  const claerOldPosDiv = function () {
    maskCtx.clearRect(oldPos[0], oldPos[1], 5, 5)
  }

  // x轴200格，y轴120格，200 * 120 = 24000
  const initDrawBoard = function (data: string[]) {
    data.forEach((item, index) => {
      const x = (index % 200) * 5
      const y = Math.floor(index / 200) * 5
      boardCtx.fillStyle = item
      boardCtx.fillRect(x, y, 5, 5)
    })
  }

  const boardMoveListener = function () {
    mask.onmousemove = (e: MouseEvent) => {
      return throttle(() => {
        maskCtx.fillStyle = data.value.color
        const x = e.offsetX - (e.offsetX % 5)
        const y = e.offsetY - (e.offsetY % 5)
        maskCtx.fillRect(x, y, 5, 5)
        if (oldPos[0] < 0) oldPos = [x, y]
        if (e.offsetX >= oldPos[0] + 5 || e.offsetX <= oldPos[0] || e.offsetY >= oldPos[1] + 5 || e.offsetY <= oldPos[1]) {
          claerOldPosDiv()
          oldPos = [x, y]
        }
      }, 20)
    }
    mask.onmouseout = (e: MouseEvent) => {
      if (e.offsetX > 0 && e.offsetX < 1000 && e.offsetY > 0 && e.offsetY < 600) return
      rightMenu.handleClose()
      claerOldPosDiv()
    }
  }

  const boardDrawListener = function (data: DrawEvent) {
    const { index, color } = data
    const { x, y } = getPosByIndex(index)
    boardCtx.fillStyle = color
    boardCtx.fillRect(x, y, 5, 5)
  }

  const boardClickListener = function () {
    mask.oncontextmenu = () => false
    mask.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        data.value.rightMenuPos = [e.offsetX, e.offsetY]
        rightMenu.handleOpen()
        mask.onmousemove = null
        return
      }
      return throttle(() => {
        const { color } = data.value
        claerOldPosDiv()
        boardCtx.fillStyle = color
        const x = e.offsetX - (e.offsetX % 5)
        const y = e.offsetY - (e.offsetY % 5)
        const index = getIndexByPos(x, y)
        handleDraw(index, color, (res) => {
          if (res.code !== 0) {
            ElMessage.error('绘画间隔中')
          }
        })
        board.onmousemove = null
        oldPos = [-5, -5]
        setTimeout(() => {
          boardMoveListener()
        }, 500)
      })
    })
  }

  const getCurrentPosColor = function () {
    let [x, y] = data.value.rightMenuPos
    x -= x % 5
    y -= y % 5
    console.log(x, y)
    const index = getIndexByPos(x, y)
    getColor(index, res => {
      data.value.color = res.data
      ElMessage.success('复制颜色成功')
    })
  }

  let uid = localStorage.getItem('client-uid')
  if (!uid) {
    const uidv4 = uuidv4()
    localStorage.setItem('client-uid', uidv4)
    uid = uidv4
  }
  initSocket(uid, (res) => {
    initDrawBoard(res.data)
  })
  drawEvent((data) => boardDrawListener(data))
  boardMoveListener()
  boardClickListener()

  return {
    boardMoveListener,
    getCurrentPosColor,
  }
}
