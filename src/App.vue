<script setup lang="ts">
</script>

<template>
  <ul class="nav">
    <li>
      <router-link to="/notebooks">NoteBooks</router-link>
    </li>
    <li>
      <router-link to="/login">Login</router-link>
    </li>
    <li>
      <router-link to="/note:1">Note</router-link>
    </li>
    <li>
      <router-link to="/trash:2">Trash</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<style>

</style>
