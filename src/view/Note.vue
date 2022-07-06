<script  setup>
import Auth from '../lib/auth'
import { useRouter } from 'vue-router'
import NoteSidebar from '@/components/NoteSidebar.vue';

const router = useRouter()
Auth.getInfo()
  .then((res) => {
    if (!res.isLogin)
      router.push({ path: '/login' })
  })
</script>

<template>
<NoteSidebar></NoteSidebar>


</template>

<style scoped>
h1 {
  color: yellow;
}
</style>
