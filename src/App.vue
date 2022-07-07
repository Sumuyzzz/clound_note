<script setup lang="ts">
import { useRouter } from 'vue-router'
import sidebar from '@/components/Sidebar.vue'
import Auth from '@/lib/auth'

const router = useRouter()

Auth.getInfo().then((res: any) => {
  if (!res.isLogin)
    router.push({ path: '/login' })
})
</script>

<template>
  <div class="layout">
    <sidebar />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';

.layout {
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>
<style lang="scss">
body {
  #app {
    height: 100vh;
  }
  overflow: hidden;
}
</style> 