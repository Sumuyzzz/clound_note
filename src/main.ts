import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App.vue'
import router from '@/router/index'

import 'normalize.css'

const app = createApp(App)

app.use(router, VueAxios, axios)
app.mount('#app')
