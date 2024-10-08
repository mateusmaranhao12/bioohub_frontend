import { createStore } from 'vuex';

export default createStore({
  state: {
    // Estado do usuário logado
    usuario: null as { id: string; email: string } | null, // Inclui o ID do usuário
    // Lista de links
    links: [] as Array<{ id: number; url: string; redeSocial: string; usuario_id: string }>,
    linksAleatorios: [] as Array<{ id: number; url: string; usuario_id: string }>,
    perfil: {},
    imagemPerfilUrl: null as string | null,
    imagemUrl: null as string | null,
    videoUrl: null as string | null,
    videoId: null as string | null,
    mapaUrl: null as string | null,
    nota: [] as Array<{ id: number; nota: string; usuario_id: string }>,
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

    UPDATE_PERFIL(state, perfil) {
      state.perfil = { ...state.perfil, ...perfil }; // Atualiza os dados do perfil
    },

    // Define a URL da imagem de perfil
    SET_IMAGEM_PERFIL_URL(state, imagemPerfilUrl) {
      state.imagemPerfilUrl = imagemPerfilUrl
    },

    // Limpa a imagem de perfil ao fazer logout
    CLEAR_IMAGEM_PERFIL_URL(state) {
      state.imagemPerfilUrl = null
    },

    // Remove uma imagem da lista pelo ID
    SET_IMAGEM_URL(state, imagemUrl) {
      state.imagemUrl = imagemUrl
    },

    // Limpa a imagem ao fazer logout
    CLEAR_IMAGEM_URL(state) {
      state.imagemUrl = null
    },

    // Define a URL do video
    SET_VIDEO_URL(state, videoUrl) {
      state.videoUrl = videoUrl
    },

    // Limpa o video ao fazer logout
    CLEAR_VIDEO_URL(state) {
      state.videoUrl = null
      state.videoId = null
    },

    // Define a URL do mapa
    SET_MAPA_URL(state, mapaUrl) {
      state.mapaUrl = mapaUrl
    },

    // Limpa o mapa ao fazer logout
    CLEAR_MAPA_URL(state) {
      state.mapaUrl = null
    },

    // Define todos os links aleatórios no estado
    SET_LINKS_ALEATORIOS(state, linksAleatorios) {
      state.linksAleatorios = linksAleatorios;
    },

    // Adiciona um novo link aleatório à lista
    ADD_LINK_ALEATORIO(state, linkAleatorio) {
      state.linksAleatorios.push(linkAleatorio);
    },

    // Atualiza um link aleatório existente
    UPDATE_LINK_ALEATORIO(state, linkAtualizado) {
      const index = state.linksAleatorios.findIndex(link => link.id === linkAtualizado.id);
      if (index !== -1) {
        state.linksAleatorios.splice(index, 1, linkAtualizado);
      }
    },

    // Remove um link aleatório da lista pelo ID
    DELETE_LINK_ALEATORIO(state, linkId) {
      state.linksAleatorios = state.linksAleatorios.filter(link => link.id !== linkId);
    },

    // Limpa os links aleatórios ao fazer logout
    CLEAR_LINKS_ALEATORIOS(state) {
      state.linksAleatorios = [];
    },

    // Define todas as notas no estado
    SET_NOTA(state, nota) {
      state.nota = nota;
    },

    // Adiciona uma nova nota à lista
    ADD_NOTA(state, nota) {
      state.nota.push(nota);
    },

    // Atualiza uma nota existente
    UPDATE_NOTA(state, nota) {
      const index = state.nota.findIndex(nota => nota.id === nota.id);
      if (index !== -1) {
        state.nota.splice(index, 1, nota);
      }
    },

    // Remove uma nota da lista pelo ID
    DELETE_NOTA(state, notaId) {
      state.nota = state.nota.filter(nota => nota.id !== notaId);
    },

    // Limpa as notas ao fazer logout
    CLEAR_NOTA(state) {
      state.nota = [];
    },

  },

  actions: {

    // Ação de login
    login({ commit, dispatch }, usuario) {
      commit('CLEAR_LINKS'); // Limpar links do usuário anterior
      commit('SET_USUARIO', usuario); // Define o usuário logado, certifique-se que 'usuario' contém o ID
      localStorage.setItem('usuario', JSON.stringify(usuario));
      dispatch('loadLinks')
      dispatch('loadNota')
      dispatch('loadImagem')
    },

    // Ação de logout
    logout({ commit }) {
      commit('CLEAR_USUARIO')
      commit('CLEAR_LINKS')
      commit('CLEAR_IMAGEM_URL')
      commit('CLEAR_IMAGEM_PERFIL_URL')
      commit('CLEAR_VIDEO_URL')
      commit('CLEAR_MAPA_URL')
      commit('CLEAR_LINKS_ALEATORIOS')
      commit('CLEAR_NOTA')
      localStorage.removeItem('usuario')
    },

    // Carrega o usuário do localStorage
    loadUsuario({ commit }) {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        commit('SET_USUARIO', JSON.parse(usuario));
      }
    },

    // Ação para salvar a imagem de perfil no localStorage e Vuex
    saveImagemPerfil({ commit, state }, imagemPerfilUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && imagemPerfilUrl) {
        localStorage.setItem(`imagem_${userId}`, imagemPerfilUrl); // Salva a imagem no localStorage
        commit('SET_IMAGEM_PERFIL_URL', imagemPerfilUrl); // Armazena no estado do Vuex
      }
    },

    // Carrega a imagem de perfil do localStorage
    loadImagemPerfil({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        const imagemPerfilUrl = localStorage.getItem(`imagem_${userId}`);
        if (imagemPerfilUrl) {
          commit('SET_IMAGEM_PERFIL_URL', imagemPerfilUrl);
        }
      }
    },

    // Salva os links no localStorage
    saveLinks({ state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        localStorage.setItem(`links_${userId}`, JSON.stringify(state.links));
      }
    },

    // Carrega os links do localStorage e filtra para o usuário logado
    loadLinks({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
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
      link.usuario_id = state.usuario?.id; // Define o usuário que está adicionando o link
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
      commit('DELETE_LINK_BY_ID', linkId);
    },

    // Deleta um link do estado (pelo URL) e não do banco de dados
    deleteLinkByUrl({ commit }, linkUrl) {
      commit('DELETE_LINK_BY_URL', linkUrl);
    },

    // Carrega as imagens do localStorage
    saveImagem({ commit, state }, imagemUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && imagemUrl) {
        localStorage.setItem(`imagem_${userId}`, imagemUrl); // Salva a imagem no localStorage
        commit('SET_IMAGEM_URL', imagemUrl); // Armazena no estado do Vuex
      }
    },

    // Carrega a imagem do localStorage
    loadImagem({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        const imagemUrl = localStorage.getItem(`imagem_${userId}`);
        if (imagemUrl) {
          commit('SET_IMAGEM_URL', imagemUrl);
        }
      }
    },

    // Ação para salvar o video no localStorage e Vuex
    saveVideo({ commit, state }, videoUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && videoUrl) {
        localStorage.setItem(`video_${userId}`, videoUrl); // Salva o video no localStorage
        commit('SET_VIDEO_URL', videoUrl); // Armazena no estado do Vuex
      }
    },

    // Carrega o video do localStorage
    loadVideo({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        const videoUrl = localStorage.getItem(`video_${userId}`);
        if (videoUrl) {
          commit('SET_VIDEO_URL', videoUrl);
        }
      }
    },

    // Ação para salvar o mapa no localStorage e Vuex
    saveMapa({ commit, state }, mapaUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && mapaUrl) {
        localStorage.setItem(`mapa_${userId}`, mapaUrl); // Salva o mapa no localStorage
        commit('SET_MAPA_URL', mapaUrl); // Armazena no estado do Vuex
      }
    },

    // Carrega o mapa do localStorage
    loadMapa({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        const mapaUrl = localStorage.getItem(`mapa_${userId}`);
        if (mapaUrl) {
          commit('SET_MAPA_URL', mapaUrl);
        }
      }
    },

    // Carrega os links aleatórios do localStorage
    loadLinksAleatorios({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        const linksAleatorios = localStorage.getItem(`links_aleatorios_${userId}`);
        if (linksAleatorios) {
          commit('SET_LINKS_ALEATORIOS', JSON.parse(linksAleatorios));
        }
      }
    },

    // Adiciona um novo link aleatório
    addLinkAleatorio({ commit, dispatch, state }, linkAleatorio) {
      const newId = state.linksAleatorios.length > 0 ? Math.max(...state.linksAleatorios.map(l => l.id)) + 1 : 1;
      linkAleatorio.usuario_id = state.usuario?.id; // Define o usuário que está adicionando o link
      linkAleatorio.id = newId; // Atribui o novo ID ao link aleatório
      commit('ADD_LINK_ALEATORIO', linkAleatorio);
      dispatch('saveLinksAleatorios');
    },

    // Atualiza um link aleatório existente
    updateLinkAleatorio({ commit, dispatch }, linkAtualizado) {
      commit('UPDATE_LINK_ALEATORIO', linkAtualizado);
      dispatch('saveLinksAleatorios');
    },

    // Deleta um link aleatório
    deleteLinkAleatorio({ commit }, linkId) {
      commit('DELETE_LINK_ALEATORIO', linkId);
    },

    // Salva os links aleatórios no localStorage
    saveLinksAleatorios({ state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        localStorage.setItem(`links_aleatorios_${userId}`, JSON.stringify(state.linksAleatorios));
      }
    },

    // Carrega as notas do localStorage
    loadNota({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        const nota = localStorage.getItem(`nota_${userId}`);
        if (nota) {
          commit('SET_NOTA', JSON.parse(nota))
        }
      }
    },

    // Adiciona uma nota
    addNota({ commit, dispatch, state }, nota) {
      const newId = state.nota.length > 0 ? Math.max(...state.nota.map(n => n.id)) + 1 : 1;
      nota.usuario_id = state.usuario?.id;
      nota.id = newId;
      commit('ADD_NOTA', nota);
      dispatch('saveNota');
    },

    // Atualiza uma nota existente
    updateNota({ commit, dispatch }, nota) {
      commit('UPDATE_NOTA', nota);
      dispatch('saveNota');
    },

    // Deleta uma nota
    deleteNota({ commit }, notaId) {
      commit('DELETE_NOTA', notaId);
    },

    // Salva as notas no localStorage
    saveNota({ state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        localStorage.setItem(`nota_${userId}`, JSON.stringify(state.nota));
      }
    },

  },

  getters: {
    usuario: state => state.usuario,
    links: state => state.links,
    imagemUrl: state => state.imagemUrl,
    videoUrl: state => state.videoUrl,
    linksAleatorios: state => state.linksAleatorios,
    mapaUrl: state => state.mapaUrl,
    nota: state => state.nota,
  },

  modules: {},
});