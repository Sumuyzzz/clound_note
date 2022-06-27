<script setup lang="ts">
import sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="layout">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>

</template>

<style scoped>
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';


.layout {
  display: flex;
  height: 100vh;
}


</style>
