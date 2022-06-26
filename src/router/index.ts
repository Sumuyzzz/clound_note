import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/components/Login.vue";
import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
  { path: '/hello:id', component: HelloWorld },
  { path: '/login:id', component: Login },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})




export default router