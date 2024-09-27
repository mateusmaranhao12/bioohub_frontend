import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//Rotas
import Cadastro from '@/views/Cadastro.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import PaginaUsuario from '@/views/PaginaUsuario.vue'
import Planos from '@/components/Planos.vue'
import RedesSociais from '@/components/RedesSociais.vue'
import Usuario from '@/views/Usuario.vue'

function isAuthenticated() { //verificar se o usuario está autenticado
  //verificar se o email do usuário está salvo no sessionStorage
  return !!sessionStorage.getItem('user_email')
}

const routes: Array<RouteRecordRaw> = [

  //Index.vue
  {
    path: '/',
    name: 'index',
    component: Index
  },

  //Cadastro.vue
  {
    path: '/cadastro/:userId?',
    name: 'cadastro',
    component: Cadastro,
    props: (route) => ({ userId: route.params.userId }),
    children: [
      {
        path: 'redes-sociais', // Rota filha para RedesSociais
        name: 'redes-sociais',
        component: RedesSociais,
        props: (route) => ({ userId: route.params.userId })
      },
      {
        path: 'planos', // Rota filha para Planos
        name: 'planos',
        component: Planos,
        props: (route) => ({ userId: route.params.userId })
      }
    ]
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
    component: PaginaUsuario,
    beforeEnter: (to, from, next) => {

      if (!isAuthenticated()) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },

  //Usuario.vue
  {
    path: '/usuario',
    name: 'usuario',
    component: Usuario
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
