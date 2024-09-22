import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//Rotas
import Cadastro from '@/views/Cadastro.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import PaginaUsuario from '@/views/PaginaUsuario.vue'

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

  //PaginaUsuario.vue
  {
    path: '/pagina-usuario',
    name: 'pagina-usuario',
    component: PaginaUsuario
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
