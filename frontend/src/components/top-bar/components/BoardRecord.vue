<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { boardRecordList } from '@/api/board-record/board-record'
import type { BoardRecordItem } from '@/api/board-record/types/board-record-types'

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
    <el-table :data="tableData" height="500px">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column label="图片" width="300">
        <template #default="scope">
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <el-image style="width: 100px; height: 100px" :src="scope.row?.imgUrl" />
            </template>
            <img :src="scope.row?.imgUrl" width="200" height="200" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="最后修改用户名" width="200" />
      <el-table-column prop="created" label="存储时间" />
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
