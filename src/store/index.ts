import { createStore } from 'vuex'

export default createStore({

  state: {
    usuario: null as { email: string } | null
  },

  mutations: {

    SET_USUARIO(state, usuario) {
      state.usuario = usuario
    },

    CLEAR_USUARIO(state) {
      state.usuario = null
    }
  },

  actions: {

    login({ commit }, usuario) { //login
      commit('SET_USUARIO', usuario)
      localStorage.setItem('usuario', JSON.stringify(usuario))
    },

    logout({ commit }) { //logout
      commit('CLEAR_USUARIO')
      localStorage.removeItem('usuario')
    },

    loadUsuario({ commit }) {
      const usuario = localStorage.getItem('usuario')
      if (usuario) {
        commit('SET_USUARIO', JSON.parse(usuario))
      }
    }

  },

  getters: {
   usuario: (state) => state.usuario 
  },

  modules: {

  }

})
