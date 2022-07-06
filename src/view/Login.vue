<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '@/lib/auth'

const router = useRouter()

const isShowLogin = ref(true)

const isShowRegister = ref(false)

const login = reactive({
  username: '',
  password: '',
  notice: '输入用户名和密码',
  isError: false,
})

const register = reactive({
  username: '',
  password: '',
  notice: '创建账号后，请记住用户名和密码',
  isError: false,
})

const showLogin = () => {
  isShowLogin.value = true
  isShowRegister.value = false
}

const showRegister = () => {
  isShowLogin.value = false
  isShowRegister.value = true
}

const onRegister = () => {
  if (!/^[\w\u4E00-\u9FA5]{3,15}$/.test(register.username)) {
    register.isError = true
    register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
    return
  }
  if (!/^.{6,16}$/.test(register.password)) {
    register.isError = true
    register.notice = '密码长度为6~16个字符'
    return
  }
  alert('创建成功')
  register.isError = false
  register.notice = ''
  showLogin()
  Auth.register({
    username: register.username,
    password: register.password,
  }).then(() => {
    register.isError = false
    register.notice = '注册成功'
  }).catch(() => {
    register.isError = true
  })
}

const onLogin = () => {
  if (!/^[\w\u4E00-\u9FA5]{3,15}$/.test(login.username)) {
    login.isError = true
    login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
    return
  }
  if (!/^.{6,16}$/.test(login.password)) {
    login.isError = true
    login.notice = '密码长度为6~16个字符'
    return
  }
  login.isError = false
  login.notice = ''

  Auth.login({
    username: login.username,
    password: login.password,
  }).then(() => {
    login.isError = false
    login.notice = ''
    router.push({ path: '/' })
    alert('登陆成功')
  }).catch((e: any) => {
    login.isError = true
    login.notice = e.msg
  })
}

const close = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main" />
          <div class="form">
            <span class="close" @click="close">{{ 'x' }}</span>
            <h3 @click="showRegister">
              创建账户
            </h3>
            <transition name="slide">
              <div :class="{ show: isShowRegister }" class="register">
                <input v-model="register.username" type="text" placeholder="用户名">
                <input v-model="register.password" type="password" placeholder="密码" @keyup.enter="onRegister">
                <p :class="{ error: register.isError }">
                  {{ register.notice }}
                </p>
                <div class="button" @click="onRegister">
                  创建账号
                </div>
              </div>
            </transition>
            <h3 @click="showLogin">
              登录
            </h3>
            <transition name="slide">
              <div :class="{ show: isShowLogin }" class="login">
                <input v-model="login.username" type="text" placeholder="输入用户名">
                <input v-model="login.password" type="password" placeholder="密码" @keyup.enter="onLogin">
                <p :class="{ error: login.isError }">
                  {{ login.notice }}
                </p>
                <div class="button" @click="onLogin">
                  登录
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      width: 800px;
      height: 500px;
      margin: 0px auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
      display: flex;

      .main {
        flex: 1;
        /* background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat; */
        background-size: contain;
      }

      .form {
        width: 270px;
        border-left: 1px solid #ccc;
        position: relative;

        .close {
          position: absolute;
          right: 10px;
          top: 10px;
          cursor: pointer;
        }

        h3 {

          padding: 10px 20px;
          font-weight: normal;
          font-size: 16px;

          cursor: pointer;

          &:nth-of-type(1) {
            margin-top: 40px;
            border-bottom: 1px solid #eee;
          }

          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
        }

        .button {
          background-color: #2bb964;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-weight: bold;
          color: #fff;
          border-radius: 4px;
          margin-top: 18px;
          cursor: pointer;
        }

        .login,
        .register {
          padding: 0px 20px;
          height: 0;
          overflow: hidden;
          transition: height .4s;

          &.show {
            height: 193px;
          }

          input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 10px;
          }

          input:focus {
            border: 3px solid #9dcaf8;
          }

          p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
          }

          .error {
            color: red;
          }
        }

        .login {
          border-top: 0;
        }
      }
    }
  }

}
</style>
