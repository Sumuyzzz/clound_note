<template>
  <span :title="user.username">{{ slug }}</span>
  <slot></slot>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue';

const user = reactive({
  username: 'hunger'
})
const slug = ref('H')

</script>

<style scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;

}
</style>