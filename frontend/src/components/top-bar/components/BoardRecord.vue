<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { boardRecordList } from '@/api/board-record/board-record'
import type { BoardRecordItem } from '@/api/board-record/types/board-record-types'
import { formatDate } from '@/utils/time'
import { useCommonStore } from '@/store/modules/common'

const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['success'])
const tableData = ref<BoardRecordItem[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 30,
  total: 0,
})
async function search() {
  const res = await boardRecordList({
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
  <el-dialog v-model="props.show" title="画板记录" width="80vw" @close="emits('success')">
    <el-table :data="tableData" height="450px" v-loading="useCommonStore().loading">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="图片" width="300">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 60px"
            :z-index="9000"
            :src="scope.row?.imgUrl"
            :preview-src-list="[scope.row?.imgUrl]"
            :preview-teleported="true"
          />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="最后修改者" width="200" :formatter="(row) => row.username ?? '(游客)'" />
      <el-table-column prop="created" label="存储时间" :formatter="(row) => formatDate(row.created)" />
    </el-table>
    <el-pagination
      v-model:currentPage="pagination.page"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, sizes"
      :total="pagination.total"
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
