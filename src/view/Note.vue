<script  setup>
import Auth from '../lib/auth'
import { useRouter, useRoute, } from 'vue-router'
import NoteSidebar from '@/components/NoteSidebar.vue';

const route = useRoute()
const router = useRouter()
Auth.getInfo()
  .then((res) => {
    if (!res.isLogin)
      router.push({ path: '/login' })
  })
</script>

<template>
  <div id="note" class="detail">
    <NoteSidebar />
    <div id="note-detail">
      <h1>notebookId : {{ route.query.notebookId }}</h1>
      <h1>noteId : {{ route.query.noteId }}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
  #note{
    display:flex;
  }
</style>
