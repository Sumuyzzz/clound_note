<template>
  <span :title="username" @click="$emit('login')">{{ slug }}</span>
  <slot></slot>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';
import Auth from '@/lib/auth'
import EventEmitter from '@/lib/bus'

const username = ref('未登录')

const bus = new EventEmitter()


bus.on('userInfo', (user: { username: string; }) => {
  username.value= user.username
})



Auth.getInfo().then((user) => {
  if (user.isLogin) {
    username.value = user.data.username
  }
  console.log(user);
})


const slug = computed({
  get() {
    return username.value[0]
  },
  set(newValue) {
    return username.value = newValue
  }
}
)





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
  cursor: pointer;
}
</style>