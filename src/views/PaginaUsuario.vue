<template>
    <div class="container pagina-usuario">

        <!--Alerta de sucesso ao cadastrar usuario-->
        <div class="col-md-12 d-flex justify-content-center mt-2">
            <Alerta :mensagem_alerta="mensagem_alerta" />
        </div>

        <div class="row">
            <!-- Coluna Dados -->
            <div class="col-md-6 mt-5">

                <!-- Escolher imagem -->
                <div
                    class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center position-relative">
                    <input type="file" id="file-input" class="file-input" accept="image/*" @change="carregarImagem"
                        :disabled="imagemSelecionada" style="display:none;">
                    <label for="file-input" class="d-flex flex-column justify-content-center align-items-center">
                        <img v-if="selectedImage" :src="selectedImage" class="img-fluid rounded-circle"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <img v-else :src="imagemUrl || '../default-image.png'" class="img-fluid rounded-circle"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <i v-if="!selectedImage" class="icone-upload fa-solid fa-upload fa-2x mb-5"></i>
                        <p v-if="!selectedImage" class="text-center mb-4">Adicionar foto</p>
                    </label>

                    <div v-if="selectedImage" class="position-absolute" style="top: 5px; right: 5px;">
                        <button class="btn btn-primary btn-sm" @click="$refs['file-input'].click()">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn btn-danger btn-sm ms-2" @click="removerImagemPerfil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                <!-- Input para editar nome -->
                <div class="animate__animated animate__zoomIn mt-4">
                    <div v-if="editandoNome" class="d-flex align-items-center">
                        <input type="text" v-model="nome" class="form-control input-usuario" placeholder="Seu nome"
                            aria-label="Nome">
                        <button class="btn btn-success btn-sm ms-2" @click="salvarPerfil"><i
                                class="fa fa-check"></i></button>
                    </div>
                    <div v-else class="d-flex align-items-center">
                        <h4>{{ nome }}</h4>
                        <button class="btn btn-dark btn-sm ms-2" @click="editarNome"><i
                                class="fa fa-pencil"></i></button>
                    </div>
                </div>

                <!-- Input para editar bio -->
                <div class="animate__animated animate__zoomIn mt-2">
                    <div v-if="editandoBio" class="d-flex align-items-center">
                        <textarea v-model="bio" class="form-control input-bio" placeholder="Sua biografia..."
                            aria-label="Bio"></textarea>
                        <button class="btn btn-success btn-sm ms-2" @click="salvarPerfil"><i
                                class="fa fa-check"></i></button>
                    </div>
                    <div v-else class="d-flex align-items-center">
                        <p>{{ bio }}</p>
                        <button class="btn btn-dark btn-sm ms-2" @click="editarBio"><i
                                class="fa fa-pencil"></i></button>
                    </div>
                </div>

                <div class="animate__animated animate__zoomIn mt-5">
                    <h6>Nenhuma visualização hoje</h6>
                </div>

                <!-- Menu Hamburguer visível em dispositivos menores (abaixo do textarea) -->
                <nav class="navbar navbar-expand-lg navbar-light d-md-none mt-3">
                    <div class="container-fluid">
                        <button class="animate__animated animate__zoomIn navbar-toggler mb-3" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            Exibir mais
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <div class="d-flex justify-content-start gap-2">
                                        <div class="dropdown dropup mb-2">
                                            <button
                                                class="animate__animated animate__zoomIn botao-dropdown btn btn-configuracoes dropdown-toggle btn-sm"
                                                type="button" id="settingsDropdown" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <i class="fa-solid fa-gear"></i>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
                                                <li>
                                                    <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                                        data-bs-target="#alterarSenhaModal">Alterar senha</a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                                        data-bs-target="#alterarEmailModal">Alterar e-mail</a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                                        data-bs-target="#alterarUsuarioModal">Alterar usuário</a>
                                                </li>
                                                <li>
                                                    <a @click="fazerLogout()" class="dropdown-item" href="#">
                                                        <i class="fa-solid fa-sign-out-alt"></i> Logout</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <router-link to="/usuario"
                                            class="animate__animated animate__zoomIn btn btn-visualizar-perfil btn-sm">
                                            <i class="fa-solid fa-user"></i>
                                        </router-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>

            <!-- Coluna Links -->
            <div class="col-md-6 mt-5 mb-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <div
                        class="animate__animated animate__zoomIn card link-card card-small d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-mountain fa-2x"></i>
                        <p class="mt-2">Adicionar imagem</p>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-vertical d-flex flex-column align-items-center justify-content-center position-relative">
                        <!-- Exibir links se houver algum adicionado -->
                        <div v-for="link in $store.getters.links" :key="link.id"
                            class="mt-3 d-flex flex-column align-items-center position-relative">
                            <i v-if="!adicionandoLink && !editandoLink"
                                :class="`fa-brands fa-${link.redeSocial} fa-2x`"></i>

                            <!-- Deletar link -->
                            <div v-if="!adicionandoLink && !editandoLink" @click="deletarLink(link.id)"
                                class="delete-icon" style="position: absolute; top: -10px; right: -15px;">
                                <i class="fa-solid fa-trash"></i>
                            </div>

                            <!-- Ícone de editar fora do card, em cima dele, somente se a rede social for válida -->
                            <div v-if="!adicionandoLink && !editandoLink" @click="iniciarEdicaoLink(link)"
                                class="edit-icon" style="position: absolute; top: 30px; right: -15px;">
                                <i class="fa-solid fa-pencil-alt"></i>
                            </div>

                            <button v-if="!adicionandoLink && !editandoLink" @click="redirecionarParaLink(link)"
                                class="btn btn-secondary btn-sm mt-2">
                                Seguir
                            </button>
                        </div>

                        <!-- Ícone do globo e texto "Adicionar Link" (inicial) -->
                        <div v-if="!adicionandoLink && !editandoLink && !redeSocial && !$store.getters.links.length"
                            @click="iniciarAdicaoLink" class="plus-icon position-absolute"
                            style="top: 10px; right: 10px;">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>

                        <i v-if="!adicionandoLink && !editandoLink && !redeSocial && !$store.getters.links.length"
                            class="fa-solid fa-globe fa-2x"></i>
                        <p v-if="!adicionandoLink && !editandoLink && !redeSocial && !$store.getters.links.length"
                            class="mt-2">
                            Adicionar rede social
                        </p>

                        <!-- Exibir input e botão somente após clicar no ícone "+" -->
                        <div v-if="adicionandoLink || editandoLink" class="w-100 d-flex flex-column align-items-center">
                            <i v-if="editandoLink" @click="cancelarEdicao" class="mb-3 fa-solid fa-arrow-left"
                                style="cursor: pointer;"></i>
                            <input v-model="novoLink" type="text" class="form-control mt-2"
                                placeholder="Insira o link" />

                            <!-- Botão alterna entre adicionar e editar -->
                            <button @click="editandoLink ? editarLink() : adicionarLink()"
                                :class="editandoLink ? 'btn btn-success mt-2 btn-sm' : 'btn btn-primary mt-2 btn-sm'">
                                <i :class="editandoLink ? 'fa-solid fa-check' : 'fa-solid fa-plus'"
                                    style="color: white;"></i>
                            </button>
                        </div>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-horizontal d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-brands fa-spotify fa-2x"></i>
                        <p class="mt-2">Adicionar música</p>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-large-square d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-video fa-2x"></i>
                        <p class="mt-2">Adicionar vídeo</p>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-vertical2 d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                        <p class="mt-2">Adicionar localização</p>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-small2 d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-share-alt fa-2x"></i>
                        <p class="mt-2">Adicionar link</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Botões visíveis em dispositivos maiores -->
        <div class="mt-3 col-md-6 d-none d-md-block">
            <div class="d-flex justify-content-start gap-2" style="width: 60%;">
                <div class="dropdown dropup mb-2">
                    <button
                        class="animate__animated animate__zoomIn botao-dropdown btn btn-configuracoes dropdown-toggle btn-sm"
                        type="button" id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-gear"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
                        <li>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                data-bs-target="#alterarSenhaModal">Alterar senha</a>
                        </li>
                        <li>
                            <a class="dropdown-item mt-2" href="#" data-bs-toggle="modal"
                                data-bs-target="#alterarEmailModal">Alterar e-mail</a>
                            <small class="text-muted d-block ms-3 me-3">{{ email }}</small>
                        </li>
                        <li>
                            <a class="dropdown-item mt-2" href="#" data-bs-toggle="modal"
                                data-bs-target="#alterarUsuarioModal">Alterar usuário</a>
                            <small class="text-muted d-block ms-3 me-3">{{ usuario }}</small>
                        </li>
                        <li>
                            <a @click="fazerLogout()" class="dropdown-item mt-2" href="#">
                                <i class="fa-solid fa-sign-out-alt"></i> Logout</a>
                        </li>
                    </ul>
                </div>

                <router-link to="/usuario"
                    class="animate__animated animate__zoomIn botao-visualizar-perfil btn btn-visualizar-perfil btn-sm">
                    <i class="fa-solid fa-user"></i>
                </router-link>
            </div>
        </div>

        <!--<button class="btn btn-light" @click="clearLinks">Limpar Links</button>-->

        <Footer class="animate__animated animate__zoomIn" />

        <!-- Inclui os modais -->
        <AlterarSenha />
        <AlterarEmail @emailAlterado="atualizarEmail" />
        <AlterarUsuario @usuarioAlterado="atualizarUsuario" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Alerta from '@/components/Alerta.vue'
