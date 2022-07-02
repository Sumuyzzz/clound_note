<script setup lang="ts">
import { ref } from 'vue'
const msg = ref(' trash ')
</script>

<template>
  <div id="Trash">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>
