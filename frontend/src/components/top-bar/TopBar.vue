<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import Account from './components/Account.vue'
import BoardRecord from './components/BoardRecord.vue'
import Rank from './components/rank/Rank.vue'

const activeMenu = '1'
const emits = defineEmits(['colorBoardShowChange'])
const props = defineProps<{ colorBoardShow: boolean }>()
const accoutShow = ref(false)
const boardRecordShow = ref(false)
const rankShow = ref(false)
function logout() {
  localStorage.removeItem('token')
  useUserStore().userInfo = {}
  ElMessage.success('退出成功')
  setTimeout(() => {
    location.reload()
  }, 500)
}
function seeCode() {
  window.open('https://gitee.com/aring1998/draw-together/')
}
</script>

<template>
  <div class="top-bar">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="false"
      @select="activeMenu = ''"
    >
      <el-menu-item index="showColorBoard" v-show="!props.colorBoardShow" @click="emits('colorBoardShowChange', true)">显示调色板</el-menu-item>
      <el-menu-item index="hideColorBoard" v-show="props.colorBoardShow" @click="emits('colorBoardShowChange', false)">隐藏调色板</el-menu-item>
      <el-menu-item index="boardRecord" @click="boardRecordShow = true">画板记录</el-menu-item>
      <el-sub-menu index="rank">
        <template #title>排行</template>
        <el-menu-item @click="rankShow = true">勤奋榜</el-menu-item>
      </el-sub-menu>
      <div class="flex-grow"></div>
      <el-menu-item index="code" @click="seeCode">访问项目源码</el-menu-item>
      <el-menu-item index="account" @click="accoutShow = true" v-show="!useUserStore().userInfo.token">登录/注册</el-menu-item>
      <el-sub-menu index="userInfo" v-show="useUserStore().userInfo.token">
        <template #title>{{ useUserStore().userInfo.username }}</template>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-dialog v-model="accoutShow" width="30vw">
      <Account @success="accoutShow = false"></Account>
    </el-dialog>
    <BoardRecord @close="boardRecordShow = false" :show="boardRecordShow"></BoardRecord>
    <Rank @close="rankShow = false" :show="rankShow"></Rank>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  .flex-grow {
    flex-grow: 1;
  }
}
</style>
