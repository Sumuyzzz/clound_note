
<script setup lang="ts">
const msg = $ref(" login ")

</script>
<template>
  <div id="login">
    <h1>{{ msg }}</h1>
    <div>User {{ $route.params.id }}</div>
  </div>
</template>

<style scoped>


h1 {
  color: red;
}

</style>