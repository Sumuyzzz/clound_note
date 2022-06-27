<script setup lang="ts">
import {ref} from 'vue'
const msg = ref('notebooks')



</script>
<template>
  <div id="notebooks">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>

h1 {
  color:green;
}
</style>