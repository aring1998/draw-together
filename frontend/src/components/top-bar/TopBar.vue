<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { defineEmits, ref } from 'vue'
import Account from './components/Account.vue'

const activeMenu = '1'
const emits = defineEmits(['colorBoardShowChange'])
const props = defineProps<{ colorBoardShow: boolean }>()
const accoutShow = ref(false)
function logout() {
  localStorage.removeItem('token')
  useUserStore().token = ''
  useUserStore().userInfo = {}
  ElMessage.success('退出成功')
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
      <el-sub-menu index="rank">
        <template #title>排行</template>
        <el-menu-item>勤奋榜</el-menu-item>
      </el-sub-menu>
      <div class="flex-grow"></div>
      <el-menu-item index="account" @click="accoutShow = true" v-show="!useUserStore().token">登录/注册</el-menu-item>
      <el-sub-menu index="userInfo" v-show="useUserStore().token">
        <template #title>{{ useUserStore().userInfo.username }}</template>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-dialog v-model="accoutShow" width="30vw">
      <Account @success="accoutShow = false"></Account>
    </el-dialog>
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
