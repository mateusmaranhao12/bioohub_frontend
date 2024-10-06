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
                <div class="animate__animated animate__zoomIn avatar-circle 
                    d-flex flex-column justify-content-center align-items-center p
                    osition-relative">
                    <input type="file" id="file-input" class="file-input" accept="image/*"
                        @change="carregarImagemPerfil" :disabled="imagemPerfilSelecionada" style="display:none;">
                    <label for="file-input" class="d-flex flex-column justify-content-center align-items-center">
                        <img v-if="selectedImage" :src="selectedImage" class="img-fluid rounded-circle"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <img v-else :src="imagemPerfilUrl || '../default-image.png'" class="img-fluid rounded-circle"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <i v-if="!selectedImage" class="icone-upload fa-solid fa-upload fa-2x mb-5"></i>
                        <p v-if="!selectedImage" class="text-center mb-4">Adicionar foto</p>
                    </label>

                    <div v-if="selectedImage" class="position-absolute" style="top: 5px; right: 5px;">
                        <button class="btn btn-danger btn-sm ms-2" @click="removerImagemPerfil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                <!-- Input para editar nome -->
                <div class="animate__animated animate__zoomIn mt-4">
                    <div v-if="!salvandoAlteracoes">
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
                </div>

                <!-- Input para editar bio -->
                <div class="animate__animated animate__zoomIn mt-2">
                    <div v-if="salvandoAlteracoes">
                        <p class="text-start">Salvando alterações...</p> <!-- Mensagem durante o salvamento -->
                    </div>
                    <div v-else>
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

            <!-- Coluna de links, imagens, videos, etc -->
            <div class="col-md-6 mt-5 mb-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">

                    <!--Inserir nota-->
                    <div class="animate__animated animate__zoomIn">
                        <!-- Textarea para adicionar ou editar nota -->
                        <textarea v-if="!notaSalva || editandoNota" placeholder="Adicione uma nota aqui"
                            class="form-control text-area" rows="3" :style="textareaStyle" v-model="nota"
                            @input="botaoSalvarNota = true">
                        </textarea>

                        <!-- Exibir a nota salva -->
                        <p v-if="notaSalva && !editandoNota" class="nota-display">
                            {{ notaSalva.nota }}
                            <span @click="editarNota" class="icon-editar-nota"
                                style="cursor: pointer; margin-left: 10px;">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </span>
                            <span @click="removerNota(notaSalva.id)" class="icon-remover-nota"
                                style="cursor: pointer; margin-left: 5px;">
                                <i class="fa-solid fa-trash"></i>
                            </span>
                        </p>

                        <!-- Botão para salvar nota ou salvar alterações -->
                        <button v-if="botaoSalvarNota" @click="editandoNota ? salvarEdicaoNota() : salvarNota()"
                            class="btn btn-success mt-2">
                            <i class="fa-solid fa-check"></i> {{ editandoNota ? 'Salvar alterações' : 'Salvar nota' }}
                        </button>
                    </div>

                    <!--Inserir imagens-->
                    <div class="animate__animated animate__zoomIn card link-card 
                        card-imagem d-flex flex-column align-items-center justify-content-center 
                        position-relative" style="overflow: hidden;">

                        <input type="file" ref="fileInput" @change="carregarImagem" style="display:none;"
                            accept="image/*">

                        <div v-if="!imagemSelecionada && !loading" class="plus-icon position-absolute"
                            @click="abrirSeletorImagem" style="cursor: pointer;">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>

                        <div v-if="imagemSelecionada && !loading" class="plus-icon position-absolute"
                            @click="removerImagem" style="cursor: pointer;">
                            <i class="fa-solid fa-trash"></i>
                        </div>

                        <div v-if="loading"
                            class="position-absolute d-flex align-items-center justify-content-center w-100 h-100">
                            <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                        </div>

                        <div v-if="imagemSelecionada" class="w-100 h-100">
                            <img :src="imagemUrl || undefined" class="img-fluid w-100 h-100"
                                style="object-fit: cover;" />
                        </div>

                        <div v-else>
                            <i class="fa-solid fa-mountain fa-2x"></i>
                            <p class="mt-2">Adicionar imagem</p>
                        </div>

                        <div v-if="imagemSelecionada && !loading">
                            <input type="text" class="form-control position-absolute input-card"
                                placeholder="Você pode escrever aqui" v-model="textoImagem" @blur="salvarTextoImagem" />
                        </div>
                    </div>

                    <!--Inserir redes sociais-->
                    <div class="animate__animated animate__zoomIn card link-card card-redes-sociais 
                        d-flex flex-column align-items-center justify-content-center position-relative"
                        style="overflow: hidden;">

                        <!-- Exibir links se houver algum adicionado -->
                        <div v-for="link in $store.getters.links" :key="link.id"
                            class="mt-3 d-flex flex-column align-items-center position-relative">

                            <!-- Input para descrição acima do ícone da rede social -->
                            <input v-if="!adicionandoLink && !editandoLink" type="text"
                                class="form-control position-absolute input-link" style="top: -50px; width: 100%;"
                                placeholder="Você pode escrever aqui" />


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
                                Ir para o link
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
                            Adicionar link
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

                    <!--Inserir videos-->
                    <div
                        class="animate__animated animate__zoomIn card link-card card-video d-flex flex-column align-items-center justify-content-center position-relative">
                        <!-- Ícone de adicionar vídeo (fa-plus) -->
                        <div class="plus-icon position-absolute" v-if="!mostrar_input_video">
                            <i class="fa-solid fa-plus" style="color: black;" @click="mostrarInputVideo"></i>
                        </div>

                        <!-- Ícone de remover vídeo -->
                        <div class="plus-icon position-absolute" v-if="videoUrlIframe && mostrar_video_youtube">
                            <i class="fa-solid fa-trash" @click="() => removerVideo(videoId)"></i>
                        </div>

                        <i v-if="!mostrar_input_video && !mostrar_video_youtube" class="fa-solid fa-video fa-2x"></i>
                        <p v-if="!mostrar_input_video && !mostrar_video_youtube" class="mt-2">Adicionar vídeo</p>

                        <!-- Input para o link do YouTube e botão para confirmar -->
                        <div v-if="mostrar_input_video && !mostrar_video_youtube" class="mt-3">
                            <input v-model="videoUrlInput" class="form-control" type="text"
                                placeholder="Insira o link do vídeo do YouTube" />

                            <!-- Botão success com ícone fa-check -->
                            <button class="btn btn-success mt-3" @click="mostrarVideo">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>

                        <!-- Iframe para exibir o vídeo, será exibido abaixo do card -->
                        <div v-if="videoUrlIframe && mostrar_video_youtube">
                            <iframe :src="videoUrlIframe" width="300px" height="360px" frameborder="0"
                                allowfullscreen></iframe>
                        </div>
                    </div>

                    <!--Inserir localizacao-->
                    <div
                        class="animate__animated animate__zoomIn card link-card card-maps d-flex flex-column align-items-center justify-content-center position-relative">
                        <!-- Ícone de adicionar localização (fa-plus) -->
                        <div class="plus-icon position-absolute" v-if="!mostrar_input_maps">
                            <i class="fa-solid fa-plus" style="color: black;" @click="mostrarInputMaps"></i>
                        </div>

                        <!-- Ícone de remover localização -->
                        <div class="plus-icon position-absolute" v-if="mostrar_maps">
                            <i class="fa-solid fa-trash" @click="removerMaps"></i>
                        </div>

                        <i v-if="!mostrar_input_maps && !mostrar_maps" class="fa-solid fa-map-location-dot fa-2x"></i>
                        <p v-if="!mostrar_input_maps && !mostrar_maps" class="mt-2">Adicionar localização</p>

                        <!-- Input para o link do Google Maps e botão para confirmar -->
                        <div v-if="mostrar_input_maps && !mostrar_maps" class="mt-3">
                            <input v-model="localizacaoInput" class="form-control" type="text"
                                placeholder="Insira a URL de localização do Google Maps" />
                            <button class="btn btn-success mt-3" @click="salvarMapaGoogleMaps">
                                <i class="fa-solid fa-check"></i> Salvar Localização
                            </button>
                        </div>

                        <!-- Botão para abrir o link do Google Maps -->
                        <div v-if="mostrar_maps" class="mt-3">
                            <button class="btn btn-map" @click="abrirMapaGoogleMaps">
                                <i class="fa-solid fa-location-dot"></i> Ver localização
                            </button>
                        </div>
                    </div>

                    <!--Inserir qualquer link-->
                    <div
                        class="animate__animated animate__zoomIn card link-card card-links-livres d-flex flex-column align-items-center justify-content-center position-relative">
                        <div v-for="linkAleatorio in $store.getters.linksAleatorios" :key="linkAleatorio.id"
                            class="mt-3 d-flex flex-column align-items-center position-relative">
                            <i v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio"
                                class="fa-solid fa-link fa-2x"></i>

                            <!-- Input para descrição acima do ícone da rede social -->
                            <input v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio" type="text"
                                class="form-control position-absolute input-link" style="top: -50px; width: 100%;"
                                placeholder="Você pode escrever aqui" />

                            <!-- Deletar link -->
                            <div v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio"
                                @click="deletarLinkAleatorio(linkAleatorio.id)" class="delete-icon"
                                style="position: absolute; top: -10px; right: -15px;">
                                <i class="fa-solid fa-trash"></i>
                            </div>

                            <!-- Editar link -->
                            <div v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio"
                                @click="iniciarEdicaoLinkAleatorio(linkAleatorio)" class="edit-icon"
                                style="position: absolute; top: 30px; right: -15px;">
                                <i class="fa-solid fa-pencil-alt"></i>
                            </div>

                            <button v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio"
                                @click="redirecionarParaLinkAleatorio(linkAleatorio)"
                                class="btn btn-secondary btn-sm mt-2">
                                Ir para o link
                            </button>
                        </div>

                        <div v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio && !$store.getters.linksAleatorios.length"
                            @click="iniciarAdicaoLinkAleatorio" class="plus-icon position-absolute"
                            style="top: 10px; right: 10px;">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>

                        <i v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio && !$store.getters.linksAleatorios.length"
                            class="fa-solid fa-globe fa-2x"></i>
                        <p v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio && !$store.getters.linksAleatorios.length"
                            class="mt-2">Adicionar link</p>

                        <div v-if="adicionandoLinkAleatorio || editandoLinkAleatorio"
                            class="w-100 d-flex flex-column align-items-center">
                            <i v-if="editandoLinkAleatorio" @click="cancelarEdicaoLinkAleatorio"
                                class="mb-3 fa-solid fa-arrow-left" style="cursor: pointer;"></i>
                            <input v-model="novoLinkAleatorio" type="text" class="form-control mt-2"
                                placeholder="Insira o link" />

                            <button @click="editandoLinkAleatorio ? editarLinkAleatorio() : adicionarLinkAleatorio()"
                                :class="editandoLinkAleatorio ? 'btn btn-success mt-2 btn-sm' : 'btn btn-primary mt-2 btn-sm'">
                                <i :class="editandoLinkAleatorio ? 'fa-solid fa-check' : 'fa-solid fa-plus'"
                                    style="color: white;"></i>
                            </button>
                        </div>
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

        <button class="btn btn-light" @click="clearLocalStorage">Limpar Links</button>

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
import { Nota } from '@/interfaces/Nota'
import { Imagem } from '@/interfaces/Imagem'
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
    public imagemPerfilUrl: string | null = null
    public editandoNome = false
    public editandoBio = false
    public bio = '' //biografia
    public nome = ''
    public imagemPerfilSelecionada = false

    // Editar ou inserir links
    public linkId: number | null = null
    public adicionandoLink = false
    public editandoLink = false
    public novoLink = ''
    public salvandoAlteracoes = false

    // Inserir rede social (ex: instagram)
    public redeSocial = ''
    public linkParaRedirecionar: string | null = null // Nova variável para o link a ser redirecionado

    //Link de imagem
    public imagemSelecionada = false
    public imagemUrl: string | null = null
    public imagemId: string | null = null

    //spinner de loading
    public loading = false

    //Link de video
    public videoUrlInput = ''
    public videoUrlIframe: string | null = null
    public mostrar_input_video = false
    public mostrar_video_youtube = false
    public videoId = ''

    //link de maps
    public mostrar_maps = false
    public mostrar_input_maps = false
    public localizacaoInput = ''
    public googleMapsUrl = ''

    //links aleatorios
    private adicionandoLinkAleatorio = false
    private editandoLinkAleatorio = false
    private novoLinkAleatorio = ''
    private linkIdAleatorio: number | null = null

    //nota (textarea)
    public nota = '' // Nota a ser adicionada / editada
    public notaSalva: Nota | null = null
    public editandoNota = false
    public botaoSalvarNota = false

    //texto da imagem
    textoImagem = ''

    gerarId(): number {
        // Acesse os links através do getter do Vuex
        const links: Array<Link> = this.$store.getters.links
        return links.length > 0 ? Math.max(...links.map(link => link.id)) + 1 : 1
    }

    // Iniciar edição do link
    public iniciarAdicaoLink() {
        this.adicionandoLink = true
        this.novoLink = ''
        this.redeSocial = ''
        this.linkParaRedirecionar = ''
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
                const links: Link[] = this.$store.getters.links;
                const linksAleatorios: Link[] = this.$store.getters.linksAleatorios; // Obtém os links aleatórios
                const nota: Nota[] = this.$store.getters.nota;
                const imagens: Imagem[] = this.$store.getters.imagens; // Obtém as imagens do Vuex
                const userId = sessionStorage.getItem('user_id') || this.$store.state.usuario?.id; // ID do usuário autenticado

                // Filtra os links para mostrar apenas os do usuário logado
                const userLinks = links.filter(link => link.usuario_id === userId);
                const userLinksAleatorios = linksAleatorios.filter(link => link.usuario_id === userId); // Filtra links aleatórios
                const userNota = nota.filter(nota => nota.usuario_id === userId);
                const userImagens = imagens.filter(imagem => imagem.usuario_id === userId); // Filtra imagens do usuário

                if (userLinks.length > 0) {
                    console.log("Links do usuário carregados:", userLinks);
                } else {
                    console.log("Nenhum link encontrado para o usuário com ID:", userId);
                }

                if (userLinksAleatorios.length > 0) {
                    console.log("Links aleatórios do usuário carregados:", userLinksAleatorios);
                } else {
                    console.log("Nenhum link aleatório encontrado para o usuário com ID:", userId);
                }

                if (userNota.length > 0) {
                    console.log("Notas do usuário carregados:", userNota);
                } else {
                    console.log("Nenhuma nota encontrada para o usuário com ID:", userId);
                }

                if (userImagens.length > 0) {
                    console.log("Imagens do usuário carregadas:", userImagens);
                } else {
                    console.log("Nenhuma imagem encontrada para o usuário com ID:", userId);
                }

                // Adiciona links do localStorage se necessário
                if (!userLinks.length) {
                    const linksString = localStorage.getItem(`links_${userId}`);
                    const linksFromLocalStorage = JSON.parse(linksString ? linksString : '[]');
                    const userLinksFromLocalStorage: Link[] = linksFromLocalStorage.filter((link: Link) => link.usuario_id === userId);

                    if (userLinksFromLocalStorage.length > 0) {
                        userLinksFromLocalStorage.forEach((link: Link) => {
                            this.$store.commit('ADD_LINK', link);
                        });
                        console.log("Links adicionados do localStorage:", userLinksFromLocalStorage);
                    } else {
                        console.log("Nenhum link encontrado no localStorage para o usuário com ID:", userId);
                    }
                }

                // Adiciona links aleatórios do localStorage se necessário
                if (!userLinksAleatorios.length) {
                    const linksAleatoriosString = localStorage.getItem(`links_aleatorios_${userId}`);
                    const linksAleatoriosFromLocalStorage = JSON.parse(linksAleatoriosString ? linksAleatoriosString : '[]');
                    const userLinksAleatoriosFromLocalStorage: Link[] = linksAleatoriosFromLocalStorage.filter((link: Link) => link.usuario_id === userId);

                    if (userLinksAleatoriosFromLocalStorage.length > 0) {
                        userLinksAleatoriosFromLocalStorage.forEach((link: Link) => {
                            this.$store.commit('ADD_LINK_ALEATORIO', link); // Certifique-se de ter essa mutação
                        });
                        console.log("Links aleatórios adicionados do localStorage:", userLinksAleatoriosFromLocalStorage);
                    } else {
                        console.log("Nenhum link aleatório encontrado no localStorage para o usuário com ID:", userId);
                    }
                }

                // Adiciona notas do localStorage se necessário
                if (!userNota.length) {
                    const notasString = localStorage.getItem(`nota_${userId}`);
                    const notasFromLocalStorage = JSON.parse(notasString ? notasString : '[]');
                    const userNotasFromLocalStorage: Nota[] = notasFromLocalStorage.filter((nota: Nota) => nota.usuario_id === userId);

                    if (userNotasFromLocalStorage.length > 0) {
                        userNotasFromLocalStorage.forEach((nota: Nota) => {
                            this.$store.commit('ADD_NOTA', nota); // Certifique-se de ter essa mutação
                        });
                        console.log('Notas adicionadas do localStorage:', userNotasFromLocalStorage);
                    } else {
                        console.log('Nenhuma nota encontrada no localStorage para o usuário com ID:', userId);
                    }
                }

                // Adiciona imagens do localStorage se necessário
                if (!userImagens.length) {
                    const imagensString = localStorage.getItem(`imagens_${userId}`);
                    const imagensFromLocalStorage = JSON.parse(imagensString ? imagensString : '[]');
                    const userImagensFromLocalStorage: Imagem[] = imagensFromLocalStorage.filter((imagem: Imagem) => imagem.usuario_id === userId);

                    if (userImagensFromLocalStorage.length > 0) {
                        userImagensFromLocalStorage.forEach((imagem: Imagem) => {
                            this.$store.commit('ADD_IMAGEM', imagem); // Certifique-se de ter essa mutação
                        });
                        console.log('Imagens adicionadas do localStorage:', userImagensFromLocalStorage);
                    } else {
                        console.log('Nenhuma imagem encontrada no localStorage para o usuário com ID:', userId);
                    }
                }

                // Aqui, pegue a nota mais recente ou a nota que deseja exibir
                const notaSalva = this.$store.getters.nota.find((n: Nota) => n.usuario_id === userId);
                if (notaSalva) {
                    this.notaSalva = notaSalva; // Atribua a nota carregada à variável notaSalva
                    this.nota = notaSalva.nota; // Supondo que a propriedade com o texto da nota seja `nota`
                }

                // Chama a função para carregar notas existentes
                this.carregarNotasExistentes(userId); // Chama a função para carregar notas

                // Carrega a imagem do usuário e o vídeo existente
                this.carregarImagemExistente(userId);
                this.carregarVideoExistente(userId);
                this.carregarMapaExistente(userId);
                this.carregarTextoImagemExistente(userId);
            })
            .catch((error: any) => {
                console.error('Erro ao carregar links:', error);
            });
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

        // Verifica se o novo link é válido
        const regex = /^(ftp|http|https):\/\/[^ "]+$/
        if (this.novoLink.trim() === '' || !regex.test(this.novoLink)) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido. Tente novamente.', 'alert-error')
            return
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

    //detectar rede social
    public detectarRedeSocial(url: string): string | null {
        if (/https?:\/\/(www\.)?instagram\.com\/[^/]+/.test(url)) {
            return 'instagram'
        } else if (/https?:\/\/(www\.)?github\.com\/[^/]+/.test(url)) {
            return 'github'
        } else if (/https?:\/\/(www\.)?linkedin\.com\/in\/[^/]+/.test(url)) {
            return 'linkedin'
        } else if (/https?:\/\/(www\.)?whatsapp\.com\/[^/]+/.test(url) || /https?:\/\/wa\.me\/[^/]+/.test(url) || /https?:\/\/wa\.me\/\d+\?text=.*/.test(url)) {
            return 'whatsapp' // Adicionando suporte para wa.me
        } else if (/https?:\/\/(www\.)?pix\.br\/[^/]+/.test(url)) {
            return 'pix'
        } else if (/https?:\/\/(www\.)?twitter\.com\/[^/]+/.test(url)) {
            return 'twitter'
        } else if (/https?:\/\/(www\.)?tiktok\.com\/[^/]+/.test(url)) {
            return 'tiktok'
        } else if (/https?:\/\/(open\.)?spotify\.com\/[^/]+/.test(url)) {
            return 'spotify' // Atualizado para reconhecer links do Spotify
        } else if (/https?:\/\/(www\.)?youtube\.com\/channel\/[^/]+/.test(url) || /https?:\/\/(www\.)?youtube\.com\/[^/]+/.test(url)) {
            return 'youtube'
        } else if (/https?:\/\/(www\.)?vimeo\.com\/[^/]+/.test(url)) {
            return 'vimeo'
        } else if (/https?:\/\/(www\.)?substack\.com\/[^/]+/.test(url)) {
            return 'substack'
        } else if (/https?:\/\/(www\.)?medium\.com\/[^/]+/.test(url)) {
            return 'medium'
        } else if (/https?:\/\/(www\.)?music\.apple\.com\/[^/]+/.test(url)) {
            return 'apple_music'
        } else if (/https?:\/\/(www\.)?soundcloud\.com\/[^/]+/.test(url)) {
            return 'soundcloud'
        } else if (/https?:\/\/(www\.)?docs\.google\.com\/[^/]+/.test(url)) {
            return 'google_docs'
        } else if (/https?:\/\/(www\.)?notion\.so\/[^/]+/.test(url)) {
            return 'notion'
        } else if (/https?:\/\/(www\.)?calendly\.com\/[^/]+/.test(url)) {
            return 'calendly'
        } else if (/https?:\/\/(www\.)?producthunt\.com\/[^/]+/.test(url)) {
            return 'product_hunt'
        } else if (/https?:\/\/(www\.)?amazon\.com\/[^/]+/.test(url)) {
            return 'amazon'
        } else if (/https?:\/\/(www\.)?calendar\.google\.com\/[^/]+/.test(url)) {
            return 'google_calendar'
        } else if (/https?:\/\/(www\.)?patreon\.com\/[^/]+/.test(url)) {
            return 'patreon'
        } else if (/https?:\/\/(www\.)?twitch\.tv\/[^/]+/.test(url)) {
            return 'twitch'
        } else if (/https?:\/\/(www\.)?paypal\.com\/[^/]+/.test(url)) {
            return 'paypal'
        } else if (/https?:\/\/(www\.)?kickstarter\.com\/[^/]+/.test(url)) {
            return 'kickstarter'
        } else if (/https?:\/\/(www\.)?shopify\.com\/[^/]+/.test(url)) {
            return 'shopify'
        } else if (/https?:\/\/(www\.)?gumroad\.com\/[^/]+/.test(url)) {
            return 'gumroad'
        } else if (/https?:\/\/(www\.)?eventbrite\.com\/[^/]+/.test(url)) {
            return 'eventbrite'
        } else if (/https?:\/\/(www\.)?discord\.com\/[^/]+/.test(url)) {
            return 'discord'
        } else if (/https?:\/\/(www\.)?reddit\.com\/r\/[^/]+/.test(url)) {
            return 'reddit'
        } else {
            return 'google' // Retorna 'globe' se não for reconhecida
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
        const mensagem = sessionStorage.getItem('mensagem_alerta')
        if (mensagem) {
            const alertData = JSON.parse(mensagem)
            this.mensagem_alerta = alertData // Define a mensagem de alerta
            sessionStorage.removeItem('mensagem_alerta') // Remove a mensagem após exibi-la

            this.mostrarMensagemAlerta(alertData.icone, alertData.mensagem, alertData.status)
        }

        // Recupera o usuário, email e ID do sessionStorage
        this.usuario = this.$store.getters.usuario?.usuario || sessionStorage.getItem('user_name') || ''
        this.email = this.$store.getters.usuario?.email || sessionStorage.getItem('user_email') || ''
        const userId = sessionStorage.getItem('user_id')
        console.log('User ID:', userId)

        // Carregar os dados do perfil do localStorage
        const perfilData = localStorage.getItem(`perfil_${userId}`)
        if (perfilData) {
            const perfil = JSON.parse(perfilData)
            this.nome = perfil.nome || ''
            this.bio = perfil.descricao || ''
            this.selectedImage = perfil.foto_perfil || null

            // Atualiza o Vuex com os dados do perfil carregados
            this.$store.commit('UPDATE_PERFIL', perfil)
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

    // Método para carregar a imagem de perfil
    public carregarImagemPerfil(event: Event) {
        const input = event.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            const file = input.files[0]
            const reader = new FileReader()

            // Converter a imagem para Base64
            reader.onload = (e) => {
                this.selectedImage = e.target?.result as string // Atualiza o src da imagem
                this.imagemPerfilSelecionada = true // Desabilita o input após seleção da imagem

                console.log("Imagem selecionada:", this.selectedImage);

                this.salvarPerfil()
            }

            reader.readAsDataURL(file) // Lê o arquivo como URL
        }
    }

    //salvar perfil
    public salvarPerfil() {
        this.salvandoAlteracoes = true; // Ativar a propriedade ao iniciar o salvamento

        // Acessa o ID do usuário do Vuex ou sessionStorage
        const userId = this.$store.getters.usuario?.id || sessionStorage.getItem('user_id');

        console.log("ID do usuário:", userId); // Verifica se o ID está correto

        if (!userId) {
            console.error("ID do usuário não encontrado."); // Log se o ID não estiver disponível
            this.salvandoAlteracoes = false; // Desativar antes de retornar
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

        // Adiciona a imagem se ela for válida
        if (this.selectedImage && /^data:image\/[a-zA-Z]+;base64,/.test(this.selectedImage)) {
            perfil.foto_perfil = this.selectedImage; // Imagem em Base64
        } else {
            console.warn('Imagem não está em formato Base64 ou não foi selecionada.');
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
                })
                .finally(() => {
                    this.salvandoAlteracoes = false; // Desativar ao finalizar a requisição
                });
        } else {
            console.warn('Nenhum dado para salvar.');
            this.salvandoAlteracoes = false; // Desativar se não houver dados
        }
    }

    // Método para remover a imagem de perfil
    public removerImagemPerfil() {
        const userId = this.$store.getters.usuario?.id || sessionStorage.getItem('user_id')

        if (!userId) {
            console.error("ID do usuário não encontrado.")
            return
        }

        axios.post('http://localhost/Projetos/bioohub/backend/api/perfil.php', {
            usuario_id: userId,
            acao: 'removerImagemPerfil',
        })
            .then(response => {
                console.log('Imagem de perfil removida com sucesso:', response.data)

                this.selectedImage = null
                this.imagemPerfilUrl = null
                this.imagemPerfilSelecionada = false // Agora permite selecionar uma nova imagem

                this.$store.commit('UPDATE_PERFIL', { usuario_id: userId, foto_perfil: null })

                const perfilItem = localStorage.getItem(`perfil_${userId}`)
                if (perfilItem) {
                    const perfil = JSON.parse(perfilItem)
                    if (perfil && perfil.foto_perfil) {
                        perfil.foto_perfil = null
                        localStorage.setItem(`perfil_${userId}`, JSON.stringify(perfil))
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao remover a imagem de perfil:', error.response?.data || error.message)
            })
    }

    // Alterna o estado de edição do nome
    public editarNome() {
        this.editandoNome = true
    }

    // Alterna o estado de edição da bio
    public editarBio() {
        this.editandoBio = true
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

    // Função para abrir o seletor de arquivo
    public abrirSeletorImagem(): void {
        const inputFile = this.$refs.fileInput as HTMLInputElement
        inputFile.click()
    }

    //carregar imagem
    public carregarImagem(event: Event): void {
        const input = event.target as HTMLInputElement;
        const userId = sessionStorage.getItem('user_id');

        if (input.files && input.files[0] && userId) {
            const file = input.files[0];
            const tiposPermitidos = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

            if (!tiposPermitidos.includes(file.type)) {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Informe um arquivo válido: PNG, JPG ou SVG', 'alert-error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.imagemUrl = e.target?.result as string; // Aqui você está armazenando a URL da imagem
                this.imagemSelecionada = true;
            };

            reader.readAsDataURL(file); // Lê a imagem como uma URL de dados

            this.loading = true;

            // Upload para o backend
            const formData = new FormData();
            formData.append('imagem', file);
            formData.append('usuario_id', userId);

            axios.post('http://localhost/Projetos/bioohub/backend/api/imagens.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log('Resposta do servidor:', response.data); // Verifique a resposta

                    this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');

                    // Verifica se imagemUrl não é null antes de criar novaImagem
                    if (!this.imagemUrl) {
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'URL da imagem não está disponível.', 'alert-error');
                        return; // Sai da função se imagemUrl for null
                    }

                    // Armazena a imagem no Vuex
                    const novaImagem: Imagem = {
                        id: Number(response.data.imagem.id), // Acesse o ID aqui
                        imagem: this.imagemUrl,
                        texto: this.textoImagem || null,
                        usuario_id: userId
                    };

                    this.$store.dispatch('addImagem', novaImagem); // Armazena a imagem no Vuex

                    // Armazena a imagem no localStorage como objeto
                    localStorage.setItem(`imagem_${novaImagem.id}`, JSON.stringify(novaImagem)); // Use novaImagem.id
                    this.imagemId = novaImagem.id.toString(); // Armazena o ID da imagem na propriedade imagemId
                })

                .catch(error => {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao enviar imagem', 'alert-error');
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }

    // Método para remover a imagem
    public async removerImagem(): Promise<void> {
        const userId = sessionStorage.getItem('user_id');
        const imagemId = this.$store.state.imagens.find((imagem: Imagem) => imagem.imagem === this.imagemUrl)?.id;

        // Verificação do ID do usuário e ID da imagem
        if (!userId) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'ID do usuário não encontrado', 'alert-error');
            return;
        }

        if (!imagemId) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Imagem não encontrada', 'alert-error');
            return;
        }

        try {
            const response = await axios.delete('http://localhost/Projetos/bioohub/backend/api/imagens.php', {
                data: { usuario_id: userId, id: imagemId }
            });

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check', response.data.message, 'alert-sucesso');
                this.imagemSelecionada = false;
                this.imagemUrl = null;

                // Remove a imagem do localStorage
                localStorage.removeItem(`imagem_${imagemId}`); // Ajustado para usar imagemId
                this.$store.dispatch('deleteImagem', imagemId); // Remover do Vuex
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover imagem', 'alert-error');
            console.error('Erro capturado:', error);
        }
    }

    public carregarImagemExistente(userId: string | null): void {
        if (userId) {
            axios.get(`http://localhost/Projetos/bioohub/backend/api/imagens.php?usuario_id=${userId}`)
                .then(response => {
                    const imagem: Imagem = response.data.imagem; // Assumindo que o backend retorna a imagem no formato correto
                    if (imagem) {
                        this.imagemUrl = imagem.imagem as string; // Armazena a URL da imagem
                        this.imagemSelecionada = true;
                        this.textoImagem = imagem.texto || ''; // Define o texto associado

                        // Armazena a imagem no localStorage
                        if (this.imagemUrl) { // Verifica se imagemUrl não é null ou undefined
                            localStorage.setItem(`imagem_${imagem.id}`, JSON.stringify(imagem)); // Armazena a imagem como objeto no localStorage
                        }

                        // Armazena a imagem no Vuex
                        this.$store.dispatch('addImagem', {
                            id: Number(imagem.id), // Adiciona o ID como número
                            imagem: this.imagemUrl, // Armazena a URL da imagem
                            texto: this.textoImagem, // Texto associado
                            usuario_id: userId // ID do usuário
                        });

                        this.imagemId = imagem.id.toString(); // Converte o ID para string
                    } else {
                        this.recuperarImagemLocalStorage(userId); // Chama função para recuperar imagem do localStorage
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar a imagem do backend:', error);
                    this.recuperarImagemLocalStorage(userId); // Chama função para recuperar imagem do localStorage
                });
        }
    }


    // Função auxiliar para recuperar a imagem do localStorage
    public recuperarImagemLocalStorage(userId: string | null): void {
        if (userId) {
            const imagemData = localStorage.getItem(`imagem_${userId}`);
            if (imagemData) {
                const imagem = JSON.parse(imagemData); // Converte o JSON em objeto
                this.imagemUrl = imagem.imagem; // Carrega a URL da imagem do localStorage
                this.imagemId = imagem.id; // Carrega o ID da imagem do localStorage
                this.imagemSelecionada = true; // Marca que uma imagem foi selecionada
            }
        }
    }


    // Função para mostrar o vídeo no iframe
    public mostrarVideo() {
        const videoId = this.extrairIdDoYoutube(this.videoUrlInput)
        const userId = sessionStorage.getItem('user_id')

        if (videoId && userId) {
            this.videoUrlIframe = `https://www.youtube.com/embed/${videoId}`
            this.mostrar_video_youtube = true

            // Verificando o conteúdo antes de enviar
            console.log("Enviando requisição com os seguintes dados:", {
                usuario_id: userId,
                video_url: this.videoUrlInput
            })

            // Requisição para adicionar o vídeo no banco de dados
            axios.post('http://localhost/Projetos/bioohub/backend/api/videos.php', {
                usuario_id: userId,
                video_url: this.videoUrlInput
            })
                .then(response => {
                    console.log("Resposta recebida do servidor:", response.data)
                    if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                        // Exibindo alerta de erro se a resposta indicar erro
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error')
                    } else {
                        // Atualizando o Vuex com o URL do vídeo
                        this.$store.commit('SET_VIDEO_URL', this.videoUrlInput)

                        //salvar video no localStorage
                        const userId = sessionStorage.getItem('user_id')
                        localStorage.setItem(`videoUrl_${userId}`, this.videoUrlInput)

                        // Exibindo alerta de sucesso
                        this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso')
                    }
                })
                .catch(error => {
                    console.error("Erro ao adicionar o vídeo:", error)
                    // Exibindo alerta de erro genérico em caso de falha na requisição
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar o vídeo. Tente novamente mais tarde.', 'alert-error')
                })
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido. Por favor, insira um link de vídeo do YouTube válido.', 'alert-error')
        }
    }

    //remover video do youtube
    public removerVideo(videoId: string) {
        console.log('Removendo vídeo...');

        const userId = sessionStorage.getItem('user_id') || this.$store.state.usuario?.id;

        // Requisição para remover o vídeo do banco de dados
        axios.delete('http://localhost/Projetos/bioohub/backend/api/videos.php', {
            data: {
                usuario_id: userId,
                video_id: videoId // Enviando o ID do vídeo a ser removido
            }
        })
            .then(response => {
                if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                    // Exibindo alerta de erro se a resposta indicar erro
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error');
                } else {
                    // Limpando o estado do vídeo no Vuex
                    this.$store.commit('CLEAR_VIDEO_URL');

                    // Remove o vídeo do localStorage
                    localStorage.removeItem(`videoUrl_${userId}`); // Usando a chave correta

                    // Limpando inputs e link do youtube após sucesso
                    this.videoUrlIframe = null;
                    this.mostrar_video_youtube = false;
                    this.mostrar_input_video = false;

                    // Exibindo alerta de sucesso
                    this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');
                }
            })
            .catch(error => {
                console.error("Erro ao remover o vídeo:", error);
                // Exibindo alerta de erro genérico em caso de falha na requisição
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover o vídeo. Tente novamente mais tarde.', 'alert-error');
            });
    }

    // Carregar vídeo do YouTube existente
    public carregarVideoExistente(userId: string) {
        // Primeiro tenta pegar do Vuex
        const videoUrl = this.$store.state.videoUrl;

        if (videoUrl) {
            // Se houver um vídeo URL no Vuex, exibe no iframe
            const videoId = this.extrairIdDoYoutube(videoUrl);
            if (videoId) {
                this.videoUrlIframe = `https://www.youtube.com/embed/${videoId}`;
                this.mostrar_video_youtube = true;
                console.log(`Vídeo carregado para o usuário com ID: ${userId}`);
            }
        } else {
            // Se não tiver no Vuex, tenta pegar do localStorage
            const videoUrlFromLocalStorage = localStorage.getItem(`videoUrl_${userId}`);
            if (videoUrlFromLocalStorage) {
                const videoId = this.extrairIdDoYoutube(videoUrlFromLocalStorage);
                if (videoId) {
                    this.videoUrlIframe = `https://www.youtube.com/embed/${videoId}`;
                    this.mostrar_video_youtube = true;
                    console.log(`Vídeo carregado do localStorage para o usuário com ID: ${userId}`);
                }
            } else {
                // Se não houver vídeo no Vuex nem no localStorage, certifique-se de que não está mostrando vídeo
                this.videoUrlIframe = null;
                this.mostrar_video_youtube = false;
            }
        }
    }

    // Função para extrair o ID do vídeo do link do YouTube
    public extrairIdDoYoutube(url: string): string | null {
        const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
    }

    //mostrar input de inserir video do youtube
    public mostrarInputVideo() {
        this.mostrar_input_video = true
    }

    //armazenar o URL do Google Maps no input
    public salvarMapaGoogleMaps() {
        // Verifica se o input não está vazio
        if (this.localizacaoInput) {
            // Usa o link fornecido no input e apenas armazena o valor
            this.googleMapsUrl = this.localizacaoInput

            // Marca que o mapa foi configurado, mas ainda não abriu
            this.mostrar_maps = true
            console.log(`URL do Google Maps armazenada: ${this.googleMapsUrl}`)

            // Envia o URL do Google Maps para o servidor
            const userId = sessionStorage.getItem('user_id')
            if (userId) {
                axios.post('http://localhost/Projetos/bioohub/backend/api/maps.php', {
                    usuario_id: userId,
                    mapa_url: this.googleMapsUrl
                })
                    .then(response => {
                        console.log("Resposta recebida do servidor:", response.data)
                        if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                            // Exibindo alerta de erro se a resposta indicar erro
                            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error')
                        } else {
                            // Exibindo alerta de sucesso
                            this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso')

                            // Salva o mapa no localStorage
                            localStorage.setItem(`mapa_${userId}`, this.googleMapsUrl)

                            // Atualiza o Vuex com a URL do mapa
                            this.$store.commit('SET_MAPA_URL', this.googleMapsUrl)
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao salvar o mapa:", error)
                        // Exibindo alerta de erro genérico em caso de falha na requisição
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao salvar o mapa. Tente novamente mais tarde.', 'alert-error')
                    })
            }
        } else {
            // Exibe uma mensagem de erro caso o input esteja vazio
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, insira uma URL válida de localização.', 'alert-error')
        }
    }

    //remover o mapa
    public removerMaps() {
        this.mostrar_maps = false
        this.localizacaoInput = ''
        this.googleMapsUrl = ''
        this.mostrar_input_maps = false
        console.log('Mapa do Google Maps removido')

        const userId = sessionStorage.getItem('user_id')
        if (userId) {
            // Requisição para remover o mapa do banco de dados
            axios.delete('http://localhost/Projetos/bioohub/backend/api/maps.php', {
                data: {
                    usuario_id: userId
                }
            })
                .then(response => {
                    console.log("Resposta recebida do servidor:", response.data)
                    if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                        // Exibindo alerta de erro se a resposta indicar erro
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error')
                    } else {
                        // Exibindo alerta de sucesso
                        this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso')

                        // Limpa o mapa no localStorage
                        localStorage.removeItem(`mapa_${userId}`)

                        // Limpa o Vuex
                        this.$store.commit('CLEAR_MAPA_URL')
                    }
                })
                .catch(error => {
                    console.error("Erro ao remover o mapa:", error)
                    // Exibindo alerta de erro genérico em caso de falha na requisição
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover o mapa. Tente novamente mais tarde.', 'alert-error')
                })
        }
    }

    // Função para abrir o Google Maps (quando o botão é clicado)
    public abrirMapaGoogleMaps() {
        // Verifica se o URL está armazenado
        if (this.googleMapsUrl) {
            // Abre o mapa do Google Maps em uma nova aba
            window.open(this.googleMapsUrl, '_blank')
            console.log(`Mapa do Google Maps aberto em uma nova aba: ${this.googleMapsUrl}`)
        } else {
            // Exibe uma mensagem de erro caso o URL não tenha sido salvo
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, configure uma localização primeiro.', 'alert-error')
        }
    }

    //carregar mapa existente
    public carregarMapaExistente(userId: string) {
        // Primeiro tenta pegar o mapa do Vuex
        const mapaUrl = this.$store.state.mapaUrl

        if (mapaUrl) {
            // Se houver uma URL do mapa no Vuex, exibe o mapa
            this.googleMapsUrl = mapaUrl
            this.mostrar_maps = true
            console.log(`Mapa carregado para o usuário com ID: ${userId}`)
        } else {
            // Se não tiver no Vuex, tenta pegar do localStorage
            const mapaUrlFromLocalStorage = localStorage.getItem(`mapa_${userId}`)
            if (mapaUrlFromLocalStorage) {
                // Se encontrar uma URL no localStorage, exibe o mapa
                this.googleMapsUrl = mapaUrlFromLocalStorage
                this.mostrar_maps = true
                console.log(`Mapa carregado do localStorage para o usuário com ID: ${userId}`)
            }
        }
    }

    // Função para mostrar o input de inserir o mapa
    public mostrarInputMaps() {
        this.mostrar_input_maps = true
    }

    // Iniciar adição de link aleatorio
    public iniciarAdicaoLinkAleatorio() {
        this.adicionandoLinkAleatorio = true
        this.novoLinkAleatorio = ''
    }

    // Iniciar edição do link aleatorio
    public iniciarEdicaoLinkAleatorio(linkAleatorio: any) {
        this.editandoLinkAleatorio = true
        this.novoLinkAleatorio = linkAleatorio.url // Preenche o campo com o link atual
        this.linkIdAleatorio = linkAleatorio.id // Armazena o ID do link que está sendo editado
    }

    public async adicionarLinkAleatorio() { // Adicionar link aleatorio
        const regex = /^(ftp|http|https):\/\/[^ "]+$/
        if (this.novoLinkAleatorio.trim() === '' || !regex.test(this.novoLinkAleatorio)) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido, tente novamente', 'alert-error')
            return
        }

        const dados = {
            url: this.novoLinkAleatorio,
            usuario_id: sessionStorage.getItem('user_id')
        }

        console.log('Adicionando link:', dados)

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/adicionar_links_aleatorios.php', dados)
            if (response.data.success) {
                const novoLinkComId = {
                    url: this.novoLinkAleatorio,
                    id: response.data.link.id, // Supondo que o ID é retornado
                    usuario_id: dados.usuario_id
                }

                this.$store.commit('ADD_LINK_ALEATORIO', novoLinkComId)
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link adicionado com sucesso!', 'alert-sucesso') // Alerta de sucesso
                this.adicionandoLinkAleatorio = false

                // Salva os links no localStorage
                this.salvarLinksAleatoriosNoLocalStorage(dados.usuario_id)
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
            console.error('Erro ao adicionar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar link', 'alert-error')
        }
    }

    //salvar links aleatorios no localStorage
    private salvarLinksAleatoriosNoLocalStorage(usuarioId: string | null) {
        if (usuarioId) {
            const linksAleatorios = this.$store.getters.linksAleatorios // Obtém os links aleatórios do Vuex
            console.log('Links a serem salvos no LocalStorage:', JSON.parse(JSON.stringify(linksAleatorios))) // Converte para JSON para visualização
            localStorage.setItem(`links_aleatorios_${usuarioId}`, JSON.stringify(linksAleatorios)) // Salva no localStorage
        } else {
            console.error('Usuário ID é null.')
        }
    }

    //editar link aleatorio
    public async editarLinkAleatorio() {
        const dados = {
            id: this.linkIdAleatorio,
            url: this.novoLinkAleatorio,
            usuario_id: sessionStorage.getItem('user_id')
        }

        try {
            const response = await axios.put('http://localhost/Projetos/bioohub/backend/api/editar_links_aleatorios.php', dados)
            if (response.data.success) {
                const linkEditado = {
                    url: this.novoLinkAleatorio,
                    id: this.linkIdAleatorio,
                    usuario_id: dados.usuario_id
                }

                this.$store.commit('UPDATE_LINK_ALEATORIO', linkEditado)
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link atualizado com sucesso!', 'alert-sucesso') // Alerta de sucesso
                this.editandoLinkAleatorio = false

                // Salva os links no localStorage
                this.salvarLinksAleatoriosNoLocalStorage(dados.usuario_id)
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
            console.error('Erro ao editar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao editar link.', 'alert-error')
        }
    }

    // Deletar link aleatorio
    public async deletarLinkAleatorio(id: number) {
        const dados = {
            id: id,
            usuario_id: sessionStorage.getItem('user_id')
        }

        try {
            const response = await axios.delete('http://localhost/Projetos/bioohub/backend/api/deletar_links_aleatorios.php', { data: dados })
            if (response.data.success) {
                this.$store.commit('DELETE_LINK_ALEATORIO', id)
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link removido com sucesso!', 'alert-sucesso') // Alerta de sucesso

                // Salva os links no localStorage
                this.salvarLinksAleatoriosNoLocalStorage(dados.usuario_id)
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
            console.error('Erro ao deletar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover link', 'alert-error')
        }
    }

    //redirecionar para link aleatorio
    public redirecionarParaLinkAleatorio(link: Link) {
        if (link && link.url) {
            window.open(link.url, '_blank') // Abre o link em uma nova aba
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link não encontrado.', 'alert-error')
        }
    }

    //cancelar edicao link aleatorio
    public cancelarEdicaoLinkAleatorio() {
        this.editandoLinkAleatorio = false
        this.novoLinkAleatorio = ''
    }

    // Estilo para o textarea
    get textareaStyle() {
        return {
            border: '2px dotted #CCC',
            borderRadius: '5px',
            padding: '10px',
            width: '400px'
        };
    }

    // Salvar nota
    public async salvarNota() {
        const userId = sessionStorage.getItem('user_id');

        const notaObj = {
            usuario_id: userId,
            nota: this.nota
        };

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/adicionar_nota.php', notaObj);
            console.log('Resposta do servidor:', response.data);

            if (response.data.success) {
                const novaNota: Nota = {
                    id: Number(response.data.nota.id),
                    usuario_id: userId!,
                    nota: this.nota
                };

                this.$store.commit('ADD_NOTA', novaNota);
                this.atualizarNotasLocalStorage(userId); // Atualiza localStorage imediatamente

                // Atualiza a interface
                this.notaSalva = novaNota;
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Nota adicionada com sucesso!', 'alert-sucesso');
                this.nota = '';
                this.botaoSalvarNota = false;
                this.editandoNota = false;
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
            }
        } catch (error) {
            console.error('Erro ao salvar nota:', error);
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao salvar a nota', 'alert-error');
        }
    }

    // Editar nota
    public async editarNota() {
        if (this.notaSalva) {
            this.nota = this.notaSalva.nota;
            this.editandoNota = true;
            this.botaoSalvarNota = true;
        } else {
            console.error('Nota não definida para edição.');
        }
    }

    // Remover a nota
    public async removerNota(id: number) {
        if (!id) {
            console.error('ID da nota não definido para remoção.');
            return;
        }

        const usuarioId = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/remover_nota.php', {
                id: id,
                usuario_id: usuarioId
            });
            if (response.data.success) {
                this.$store.dispatch('deleteNota', id);
                this.atualizarNotasLocalStorage(usuarioId); // Atualiza localStorage imediatamente

                this.mostrarMensagemAlerta('fa-solid fa-check', response.data.message, 'alert-sucesso');

                // Limpar a interface se necessário
                this.notaSalva = null;
                this.nota = '';
                this.botaoSalvarNota = false;
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover nota.', 'alert-error');
            console.error('Erro ao remover a nota:', error);
        }
    }

    // Salvar edição da nota
    public async salvarEdicaoNota() {
        const userId = sessionStorage.getItem('user_id');

        if (!this.notaSalva) {
            console.error('Nota não definida para edição.');
            return;
        }

        const notaEditada: Nota = {
            id: this.notaSalva.id,
            usuario_id: userId!,
            nota: this.nota
        };

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/editar_nota.php', notaEditada);
            if (response.data.success) {
                this.$store.commit('UPDATE_NOTA', notaEditada);
                this.notaSalva = notaEditada;
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Nota editada com sucesso!', 'alert-sucesso');

                // Atualiza o localStorage
                this.atualizarNotasLocalStorage(userId);

                this.nota = '';
                this.botaoSalvarNota = false;
                this.editandoNota = false;
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
            }
        } catch (error) {
            console.error('Erro ao editar a nota:', error);
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao salvar alterações', 'alert-error');
        }
    }

    private atualizarNotasLocalStorage(usuarioId: string | null) {
        if (usuarioId) {
            const notas = this.$store.state.nota;
            console.log('Notas a serem salvas no LocalStorage:', JSON.parse(JSON.stringify(notas)));
            localStorage.setItem(`nota_${usuarioId}`, JSON.stringify(notas));
        } else {
            console.error('Usuário ID é null.');
        }
    }

    //carregar notas existentes
    public carregarNotasExistentes(userId: string) {
        // Primeiro tenta pegar as notas do Vuex
        const carregarNotas = this.$store.state.nota;

        if (carregarNotas && carregarNotas.length > 0) {
            // Se houver notas no Vuex, exibe as notas
            this.nota = carregarNotas;
            console.log(`Notas carregadas do Vuex para o usuário com ID: ${userId}`);
        } else {
            // Se não tiver no Vuex, tenta pegar do localStorage
            const notasDoLocalStorage = localStorage.getItem(`nota_${userId}`);
            if (notasDoLocalStorage) {
                // Se encontrar notas no localStorage, exibe as notas
                this.nota = JSON.parse(notasDoLocalStorage);
                console.log(`Notas carregadas do localStorage para o usuário com ID: ${userId}`);
            }
        }
    }

    // salvar texto da imagem
    public async salvarTextoImagem(id: number) {
        try {
            if (this.textoImagem.trim() === '') {
                // Se o texto estiver vazio, deletar o texto do banco
                await this.deletarTextoImagem(id);
            } else {
                // Se houver texto, salvar ou atualizar no banco
                await this.atualizarTextoImagem(id);
            }

            // Persistir o texto no Vuex
            this.$store.commit('UPDATE_TEXTO_IMAGEM', { texto: this.textoImagem, id });

            // Armazenar no localStorage para persistir após F5
            localStorage.setItem(`textoImagem_${sessionStorage.getItem('user_id')}`, this.textoImagem);

        } catch (error) {
            console.error('Erro ao salvar o texto:', error);
        }
    }

    // Atualizar texto da imagem
    public async atualizarTextoImagem(id: number) {
        const usuarioId = sessionStorage.getItem('user_id');
        const payload = {
            usuario_id: usuarioId,
            texto: this.textoImagem,
            id: id, // Adicionando o ID da imagem ao payload
        };

        console.log('Atualizando texto da imagem com payload:', payload); // Log do payload

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/atualizar_texto_imagem.php', payload);
            console.log('Resposta do backend ao atualizar texto:', response.data);

            // Se a atualização no backend for bem-sucedida
            if (response.data.success) {
                console.log('Texto da imagem atualizado com sucesso!');
            } else {
                console.log('Falha ao atualizar texto:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao atualizar o texto da imagem:', error);
        }
    }

    // Deletar texto da imagem
    public async deletarTextoImagem(id: number): Promise<void> {
        const usuarioId = sessionStorage.getItem('user_id');
        const payload = {
            usuario_id: usuarioId,
            id: id, // Adicionando o ID da imagem ao payload
        };

        console.log('Deletando texto da imagem com payload:', payload); // Log do payload

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/deletar_texto_imagem.php', payload);
            console.log('Resposta do backend ao deletar texto:', response.data);

            // Verifica se a resposta foi bem-sucedida
            if (response.data.success) {
                console.log('Texto deletado com sucesso!');

                // Remover do Vuex
                this.$store.commit('DELETE_TEXTO_IMAGEM', id);
                console.log('Texto removido do Vuex para o ID:', id);

                // Remover do localStorage
                localStorage.removeItem(`textoImagem_${usuarioId}`);
                console.log('Texto removido do localStorage para o usuário:', usuarioId);
            } else {
                console.log('Falha ao deletar texto:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao deletar o texto da imagem:', error);
        }
    }

    // Carregar texto da imagem existente
    public carregarTextoImagemExistente(userId: string | null): void {
        if (userId) {
            console.log('Carregando texto da imagem para o usuário:', userId); // Log do usuário

            // Tenta carregar o texto da API
            axios.get(`http://localhost/Projetos/bioohub/backend/api/imagens.php?usuario_id=${userId}`)
                .then(response => {
                    console.log('Resposta do backend ao carregar texto:', response.data); // Log da resposta

                    if (response.data.texto) {
                        this.textoImagem = response.data.texto; // Define o texto retornado do backend
                        // Persistir no Vuex
                        this.$store.commit('UPDATE_TEXTO_IMAGEM', { texto: this.textoImagem, id: response.data.id });
                        // Armazenar no localStorage para persistir após F5
                        localStorage.setItem(`textoImagem_${userId}`, this.textoImagem);
                        console.log('Texto carregado do backend e armazenado no localStorage');
                    } else {
                        // Carregar do localStorage se não houver texto no backend
                        const textoLocalStorage = localStorage.getItem(`textoImagem_${userId}`);
                        if (textoLocalStorage) {
                            this.textoImagem = textoLocalStorage;
                            // Persistir no Vuex
                            this.$store.commit('UPDATE_TEXTO_IMAGEM', { texto: this.textoImagem, id: userId }); // Usar userId aqui
                            console.log('Texto carregado do localStorage');
                        } else {
                            console.log('Nenhum texto encontrado no backend ou localStorage');
                        }
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar o texto do backend:', error);
                    // Carregar do localStorage se houver erro no backend
                    const textoLocalStorage = localStorage.getItem(`textoImagem_${userId}`);
                    if (textoLocalStorage) {
                        this.textoImagem = textoLocalStorage;
                        // Persistir no Vuex
                        this.$store.commit('UPDATE_TEXTO_IMAGEM', { texto: this.textoImagem, id: userId }); // Usar userId aqui
                        console.log('Texto carregado do localStorage após falha no backend');
                    }
                });
        } else {
            console.log('ID do usuário é nulo ou indefinido');
        }
    }


    // Mostrar mensagem de alerta
    private mostrarMensagemAlerta(icone: string, mensagem: string, status: string) {
        this.mensagem_alerta = { icone, mensagem, status }
        setTimeout(() => {
            this.mensagem_alerta = null
        }, 5000)
    }

    //caso precise limpar localStorage
    clearLocalStorage() {
        const userId = sessionStorage.getItem('user_id'); // Pega o ID do usuário atual
        if (userId) {
            // Limpa as notas no localStorage
            //localStorage.removeItem(`nota_${userId}`); // Ajuste a chave conforme necessário

            // Limpa os textos das imagens no localStorage
            localStorage.removeItem(`textoImagem_${userId}`); // Remove o texto da imagem

            // Limpa as imagens no localStorage (adicionando a remoção da imagem)
            localStorage.removeItem(`imagem_${userId}`); // Remove a imagem

            // Limpa as notas no Vuex
            //this.$store.commit('CLEAR_NOTA'); // Você deve ter uma mutação para limpar as notas

            //console.log('localStorage das notas, textos das imagens e imagens foi limpo.');
        }

        // Adicionando limpeza do localStorage para o ID 1
        const fixedUserId = '1'; // ID fixo que você quer limpar
        localStorage.removeItem(`imagem_${fixedUserId}`);
        localStorage.removeItem(`textoImagem_${fixedUserId}`);

        console.log(`localStorage das imagens e textos da imagem do usuário com ID ${fixedUserId} foi limpo.`);
    }


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