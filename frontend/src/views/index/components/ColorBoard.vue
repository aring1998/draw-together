<script setup lang="ts">
const colorList = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#000000', '#ffffff']
const emits = defineEmits(['colorSelect'])
</script>

<template>
  <div class="color-picker-wrap">
    <div class="color-picker">
      <span>当前颜色（点击可自由选取）：</span>
      <el-color-picker v-bind="$attrs" />
    </div>
    <div class="color-list">
      <span>常用颜色选取：</span>
      <div class="item-wrap" v-for="(item, index) of colorList" :key="index" @click="emits('colorSelect', item)">
        <div class="item" :style="{ backgroundColor: item }"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color-picker-wrap {
  position: absolute;
  top: 58px;
  left: 0;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #fff;
  box-shadow: $shadow;
  padding: 5px 10px;
  border-start-end-radius: 5px;
  border-end-end-radius: 5px;
  .color-picker {
    margin-bottom: 5px;
  }
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
</style>
