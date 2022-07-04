import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App.vue'
import router from '@/router/index'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'normalize.css'

const app = createApp(App)

app.use(router, VueAxios, axios)
app.mount('#app')
