<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDrawBoard, clientData } from './methods/draw-board'
import TopBar from '@/components/top-bar/TopBar.vue'
import ColorBoard from './components/ColorBoard.vue'
import OnlineClients from './components/OnlineClients.vue'
import { useCommonStore } from '@/store/modules/common'

const boardRef = ref<HTMLCanvasElement>()
const maskRef = ref<HTMLCanvasElement>()
const rightMenuRef = ref()
const colorBoardShow = ref(true)
const onlineClientsShow = ref(false)

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
    <p class="intro">
      您每次仅仅可绘制一个像素块，全画板共24000个像素块，请随心所欲的在画板上与他人进行共同创作（或者捣蛋）。
      <a @click="onlineClientsShow = true">当前在线人数：{{ clientData.clients.length || 0 }}</a>
      <OnlineClients :show="onlineClientsShow" :clients="clientData.clients" @close="onlineClientsShow = false"></OnlineClients>
    </p>
    <color-board @colorSelect="(val) => (clientData.color = val)" v-model="clientData.color" v-show="colorBoardShow"></color-board>
    <div class="board-wrap" v-loading="useCommonStore().loading">
      <div class="canvas-wrap">
        <canvas ref="boardRef" width="1000" height="600"></canvas>
        <canvas ref="maskRef" width="1000" height="600"></canvas>
      </div>
      <div class="right-menu-wrap" :style="{ left: `${clientData.rightMenuPos[0]}px`, top: `${clientData.rightMenuPos[1]}px` }">
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
    margin: 10px 0;
  }
  .intro {
    font-size: 14px;
    color: #999;
    // margin: 2px;
  }
  .board-wrap {
    position: relative;
    width: 1000px;
    height: 600px;

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
