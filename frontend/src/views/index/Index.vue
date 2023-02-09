<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { throttle } from '@/utils/throttle'
import { socket, initSocket, handleDraw, drawEvent } from '@/utils/web-socket'
import { v4 as uuidv4 } from 'uuid'

const boardRef = ref<HTMLCanvasElement>()
const maskRef = ref<HTMLCanvasElement>()
const boardContextRef = ref<CanvasRenderingContext2D | null>(null)
const maskContextRef = ref<CanvasRenderingContext2D | null>(null)
const rightMenuButtonRef = ref<HTMLElement>()
const color = ref('#000000')
const colorList = ref(['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#000000', '#ffffff'])
let oldPos = [-5, -5]
function boardMoveListener() {
  if (!maskRef.value) return
  maskRef.value.onmousemove = (e: MouseEvent) =>
    throttle(() => {
      const maskContext = maskContextRef.value
      if (!maskContext) return
      maskContext.fillStyle = color.value
      const x = e.offsetX - (e.offsetX % 5)
      const y = e.offsetY - (e.offsetY % 5)
      maskContext.fillRect(x, y, 5, 5)
      if (oldPos[0] < 0) oldPos = [x, y]
      if (e.offsetX >= oldPos[0] + 5 || e.offsetX <= oldPos[0] || e.offsetY >= oldPos[1] + 5 || e.offsetY <= oldPos[1]) {
        maskContext.clearRect(oldPos[0], oldPos[1], 5, 5)
        oldPos = [x, y]
      }
    }, 20)
}

// x轴200格，y轴120格，200 * 120 = 24000
function initDrawBoard(data: string[]) {
  data.forEach((item, index) => {
    const x = (index % 200) * 5
    const y = Math.floor(index / 200) * 5
    boardContextRef.value!.fillStyle = item
    boardContextRef.value!.fillRect(x, y, 5, 5)
  })
}
function setDrawBoard(color: string, x: number, y: number) {
  if (!boardContextRef.value) return
  boardContextRef.value.fillStyle = color
  boardContextRef.value.fillRect(x, y, 5, 5)
}
const rightMenuShow = ref(true)
const rightMenuRef = ref()
const rightMenuPos = ref([0, 0])
function rightClick(e: MouseEvent) {
  rightMenuPos.value = [e.offsetX, e.offsetY]
  rightMenuRef.value.handleOpen()
}
function rightMenuShowChange(flag: boolean) {
  rightMenuShow.value = flag
  // if (!flag) boardMoveListener()
}
onMounted(() => {
  initSocket(uuidv4(), (res) => {
    initDrawBoard(res.data)
  })

  const boardEl = boardRef.value
  const maskEl = maskRef.value
  boardContextRef.value = boardEl?.getContext('2d') || null
  maskContextRef.value = maskEl?.getContext('2d') || null
  const boardContext = boardContextRef.value
  const maskContext = maskContextRef.value
  if (!maskEl || !rightMenuButtonRef) return
  maskEl.oncontextmenu = () => false
  rightMenuButtonRef.value!.oncontextmenu = () => false
  if (!boardContext || !maskContext || !boardEl) return
  maskEl.addEventListener('mousedown', (e) => {
    // if (e.button === 2) {
    //   rightClick(e)
    //   boardEl.onmousemove = null
    //   return
    // }
    return throttle(() => {
      maskContext.clearRect(oldPos[0], oldPos[1], 5, 5)
      boardContext.fillStyle = color.value
      const x = e.offsetX - (e.offsetX % 5)
      const y = e.offsetY - (e.offsetY % 5)
      const index = x / 5 + (y / 5) * 200
      console.log(x, y, index)
      handleDraw(index, color.value, (res) => {
        console.log(123)
        if (res.code === 0) console.log('绘制成功')
      })
      boardEl.onmousemove = null
      oldPos = [-5, -5]
      setTimeout(() => {
        boardMoveListener()
      }, 500)
    })
  })
  drawEvent((data) => {
    const boardContext = boardContextRef.value
    if (!boardContext) return
    console.log(data)
    const { index, color } = data
    const x = (index % 200) * 5
    const y = Math.floor(index / 200) * 5
    boardContext.fillStyle = color
    boardContext.fillRect(x, y, 5, 5)
    console.log(x, y)
  })
  boardMoveListener()
})
</script>

<template>
  <div class="index-pages">
    <h2>一起来画画吧！</h2>
    <div class="color-picker-wrap">
      <p>
        <span>当前颜色（点击可自由选取）：</span>
        <el-color-picker v-model="color" />
      </p>
      <div class="color-list">
        <span>常用颜色选取：</span>
        <div class="item-wrap" v-for="(item, index) of colorList" :key="index" @click="color = item">
          <div class="item" :style="{ backgroundColor: item }"></div>
        </div>
      </div>
    </div>
    <div class="board-wrap">
      <canvas ref="boardRef" width="1000" height="600"></canvas>
      <canvas ref="maskRef" width="1000" height="600"></canvas>

      <div class="right-menu-wrap" :style="{ left: `${rightMenuPos[0]}px`, top: `${rightMenuPos[1]}px` }">
        <el-dropdown ref="rightMenuRef" v-show="rightMenuShow" @visibleChange="rightMenuShowChange">
          <button ref="rightMenuButtonRef" style="position: absolute; width: 150px; opacity: 0; left: -70px; top: -20px">右键菜单</button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>复制该颜色</el-dropdown-item>
              <el-dropdown-item divided @click="rightMenuShow = false">关闭菜单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index-pages {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .color-picker-wrap {
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    align-items: center;
    .color-list {
      display: flex;
      margin-bottom: 10px;
      justify-content: center;
      align-items: center;
      .item-wrap {
        padding: 4px;
        border: 1px #dcdfe6 solid;
        border-radius: 2px;
        background-color: #e8eaed;
        cursor: pointer;
        margin-right: 4px;
        &:hover {
          border: 1px #bbb solid;
        }
        .item {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
  .board-wrap {
    position: relative;
    width: 1000px;

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      border: 2px #111 solid;
    }
  }
  .right-menu-wrap {
    position: absolute;
  }
}
</style>