import Footer from '@/components/Footer.vue'
import AlterarSenha from '@/components/AlterarSenha.vue'
import AlterarEmail from '@/components/AlterarEmail.vue'
import AlterarUsuario from '@/components/AlterarUsuario.vue'
import { Alert } from '@/interfaces/Alert'
import { mapActions } from 'vuex'
import { Link } from '@/interfaces/Link'
import axios from 'axios'

@Options({
    components: {
        Alerta,
        Footer,
        AlterarSenha,
        AlterarEmail,
        AlterarUsuario,
    },

    methods: {
        ...mapActions(['logout']) // Mapeando a ação de logout
    }

})

export default class PaginaUsuario extends Vue {

    public usuario = '' // Armazenar nome do usuário
    public email = '' // Armazenar email do usuário
    public senha = '' // Pode ser utilizado futuramente
    public mensagem_alerta: Alert | null = null // Armazenar mensagem de alerta

    //imagem, nome e descrição
    public selectedImage: string | null = null
    public imagemUrl: string | null = null
    public editandoNome = false
    public editandoBio = false
    public bio = '' //biografia
    public nome = ''
    public imagemSelecionada = false

    // Editar ou inserir links
    public linkId: number | null = null
    public adicionandoLink = false
    public editandoLink = false
    public novoLink = ''


