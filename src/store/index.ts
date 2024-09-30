import { createStore } from 'vuex'

export default createStore({

  state: {

    // Estado do usuário logado
    usuario: null as { email: string } | null,
    // Lista de links
    links: [] as Array<{ id: number, url: string, redeSocial: string, usuario_id: string }>

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

    // Define todos os links no estado
    SET_LINKS(state, links) {
      state.links = links
    },

    // Adiciona um novo link à lista
    ADD_LINK(state, link) {
      state.links.push(link)
    },

    // Atualiza um link existente
    UPDATE_LINK(state, linkAtualizado) {
      const index = state.links.findIndex(link => link.id === linkAtualizado.id)
      if (index !== -1) {
        state.links.splice(index, 1, linkAtualizado)
      }
    },

    // Remove um link da lista
    DELETE_LINK(state, linkId) {
      state.links = state.links.filter(link => link.id !== linkId)
    }
  },

  actions: {

    // Ação de login
    login({ commit }, usuario) {
      commit('SET_USUARIO', usuario)
      localStorage.setItem('usuario', JSON.stringify(usuario))
    },

    // Ação de logout
    logout({ commit }) {
      commit('CLEAR_USUARIO')
      localStorage.removeItem('usuario')
    },

    // Carrega o usuário do localStorage
    loadUsuario({ commit }) {
      const usuario = localStorage.getItem('usuario')
      if (usuario) {
        commit('SET_USUARIO', JSON.parse(usuario))
      }
    },

    // Carrega os links do localStorage e filtra para o usuário logado
    loadLinks({ commit, state }) {
      const links = localStorage.getItem('links')
      if (links) {
        const parsedLinks: Array<{ id: number, url: string, redeSocial: string, usuario_id: string }> = JSON.parse(links)
        const filteredLinks = parsedLinks.filter(link => link.usuario_id === state.usuario?.email)
        commit('SET_LINKS', filteredLinks)
      }
    },

    // Salva os links no localStorage
    saveLinks({ state }) {
      localStorage.setItem('links', JSON.stringify(state.links))
    },

    // Adiciona um novo link
    addLink({ commit, dispatch, state }, link) {
      // Gera um novo ID único para o link
      const newId = state.links.length > 0 ? Math.max(...state.links.map(l => l.id)) + 1 : 1
      link.usuario_id = state.usuario?.email // Define o usuário que está adicionando o link
      link.id = newId // Atribui o novo ID ao link
      commit('ADD_LINK', link)
      dispatch('saveLinks')
    },

    // Atualiza um link existente
    updateLink({ commit, dispatch }, linkAtualizado) {
      commit('UPDATE_LINK', linkAtualizado)
      dispatch('saveLinks')
    },

    // Deleta um link
    deleteLink({ commit, dispatch }, linkId) {
      commit('DELETE_LINK', linkId)
      dispatch('saveLinks')
    }
    
  },

  getters: {
    usuario: (state) => state.usuario,
    links: (state) => state.links
  },

  modules: {}
})
