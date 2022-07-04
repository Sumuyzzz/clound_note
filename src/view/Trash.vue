<script setup >
import Auth from '../lib/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
Auth.getInfo()
  .then((res) => {
    if (!res.isLogin)
      router.push({ path: '/login' })
  })
</script>

<template>
  <div id="Trash">
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>
