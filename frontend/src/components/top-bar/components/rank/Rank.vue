<script setup lang="ts">
import { useCommonStore } from '@/store/modules/common'
import { formatDate } from '@/utils/time'
import { ref, reactive, watch } from 'vue'
import { findDiligentUser } from '@/api/draw-record/draw-record'
import type { DrawRecordItem } from '@/api/draw-record/types/draw-record-types'

const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['close'])
const tableData = ref<DrawRecordItem[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 30,
  total: 0,
})
async function search() {
  const res = await findDiligentUser({
    ...pagination,
  })
  tableData.value = res.data.records
}
watch(
  props,
  (val) => {
    if (!val.show) return
    search()
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <el-dialog v-model="props.show" title="绘画勤奋榜" width="80vw" @close="emits('close')">
    <el-table :data="tableData" height="450px" v-loading="useCommonStore().loading">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="200" :formatter="(row) => row.username ?? '(游客)'" />
      <el-table-column prop="count" label="绘画次数" width="200" />
      <el-table-column prop="lastEditDate" label="最后绘画时间" :formatter="(row) => formatDate(row.created)" />
    </el-table>
    <el-pagination
      v-model:currentPage="pagination.page"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, sizes"
      :total="pagination.total"
      :page-sizes="[10, 30, 50]"
      @size-change="
        (size) => {
          pagination.pageSize = size
          search()
        }
      "
      @current-change="
        (page) => {
          pagination.page = page
          search()
        }
      "
    ></el-pagination>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
