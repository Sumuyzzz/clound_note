import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/view/Login.vue";
import NoteBooks from '@/view/NoteBooks.vue'
import Note from '@/view/Note.vue'
import Trash from '@/view/Trash.vue'



const routes = [
  { path: '/notebooks', component: NoteBooks },
  { path: '/login', component: Login },
  { path: '/note', component: Note },
  { path: '/trash', component: Trash }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})




export default router