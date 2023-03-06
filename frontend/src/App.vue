<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { userToken } from './api/user/user'
import { useUserStore } from './store/modules/user'

onMounted(() => {
  if (!localStorage.getItem('token')) return
  userToken()
    .then((res) => {
      useUserStore().userInfo = res.data
    })
    .catch(() => {
      localStorage.removeItem('token')
    })
})
</script>

<template>
  <RouterView />
</template>
