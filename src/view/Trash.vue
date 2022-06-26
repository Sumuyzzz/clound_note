
<script setup lang="ts">
const msg = $ref(" trash ")

</script>
<template>
  <div id="Trash">
    <h1>{{ msg }}</h1>
    <div>User {{ $route.params.id }}</div>
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>