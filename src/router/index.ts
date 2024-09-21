import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//Rotas
import Cadastro from '@/views/Cadastro.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Planos from '../components/Planos.vue'

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
  },

  //Login.vue
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  //Planos.vue
  {
    path: '/planos',
    name: 'planos',
    component: Planos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
