import { createStore } from 'vuex';

export default createStore({
  state: {
    // Estado do usuário logado
    usuario: null as { email: string } | null,
    // Lista de links
    links: [] as Array<{ id: number, url: string, redeSocial: string, usuario_id: string }>,
  },

  mutations: {
    // Define o usuário logado
    SET_USUARIO(state, usuario) {
      state.usuario = usuario;
    },

    // Limpa o usuário logado
    CLEAR_USUARIO(state) {
      state.usuario = null;
    },

    // Define todos os links no estado
    SET_LINKS(state, links) {
      state.links = links;
    },

    // Adiciona um novo link à lista
    ADD_LINK(state, link) {
      state.links.push(link);
    },

    // Atualiza um link existente
    UPDATE_LINK(state, linkAtualizado) {
      const index = state.links.findIndex(link => link.id === linkAtualizado.id);
      if (index !== -1) {
        state.links.splice(index, 1, linkAtualizado);
      }
    },

    // Remove um link da lista pelo ID
    DELETE_LINK_BY_ID(state, linkId) {
      state.links = state.links.filter(link => link.id !== linkId);
    },

    // Remove um link da lista pelo URL
    DELETE_LINK_BY_URL(state, linkUrl) {
      state.links = state.links.filter(link => link.url !== linkUrl);
    },

    // Limpa os links ao fazer logout
    CLEAR_LINKS(state) {
      state.links = [];
    },
  },

  actions: {
    // Ação de login
    login({ commit, dispatch }, usuario) {
      commit('CLEAR_LINKS'); // Limpar links do usuário anterior
      commit('SET_USUARIO', usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      dispatch('loadLinks'); // Carregar links do novo usuário autenticado
    },

    // Ação de logout
    logout({ commit }) {
      commit('CLEAR_USUARIO');
      commit('CLEAR_LINKS'); // Limpar links ao fazer logout
      localStorage.removeItem('usuario');
    },

    // Carrega o usuário do localStorage
    loadUsuario({ commit }) {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        commit('SET_USUARIO', JSON.parse(usuario));
      }
    },

    // Salva os links no localStorage
    saveLinks({ state }) {
      const userId = state.usuario?.email || sessionStorage.getItem('user_id'); // Utilize o ID correto aqui
      if (userId) {
        localStorage.setItem(`links_${userId}`, JSON.stringify(state.links));
      }
    },

    // Carrega os links do localStorage e filtra para o usuário logado
    loadLinks({ commit, state }) {
      const userId = state.usuario?.email || sessionStorage.getItem('user_id'); // Utilize o ID correto aqui
      if (userId) {
        const links = localStorage.getItem(`links_${userId}`);
        if (links) {
          commit('SET_LINKS', JSON.parse(links));
        }
      }
    },

    // Adiciona um novo link
    addLink({ commit, dispatch, state }, link) {
      // Gera um novo ID único para o link
      const newId = state.links.length > 0 ? Math.max(...state.links.map(l => l.id)) + 1 : 1;
      link.usuario_id = sessionStorage.getItem('user_id'); // Define o usuário que está adicionando o link
      link.id = newId; // Atribui o novo ID ao link
      commit('ADD_LINK', link);
      dispatch('saveLinks');
    },

    // Atualiza um link existente
    updateLink({ commit, dispatch }, linkAtualizado) {
      commit('UPDATE_LINK', linkAtualizado);
      dispatch('saveLinks');
    },

    // Deleta um link
    deleteLink({ commit }, linkId) {
      commit('DELETE_LINK', linkId);
    },

    // Deleta um link do estado (pelo URL) e não do banco de dados
    deleteLinkByUrl({ commit }, linkUrl) {
      commit('DELETE_LINK_BY_URL', linkUrl);
    },
    
  },

  getters: {
    usuario: state => state.usuario,
    links: state => state.links,
  },

  modules: {},
});
