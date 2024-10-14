import axios from 'axios';
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
    mapaNome: null as string | null,
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
      state.videoUrl = videoUrl;
    },

    // Limpa o video ao fazer logout
    CLEAR_VIDEO_URL(state) {
      state.videoUrl = null; // Define um array vazio ao invés de null
      state.videoId = null;
    },

    // Define a URL do mapa
    SET_MAPA_URL(state, mapaUrl) {
      state.mapaUrl = mapaUrl
    },

    // Limpa o mapa ao fazer logout
    CLEAR_MAPA_URL(state) {
      state.mapaUrl = null
    },

    SET_MAPA_NOME(state, mapaNome) {
      state.mapaNome = mapaNome
    },

    CLEAR_MAPA_NOME(state) {
      state.mapaNome = null
    },

    // Define todos os links aleatórios no estado
    SET_LINKS_ALEATORIOS(state, links) {
      state.linksAleatorios = links;
    },

    ADD_LINK_ALEATORIO(state, link) {
      state.linksAleatorios.push(link);
    },

    UPDATE_LINK_ALEATORIO(state, updatedLink) {
      const index = state.linksAleatorios.findIndex(link => link.id === updatedLink.id);
      if (index !== -1) {
        state.linksAleatorios.splice(index, 1, updatedLink);
      }
    },

    DELETE_LINK_ALEATORIO(state, linkId) {
      const index = state.linksAleatorios.findIndex(link => link.id === linkId);
      if (index !== -1) {
        state.linksAleatorios.splice(index, 1);
      }
    },

    // Limpa os links aleatórios ao fazer logout
    CLEAR_LINKS_ALEATORIOS(state) {
      state.linksAleatorios = [];
    },

    // Define todas as notas no estado
    SET_NOTA(state, notas) {
      state.nota = Array.isArray(notas) ? notas : [];
    },

    // Adiciona uma nova nota à lista
    ADD_NOTA(state, nota) {
      state.nota.push(nota);
    },

    // Atualiza uma nota existente
    UPDATE_NOTA(state, nota) {
      const index = state.nota.findIndex(n => n.id === nota.id);
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
    }

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
      commit('CLEAR_MAPA_NOME')
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

    // Ação para salvar a imagem de perfil no Vuex
    saveImagemPerfil({ commit, state }, imagemPerfilUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && imagemPerfilUrl) {
        commit('SET_IMAGEM_PERFIL_URL', imagemPerfilUrl); // Armazena no estado do Vuex
      }
    },

    // Salva os links (agora, provavelmente no backend ou em uma store centralizada)
    saveLinks({ state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');

      if (userId) {
        // Fazendo a requisição para salvar os links no backend
        axios.post('http://localhost/Projetos/bioohub/backend/api/adicionar_links.php', {
          userId: userId,
          links: state.links  // Os links estão no estado do Vuex
        })
          .then(response => {
            console.log('Links salvos com sucesso:', response.data);
          })
          .catch(error => {
            console.error('Erro ao salvar os links:', error);
          });
      }
    },

    // Carrega os links do backend e filtra para o usuário logado
    loadLinks({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');

      if (userId) {
        // Fazendo a requisição para o backend para carregar os dados do usuário
        axios.get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${userId}`)
          .then(response => {
            // O backend retornará os dados completos, incluindo os links e outras informações do usuário
            if (response.data.usuario) {
              // Comitar os links do backend para o Vuex (ou outro armazenamento)
              commit('SET_LINKS', response.data.redes_sociais); // Supondo que 'redes_sociais' é o campo com os links no retorno
            }
          })
          .catch(error => {
            console.error('Erro ao carregar os links:', error);
          });
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

    // Carrega as imagens 
    saveImagem({ commit, state }, imagemUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && imagemUrl) {
        // Envia a imagem para o backend
        const dados = {
          imagem: imagemUrl,
          usuario_id: userId,
        };

        axios.post('http://localhost/Projetos/bioohub/backend/api/imagens.php', dados, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            commit('SET_IMAGEM_URL', imagemUrl); // Armazena no estado do Vuex
          })
          .catch(error => {
            console.error('Erro ao salvar imagem no backend:', error);
          });
      }
    },

    // Carrega a imagem
    loadImagem({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');

      if (userId) {
        // Carrega os dados do usuário do backend
        axios.get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${userId}`)
          .then(response => {
            if (response.data.perfil && response.data.perfil.foto_perfil) {
              const imagemUrl = `data:image/jpeg;base64,${response.data.perfil.foto_perfil}`;
              commit('SET_IMAGEM_URL', imagemUrl); // Armazena a imagem no Vuex
            }
          })
          .catch(error => {
            console.error('Erro ao carregar imagem do perfil:', error);
          });
      }
    },

    // Ação para salvar o video no Vuex
    saveVideo({ commit, state }, videoUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && videoUrl) {
        commit('SET_VIDEO_URL', videoUrl); // Armazena no estado do Vuex
      }
    },

    // Carrega o video
    loadVideo({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        axios
          .get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${userId}`)
          .then((response) => {
            const videoUrl = response.data.video_url;
            if (videoUrl) {
              commit('SET_VIDEO_URL', videoUrl); // Armazena o vídeo no Vuex
            }
          })
          .catch((error) => {
            console.error('Erro ao carregar o vídeo do backend:', error);
          });
      }
    },

    // Ação para salvar o mapa no Vuex
    saveMapa({ commit, state }, mapaUrl) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId && mapaUrl) {
        commit('SET_MAPA_URL', mapaUrl); // Armazena no estado do Vuex
      }
    },

    // Carrega o mapa diretamente do backend
    loadMapa({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        axios
          .get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${userId}`)
          .then((response) => {
            const mapaUrl = response.data.mapa_url;  // Obtém a URL do mapa do backend
            const mapaNome = response.data.mapa_nome; // Obtém o nome do mapa do backend

            if (mapaUrl) {
              commit('SET_MAPA_URL', mapaUrl);  // Armazena a URL do mapa no Vuex
            }

            if (mapaNome) {
              commit('SET_MAPA_NOME', mapaNome);  // Armazena o nome do mapa no Vuex
            }
          })
          .catch((error) => {
            console.error('Erro ao carregar o mapa do backend:', error);
          });
      }
    },

    // Carrega os links aleatórios do backend
    loadLinksAleatorios({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        axios.get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?usuario_id=${userId}`)
          .then(response => {
            // Se os links forem encontrados, armazena no Vuex
            commit('SET_LINKS_ALEATORIOS', response.data.links_aleatorios);
          })
          .catch(error => {
            console.error('Erro ao carregar links aleatórios:', error);
          });
      }
    },

    // Adiciona um novo link aleatório
    addLinkAleatorio({ commit, state }, linkAleatorio) {
      const newId = state.linksAleatorios.length > 0 ? Math.max(...state.linksAleatorios.map(l => l.id)) + 1 : 1;
      linkAleatorio.usuario_id = state.usuario?.id; // Define o usuário
      linkAleatorio.id = newId; // Atribui o novo ID ao link
      commit('ADD_LINK_ALEATORIO', linkAleatorio);
    },

    // Atualiza um link aleatório existente
    updateLinkAleatorio({ commit }, linkAtualizado) {
      commit('UPDATE_LINK_ALEATORIO', linkAtualizado);
    },

    // Deleta um link aleatório
    deleteLinkAleatorio({ commit }, linkId) {
      commit('DELETE_LINK_ALEATORIO', linkId);
    },

    // Carrega as notas do localStorage
    loadNota({ commit, state }) {
      const userId = state.usuario?.id || sessionStorage.getItem('user_id');
      if (userId) {
        axios.get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?usuario_id=${userId}`)
          .then(response => {
            // Se as notas forem encontradas, armazena no Vuex
            if (Array.isArray(response.data.notas)) {
              commit('SET_NOTA', response.data.notas);
            }
          })
          .catch(error => {
            console.error('Erro ao carregar notas:', error);
          });
      }
    },

    // Adiciona uma nota
    addNota({ commit, state }, nota) {
      const newId = state.nota.length > 0 ? Math.max(...state.nota.map(n => n.id)) + 1 : 1;
      nota.usuario_id = state.usuario?.id;
      nota.id = newId;
      commit('ADD_NOTA', nota);  // Adiciona a nota no Vuex
    },

    // Atualiza uma nota existente
    updateNota({ commit }, nota) {
      commit('UPDATE_NOTA', nota);
    },

    // Deleta uma nota
    deleteNota({ commit }, notaId) {
      commit('DELETE_NOTA', notaId);
    }

  },

  getters: {
    usuario: state => state.usuario,
    links: state => state.links,
    imagemUrl: state => state.imagemUrl,
    videoUrl: state => state.videoUrl,
    linksAleatorios: state => state.linksAleatorios,
    mapaUrl: state => state.mapaUrl,
    mapaNome: state => state.mapaNome,
    nota: state => state.nota,
  },

  modules: {},
});