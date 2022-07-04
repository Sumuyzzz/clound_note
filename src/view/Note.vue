<script  setup>
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

</template>

<style scoped>
h1 {
  color: yellow;
}
</style>
