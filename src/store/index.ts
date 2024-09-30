import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: null as { email: string } | null,
    links: [] as Array<{ id: number, url: string, redeSocial: string }> // Agora cada link possui um 'id'
  },

  mutations: {
    // Define o usuário logado
    SET_USUARIO(state, usuario) {
      state.usuario = usuario
    },

    // Limpa o usuário logado
    CLEAR_USUARIO(state) {
      state.usuario = null
    },

    // Define todos os links carregados
    SET_LINKS(state, links) {
      state.links = links // Atualiza os links no estado
    },

    // Adiciona um novo link
    ADD_LINK(state, link) {
      state.links.push(link) // Adiciona um link ao array de links
    },

    // Atualiza um link existente
    UPDATE_LINK(state, linkAtualizado) {
      const index = state.links.findIndex(link => link.id === linkAtualizado.id)
      if (index !== -1) {
        state.links.splice(index, 1, linkAtualizado) // Atualiza o link no estado
      }
    },

    // Remove um link
    DELETE_LINK(state, linkId) {
      state.links = state.links.filter(link => link.id !== linkId) // Remove o link com base no 'id'
    }
  },

  actions: {
    // Ação de login: armazena o usuário no estado e no localStorage
    login({ commit }, usuario) {
      commit('SET_USUARIO', usuario)
      localStorage.setItem('usuario', JSON.stringify(usuario))
    },

    // Ação de logout: limpa o usuário no estado e remove do localStorage
    logout({ commit }) {
      commit('CLEAR_USUARIO')
      localStorage.removeItem('usuario')
    },

    // Carrega o usuário do localStorage ao iniciar a aplicação
    loadUsuario({ commit }) {
      const usuario = localStorage.getItem('usuario')
      if (usuario) {
        commit('SET_USUARIO', JSON.parse(usuario))
      }
    },

    // Carrega os links do localStorage
    loadLinks({ commit }) {
      const links = localStorage.getItem('links')
      if (links) {
        commit('SET_LINKS', JSON.parse(links)) // Carrega os links para o estado
      }
    },

    // Salva os links no localStorage
    saveLinks({ state }) {
      localStorage.setItem('links', JSON.stringify(state.links)) // Persiste os links no localStorage
    },

    // Adiciona um novo link e salva os links no localStorage
    addLink({ commit, dispatch }, link) {
      commit('ADD_LINK', link) // Adiciona o novo link no estado
      dispatch('saveLinks') // Salva os links atualizados no localStorage
    },

    // Edita um link existente e salva os links no localStorage
    updateLink({ commit, dispatch }, linkAtualizado) {
      commit('UPDATE_LINK', linkAtualizado) // Atualiza o link no estado
      dispatch('saveLinks') // Salva os links atualizados no localStorage
    },

    // Deleta um link e salva os links no localStorage
    deleteLink({ commit, dispatch }, linkId) {
      commit('DELETE_LINK', linkId) // Remove o link do estado
      dispatch('saveLinks') // Salva os links atualizados no localStorage
    }
  },

  getters: {
    // Retorna o usuário logado
    usuario: (state) => state.usuario,

    // Retorna os links armazenados
    links: (state) => state.links
  },

  modules: {}
})
