<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Auth from '../lib/auth'

import avatar from '@/components/Avatar.vue'

const router = useRouter()

function login() {
  router.push({ path: '/login' })
}

const logout = () => {
  alert('已退出登录')
  Auth.logout().then(() => {
    router.push({ path: '/login' })
  })
}


</script>

<template>
  <div id="sidebar">
    <avatar @login="login" />
    <div class="icons">
      <router-link to="/note" title="笔记" class="link">
        <i class="iconfont icon-note" />
      </router-link>
      <router-link to="/notebooks" title="笔记本" class="link">
        <i class="iconfont icon-notebook" />
      </router-link>
      <router-link to="/trash" title="回收站" class="link">
        <i class="iconfont icon-trash" />
      </router-link>
    </div>
    <div class="logout" @click="logout">
      <i class="iconfont icon-logout" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;

  .icons {
    margin-top: 15px;
    height: 300px;
    display: flex;
    flex-direction: column;

    .link {
      padding: 10px 0;

    }

    .router-link-active {
      background: rgb(106, 106, 106);
    }

    a {
      text-decoration: none;
      color: #333;
    }

  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
  }
}
</style>
