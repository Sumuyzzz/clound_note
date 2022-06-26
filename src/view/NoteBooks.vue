<script setup lang="ts">
const msg = $ref('notebooks')



</script>
<template>
  <div id="notebooks">
    <h1>{{ msg }}</h1>
    <div>User {{ $route.params.id }}</div>
  </div>
</template>

<style scoped>

h1 {
  color:green;
}
</style>