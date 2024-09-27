import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: null as { email: string } | null // Estado inicial do usuário como null
  },

  mutations: {
    // Define o usuário no estado
    SET_USUARIO(state, usuario) {
      state.usuario = usuario
    },

    // Limpa o estado do usuário
    CLEAR_USUARIO(state) {
      state.usuario = null
    }
  },

  actions: {
    // Ação de login que salva o usuário no estado e no localStorage
    login({ commit }, usuario) {
      commit('SET_USUARIO', usuario)
      localStorage.setItem('usuario', JSON.stringify(usuario)) // Armazena o usuário no localStorage
    },

    // Ação de logout que limpa o estado e remove os dados do localStorage
    logout({ commit }) {
      commit('CLEAR_USUARIO') // Limpa o estado do Vuex
      localStorage.removeItem('usuario') // Remove o usuário do localStorage
    },

    // Carrega o usuário do localStorage, se houver
    loadUsuario({ commit }) {
      const usuario = localStorage.getItem('usuario') // Verifica se há um usuário no localStorage
      if (usuario) {
        commit('SET_USUARIO', JSON.parse(usuario)) // Atualiza o estado com o usuário do localStorage
      }
    }
  },

  getters: {
    // Getter para obter o usuário do estado Vuex
    usuario: (state) => state.usuario
  },

  modules: {
    // Outros módulos Vuex podem ser adicionados aqui no futuro
  }
})
