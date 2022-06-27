
<script setup lang="ts">
import {ref} from 'vue'
const msg = ref(" note ")

</script>
<template>
  <div id="note">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  color: yellow;
}
</style>