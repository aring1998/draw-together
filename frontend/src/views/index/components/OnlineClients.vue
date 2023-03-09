<script setup lang="ts">
import type { ClientInfo } from '@/types'
import { formatDate } from '@/utils/time'

const props = defineProps<{ show: boolean; clients: ClientInfo[] }>()
const emits = defineEmits(['close'])
</script>

<template>
  <el-drawer v-model="props.show" title="当前在线用户" direction="rtl" @close="emits('close')">
    <el-table :data="props.clients" height="500px">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户" :formatter="(row) => row.username ?? '(游客)'" />
      <el-table-column prop="created" label="加入时间" :formatter="(row) => formatDate(row.created)" />
    </el-table>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