    // Inserir rede social (ex: instagram)
    public redeSocial = ''
    public linkParaRedirecionar: string | null = null // Nova variável para o link a ser redirecionado

    gerarId(): number {
        // Acesse os links através do getter do Vuex
        const links: Array<Link> = this.$store.getters.links
        return links.length > 0 ? Math.max(...links.map(link => link.id)) + 1 : 1
    }

    // Iniciar edição do link
    public iniciarAdicaoLink(link: Link) {
        this.adicionandoLink = true
        this.novoLink = ''
        this.redeSocial = ''
        this.linkParaRedirecionar = ''
        this.linkParaRedirecionar = link.url
    }

    // Iniciar edição do link
    public iniciarEdicaoLink(link: Link) {
        this.editandoLink = true
        this.novoLink = link.url // Preenche o campo com o link atual
        this.linkId = link.id // Armazena o ID do link que está sendo editado
        this.redeSocial = link.redeSocial // Preenche a rede social
    }

    created() {
        this.$store.dispatch('loadLinks') // Carrega os links do Vuex
            .then(() => {
                const links: Link[] = this.$store.getters.links
                const userId = sessionStorage.getItem('user_id') // ID do usuário autenticado

                // Filtra os links para mostrar apenas os do usuário logado
                const userLinks = links.filter(link => link.usuario_id === userId)

                // Exibe os links do usuário no console
                if (userLinks.length > 0) {
                    console.log("Links do usuário carregados:", userLinks)
                } else {
                    console.log("Nenhum link encontrado para o usuário com ID:", userId)
                }

                // Adiciona links do localStorage se necessário
                if (!userLinks.length) {
                    const linksString = localStorage.getItem(`links_${userId}`)
                    const linksFromLocalStorage = JSON.parse(linksString ? linksString : '[]')
                    const userLinksFromLocalStorage: Link[] = linksFromLocalStorage.filter((link: Link) => link.usuario_id === userId)

                    if (userLinksFromLocalStorage.length > 0) {
                        userLinksFromLocalStorage.forEach((link: Link) => {
                            this.$store.commit('ADD_LINK', link)
                        })
                        console.log("Links adicionados do localStorage:", userLinksFromLocalStorage)
                    } else {
                        console.log("Nenhum link encontrado no localStorage para o usuário com ID:", userId)
                    }
                }
            })
            .catch((error: any) => {
                console.error('Erro ao carregar links:', error)
            })
    }

