<script setup lang="ts">
import { computed, ref } from 'vue'
import Auth from '@/lib/auth'
import EventEmitter from '@/lib/bus'
import type { User } from '@/type/type'

const username = ref('未登录')

const bus = new EventEmitter()

// bus.once('userInfo', (user: User) => {
//   username.value = user.username
// })

Auth.getInfo().then((userData: any) => {
  if (userData.isLogin)
    username.value = userData.data.username
})

const slug = computed({
  get() {
    return username.value[0]
  },
  set(newValue) {
    return username.value = newValue
  },
},
)
</script>

<template>
  <span :title="username" @click="$emit('login')">{{ slug }}</span>
</template>

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
