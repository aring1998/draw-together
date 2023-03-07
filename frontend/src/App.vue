<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { userToken } from './api/user/user'
import { useUserStore } from './store/modules/user'
import { updateUserUid } from './views/index/methods/user-info';

onMounted(() => {
  if (!localStorage.getItem('token')) return
  userToken()
    .then((res) => {
      const { data } = res
      useUserStore().userInfo = data
      updateUserUid(data.uid)
    })
    .catch(() => {
      localStorage.removeItem('token')
    })
})
</script>

<template>
  <RouterView />
</template>
