<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDrawBoard, data } from './methods/draw-board'

const boardRef = ref<HTMLCanvasElement>()
const maskRef = ref<HTMLCanvasElement>()
const rightMenuRef = ref()
const colorList = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#000000', '#ffffff']

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
    <h2>一起来画画吧！</h2>
    <div class="color-picker-wrap">
      <p>
        <span>当前颜色（点击可自由选取）：</span>
        <el-color-picker v-model="data.color" />
      </p>
      <div class="color-list">
        <span>常用颜色选取：</span>
        <div class="item-wrap" v-for="(item, index) of colorList" :key="index" @click="data.color = item">
          <div class="item" :style="{ backgroundColor: item }"></div>
        </div>
      </div>
    </div>
    <div class="board-wrap">
      <canvas ref="boardRef" width="1000" height="600"></canvas>
      <canvas ref="maskRef" width="1000" height="600"></canvas>

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
