<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDrawBoard, data } from './methods/draw-board'
import TopBar from '@/components/top-bar/TopBar.vue'
import ColorBoard from './components/ColorBoard.vue'

const boardRef = ref<HTMLCanvasElement>()
const maskRef = ref<HTMLCanvasElement>()
const rightMenuRef = ref()
const colorBoardShow = ref(true)

let boardMoveFunc: Function
let getColorFunc: Function
function rightMenuShowChange(flag: boolean) {
  if (!flag) boardMoveFunc()
}
function getCurrentPosColor() {
  return getColorFunc && getColorFunc()
}
onMounted(() => {
  const board = boardRef.value
  const mask = maskRef.value
  const rightMenu = rightMenuRef.value
  if (!board || !mask || !rightMenu) return
  const { boardMoveListener, getCurrentPosColor } = useDrawBoard(board, mask, rightMenu)
  boardMoveFunc = boardMoveListener
  getColorFunc = getCurrentPosColor
})
</script>

<template>
  <div class="index-pages pages">
    <top-bar :colorBoardShow="colorBoardShow" @colorBoardShowChange="(val) => (colorBoardShow = val)"></top-bar>
    <h2>一起来画画吧！</h2>
    <color-board @colorSelect="(val) => (data.color = val)" v-show="colorBoardShow"></color-board>
    <div class="board-wrap">
      <div class="canvas-wrap">
        <canvas ref="boardRef" width="1000" height="600"></canvas>
        <canvas ref="maskRef" width="1000" height="600"></canvas>
      </div>
      <div class="right-menu-wrap" :style="{ left: `${data.rightMenuPos[0]}px`, top: `${data.rightMenuPos[1]}px` }">
        <el-dropdown ref="rightMenuRef" trigger="contextmenu" v-show="true" @visibleChange="rightMenuShowChange">
          <span style="position: absolute; pointer-events: none; left: 0px; top: 0px"></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="getCurrentPosColor">复制该颜色</el-dropdown-item>
              <el-dropdown-item divided>关闭菜单</el-dropdown-item>
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
  h2 {
    height: 58px;
    line-height: 58px;
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