    // Adicionar link
    public async adicionarLink() {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/

        if (this.novoLink.trim() === '' || !regex.test(this.novoLink)) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido. Tente novamente.', 'alert-error')
            return
        }

        const redeSocial = this.detectarRedeSocial(this.novoLink)
        if (redeSocial) {
            this.redeSocial = redeSocial
            this.linkParaRedirecionar = this.novoLink

            const usuarioId = sessionStorage.getItem('user_id')
            if (!usuarioId) {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado. Tente novamente.', 'alert-error')
                return // Encerra se não houver ID do usuário
            }

            const dados = {
                usuario_id: usuarioId,
                redes: [{ url: this.novoLink }],
            }

            try {
                const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/adicionar_links.php', dados)
                if (response.data.success) {
                    const novoLinkComId: Link = {
                        url: this.novoLink,
                        redeSocial,
                        id: response.data.links && response.data.links.length > 0 ? response.data.links[0].id : this.gerarId(), // Use o ID retornado pelo backend ou gera um novo
                        usuario_id: usuarioId, // Usar o ID validado
                    }

                    this.mostrarMensagemAlerta('fa-solid fa-check-circle', `Link de ${redeSocial} adicionado com sucesso!`, 'alert-sucesso')

                    this.$store.commit('ADD_LINK', novoLinkComId)
                    this.$store.dispatch('saveLinks')

                    this.adicionandoLink = false
                } else {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
                }
            } catch (error) {
                console.error('Erro ao adicionar link:', error)
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar link.', 'alert-error')
            }
        }
    }

    // Editar link
    public async editarLink() {
        // Verifica se linkId é válido
        if (this.linkId === null) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro: ID do link não encontrado.', 'alert-error')
            return
        }

        const usuarioId = sessionStorage.getItem('user_id')
        if (!usuarioId) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado. Tente novamente.', 'alert-error')
            return // Encerra se não houver ID do usuário
        }

        // Detecta a nova rede social com base no novo link
        const novaRedeSocial = this.detectarRedeSocial(this.novoLink)
        if (!novaRedeSocial) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido. Por favor, insira um link de rede social válido.', 'alert-error')
            return
        }

        const dados = {
            usuario_id: usuarioId,
            redes: [{ url: this.novoLink, old_url: this.linkParaRedirecionar, id: this.linkId }]
        }

        try {
            const response = await axios.put('http://localhost/Projetos/bioohub/backend/api/editar_links.php', dados)
            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', response.data.message, 'alert-sucesso')

                const linkEditado: Link = {
                    url: this.novoLink,
                    redeSocial: novaRedeSocial, // Atualiza a rede social detectada
                    id: this.linkId, // O ID permanece o mesmo
                    usuario_id: usuarioId // Usar o ID validado
                }
                this.$store.commit('UPDATE_LINK', linkEditado)

                this.$store.dispatch('saveLinks')

                this.editandoLink = false
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
            console.error('Erro ao editar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao editar link.', 'alert-error')
        }
    }

    // Remover link
    public async deletarLink(id: number) {
        const usuarioId = sessionStorage.getItem('user_id') // Obter o usuário ID

        // Verifica se o id está definido
        if (id === undefined || id === null) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'ID do link não definido.', 'alert-error')
            return
        }

        const dados = {
            usuario_id: usuarioId,
            id: id // Certifique-se de que 'id' está sendo passado corretamente
        }

        try {
            // Realizar a requisição DELETE
            const response = await axios.delete('http://localhost/Projetos/bioohub/backend/api/deletar_links.php', { data: dados })

            if (response.data.success) {
                // Remove o link do Vuex pelo ID
                this.$store.commit('DELETE_LINK_BY_ID', id)
                this.$store.dispatch('saveLinks')

                // Mostrar mensagem de sucesso
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link deletado com sucesso!', 'alert-sucesso')
                this.redeSocial = '' // Limpar o campo de rede social
                this.linkParaRedirecionar = null // Resetar o link para redirecionar
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error: any) {
            console.error('Erro ao deletar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao deletar link.', 'alert-error')
        }
    }

    // Detectar rede social
    public detectarRedeSocial(url: string): string | null {
        if (/https?:\/\/(www\.)?instagram\.com\/[^/]+/.test(url)) {
            return 'instagram'
        } else if (/https?:\/\/(www\.)?github\.com\/[^/]+/.test(url)) {
            return 'github'
        } else if (/https?:\/\/(www\.)?linkedin\.com\/in\/[^/]+/.test(url)) {
            return 'linkedin'
        } else {
            return 'globe'
        }
    }

    // Função para redirecionar para o link inserido
    public redirecionarParaLink(link: Link) {
        if (link && link.url) {
            window.open(link.url, '_blank') // Abre o link em uma nova aba
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link não encontrado.', 'alert-error')
        }
    }

    // Cancelar edição do link
    public cancelarEdicao() {
        this.editandoLink = false // Sai do modo de edição
        this.novoLink = '' // Limpa o campo de link
        this.redeSocial = '' // Limpa a rede social
    }

    // Mapeando ações do Vuex
    private logout!: () => Promise<void>
    $store: any // Tipagem do Vuex store

    mounted() {
        // Recupera a mensagem do sessionStorage
        const mensagem = sessionStorage.getItem('mensagem_alerta');
        if (mensagem) {
            const alertData = JSON.parse(mensagem);
            this.mensagem_alerta = alertData; // Define a mensagem de alerta
            sessionStorage.removeItem('mensagem_alerta'); // Remove a mensagem após exibi-la

            this.mostrarMensagemAlerta(alertData.icone, alertData.mensagem, alertData.status);
        }

        // Recupera o usuário, email e ID do sessionStorage
        this.usuario = this.$store.getters.usuario?.usuario || sessionStorage.getItem('user_name') || '';
        this.email = this.$store.getters.usuario?.email || sessionStorage.getItem('user_email') || '';
        const userId = sessionStorage.getItem('user_id');
        console.log('User ID:', userId);

        // Carregar os dados do perfil do localStorage
        const perfilData = localStorage.getItem(`perfil_${userId}`);
        if (perfilData) {
            const perfil = JSON.parse(perfilData);
            this.nome = perfil.nome || '';
            this.bio = perfil.descricao || '';
            this.selectedImage = perfil.foto_perfil || null;

            // Atualiza o Vuex com os dados do perfil carregados
            this.$store.commit('UPDATE_PERFIL', perfil);
        }
    }


    // Logout 
    public fazerLogout() {
        this.logout()
            .then(() => {
                sessionStorage.removeItem('user_email') // Remover o email do sessionStorage
                sessionStorage.removeItem('user_name') // Remover o nome do usuário do sessionStorage
                this.$router.push('/') // Redirecionar para a página inicial
            })
            .catch((error: unknown) => {
                console.error('Logout failed:', error) // Logar o erro
            })
    }

    // Método para carregar a imagem
    public carregarImagem(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();

            // Converter a imagem para Base64
            reader.onload = (e) => {
                this.selectedImage = e.target?.result as string; // Atualiza o src da imagem
                this.imagemSelecionada = true // Desabilita o input após seleção da imagem

                this.salvarPerfil()
            };

            reader.readAsDataURL(file); // Lê o arquivo como URL
        }
    }

    // Método para salvar perfil
    public salvarPerfil() {
        // Acessa o ID do usuário do Vuex ou sessionStorage
        const userId = this.$store.getters.usuario?.id || sessionStorage.getItem('user_id');

        console.log("ID do usuário:", userId); // Verifica se o ID está correto

        if (!userId) {
            console.error("ID do usuário não encontrado."); // Log se o ID não estiver disponível
            return; // Não prosseguir se o ID não estiver disponível
        }

        const perfil: any = {
            usuario_id: userId, // ID do usuário vindo do Vuex ou sessionStorage
        };

        // Adiciona os campos somente se não estiverem vazios
        if (this.nome) {
            perfil.nome = this.nome;
        }

        if (this.bio) {
            perfil.descricao = this.bio;
        }

        if (this.selectedImage && /^data:image\/[a-zA-Z]+;base64,/.test(this.selectedImage)) {
            perfil.foto_perfil = this.selectedImage; // Imagem em Base64
        } else {
            console.error("Imagem inválida ou não selecionada.");
            return;
        }


        console.log("Dados do perfil a serem salvos:", perfil); // Log dos dados do perfil

        // Faz a requisição apenas se houver pelo menos um campo a ser salvo
        if (Object.keys(perfil).length > 1) {
            axios.post('http://localhost/Projetos/bioohub/backend/api/perfil.php', perfil)
                .then(response => {
                    this.editandoNome = false;
                    this.editandoBio = false;
                    console.log('Perfil salvo com sucesso:', response.data);

                    // Persistir os dados no localStorage
                    localStorage.setItem(`perfil_${userId}`, JSON.stringify(perfil));

                    // Atualizar o Vuex com os dados do perfil
                    this.$store.commit('UPDATE_PERFIL', perfil); // Supondo que você tenha uma mutação UPDATE_PERFIL no Vuex
                })
                .catch(error => {
                    console.error('Erro ao salvar o perfil:', error.response.data); // Log do erro detalhado
                });
        } else {
            console.warn('Nenhum dado para salvar.');
        }
    }

    // Método para remover a imagem de perfil
    public removerImagemPerfil() {
        this.selectedImage = null;
        this.imagemUrl = null;
    }

    // Alterna o estado de edição do nome
    public editarNome() {
        this.editandoNome = true;
    }

    // Alterna o estado de edição da bio
    public editarBio() {
        this.editandoBio = true;
    }

    // Atualizar usuário
    public atualizarUsuario(novoUsuario: string) {
        this.usuario = novoUsuario
        sessionStorage.setItem('user_name', novoUsuario)
        // Aqui você pode adicionar lógica para atualizar o nome do usuário no backend
    }

    // Atualizar email
    public atualizarEmail(novoEmail: string) {
        this.email = novoEmail
        sessionStorage.setItem('user_email', novoEmail)
        // Aqui você pode adicionar lógica para atualizar o email do usuário no backend
    }

    // Mostrar mensagem de alerta
    private mostrarMensagemAlerta(icone: string, mensagem: string, status: string) {
        this.mensagem_alerta = { icone, mensagem, status }
        setTimeout(() => {
            this.mensagem_alerta = null
        }, 5000)
    }

    //caso precise limpar localStorage
    /*clearLinks() {
        localStorage.removeItem('links') // Remove a chave 'links' do localStorage
        this.$store.commit('SET_LINKS', []) // Atualiza o estado do Vuex
        console.log('localStorage dos links foi limpo.')
    } */

}
</script>

<style lang="scss">
@import '../scss/pagina_usuario.scss';

.dropdown-settings {
    bottom: 100px;
    /* Espaço acima do Footer */
    left: 20px;
    /* Margem da esquerda */
}
</style>