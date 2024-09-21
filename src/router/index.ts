import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//Rotas
import Cadastro from '@/views/Cadastro.vue'
import Index from '../views/Index.vue'

const routes: Array<RouteRecordRaw> = [

  //Index.vue
  {
    path: '/',
    name: 'index',
    component: Index
  },

  //Cadastro.vue
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
