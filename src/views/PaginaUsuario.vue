<template>
    <div v-if="modoTela === 'computador'">
        <div class="container pagina-usuario">

            <!--Alerta de sucesso ao cadastrar usuario-->
            <div class="col-md-12 d-flex justify-content-center mt-2">
                <Alerta :mensagem_alerta="mensagem_alerta" />
            </div>

            <!-- Spinner de carregando os dados -->
            <div v-if="carregando" class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Carregando...</span>
                </div>
            </div>

            <div v-else class="row">
                <!-- Coluna Dados -->
                <div class="col-md-6 mt-5">

                    <!-- Escolher imagem -->
                    <ImagemPerfil :selectedImage="selectedImage" :imagemPerfilUrl="imagemPerfilUrl"
                        :imagemPerfilSelecionada="imagemPerfilSelecionada"
                        @carregar-imagem-perfil="carregarImagemPerfil" @remover-imagem-perfil="removerImagemPerfil" />

                    <!-- Input para editar nome -->
                    <div class="animate__animated animate__zoomIn mt-4">
                        <div v-if="!salvandoAlteracoes">
                            <div v-if="editandoNome" class="d-flex align-items-center">
                                <input type="text" v-model="nome" class="form-control input-usuario"
                                    placeholder="Seu nome" aria-label="Nome">
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

                    <!--Numero de visualizacoes-->
                    <!--<VisualizacoesPerfil />-->

                    <!-- Menu Hamburguer visível em dispositivos menores (abaixo do textarea) -->
                    <MenuHamburguer :email="email" :usuario="usuario" @fazer-logout="fazerLogout" />

                </div>

                <!-- Coluna de links, imagens, videos, etc -->
                <div class="col-md-6 mt-5 mb-5">
                    <div class="d-flex flex-wrap gap-3 justify-content-between">

                        <!-- Título -->
                        <TitulosFooter :titulosFooter="titulosFooter" @salvar-titulo-footer="salvarTituloFooter"
                            @salvar-alteracoes-titulo-footer="salvarAlteracoesTituloFooter"
                            @editar-titulo-footer="editarTituloFooter" @remover-titulo-footer="removerTituloFooter"
                            @cancelar-titulo-footer="cancelarTituloFooter" />

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
                                <i class="fa-solid fa-check"></i> {{ editandoNota ? 'Salvar alterações' : 'Salvar nota'
                                }}
                            </button>
                        </div>

                        <!--Notas footer-->
                        <NotasFooter :notasFooter="notasFooter" @salvar-nota-footer="salvarNotaFooter"
                            @salvar-alteracoes-nota-footer="salvarAlteracoesNotaFooter"
                            @editar-nota-footer="editarNotaFooter" @remover-nota-footer="removerNotaFooter"
                            @cancelar-nota-footer="cancelarNotaFooter" />

                        <!--Inserir imagens-->
                        <div class="animate__animated animate__zoomIn card link-card 
                            card-imagem d-flex flex-column align-items-center justify-content-center 
                            position-relative" style="overflow: hidden;">

                            <!-- Input de arquivo oculto -->
                            <input type="file" ref="fileInput" @change="carregarImagem" style="display:none;"
                                accept="image/*">

                            <!-- Ícone de + e trash -->
                            <div v-if="!imagemSelecionada && !loading" class="plus-icon position-absolute"
                                @click="abrirSeletorImagem" style="cursor: pointer;">
                                <i class="fa-solid fa-plus" style="color: black;"></i>
                            </div>

                            <div v-if="imagemSelecionada && !loading" class="plus-icon position-absolute"
                                @click="removerImagem" style="cursor: pointer;">
                                <i class="fa-solid fa-trash"></i>
                            </div>

                            <!-- Spinner de carregando durante o upload -->
                            <div v-if="loading"
                                class="position-absolute d-flex align-items-center justify-content-center w-100 h-100">
                                <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                            </div>

                            <!-- Imagem exibida (se disponível) -->
                            <div v-if="imagemUrl" class="w-100 h-100">
                                <img :src="imagemUrl" class="img-fluid w-100 h-100" style="object-fit: cover;" />
                            </div>

                            <!-- Ícone e texto padrão quando não há imagem -->
                            <div v-else>
                                <i class="fa-solid fa-mountain fa-2x"></i>
                                <p class="mt-2">Adicionar imagem</p>
                            </div>

                        </div>

                        <!--Imagem footer selecionada-->
                        <div v-for="imagem in imagensFooter" :key="imagem.id"
                            class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative"
                            style="overflow: hidden; height: 100%;">

                            <div class="card-body" style="position: relative; padding: 0; height: 100%;">

                                <!-- Imagem exibida -->
                                <img :src="imagem.imagem" alt="Imagem escolhida" class="img-fluid"
                                    style="object-fit: cover; width: 100%; height: 100%;" />

                                <!-- Botão de Remover Imagem -->
                                <div class="plus-icon position-absolute" @click="removerImagemFooter(imagem.id)"
                                    style="cursor: pointer;">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>

                        <!--Inserir redes sociais-->
                        <div class="animate__animated animate__zoomIn card link-card card-redes-sociais 
                            d-flex flex-column align-items-center justify-content-center position-relative"
                            style="overflow: hidden;">

                            <!-- Exibir links se houver algum adicionado -->
                            <div v-for="link in $store.getters.links" :key="link.id"
                                class="mt-3 d-flex flex-column align-items-center position-relative">

                                <p v-if="!adicionandoLink && !editandoLink">{{ getNomeRedeSocial(link.url) }}</p>
                                <i :class="`fa-brands fa-${detectarRedeSocial(link.url)} fa-2x`"
                                    v-if="detectarRedeSocial(link.url) && !adicionandoLink && !editandoLink && !adicionandoLink && !editandoLink"></i>

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
                            <div v-if="adicionandoLink || editandoLink"
                                class="w-100 d-flex flex-column align-items-center">
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

                        <!--Inserir vídeos-->
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

                            <i v-if="!mostrar_input_video && !mostrar_video_youtube"
                                class="fa-solid fa-video fa-2x"></i>
                            <p v-if="!mostrar_input_video && !mostrar_video_youtube" class="mt-2">Adicionar vídeo</p>

                            <!-- Botão de desfazer (Ctrl + Z) -->
                            <div v-if="mostrar_input_video && !videoUrlIframe" @click="desfazerAlteracaoVideo"
                                class="plus-icon position-absolute" style="top: 10px; left: 10px;">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>

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

                        <!--Inserir localização-->
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

                            <i v-if="!mostrar_input_maps && !mostrar_maps"
                                class="fa-solid fa-map-location-dot fa-2x"></i>
                            <p v-if="!mostrar_input_maps && !mostrar_maps" class="mt-2">Adicionar localização</p>

                            <!-- Botão de desfazer (Ctrl + Z) -->
                            <div v-if="mostrar_input_maps && !mostrar_maps" @click="desfazerAlteracaoMaps"
                                class="plus-icon position-absolute" style="top: 10px; left: 10px;">
                                <button class="btn btn-danger btn-sm">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </button>
                            </div>


                            <!-- Input para o link do Google Maps e botão para confirmar -->
                            <div v-if="mostrar_input_maps && !mostrar_maps" class="mt-3">
                                <input v-model="textoLocalizacaoInput" class="form-control mb-2" type="text"
                                    placeholder="Nome da localização do Google Maps" />
                                <input v-model="localizacaoInput" class="form-control" type="text"
                                    placeholder="Insira a URL de localização do Google Maps" />
                                <button class="btn btn-success mt-3" @click="salvarMapaGoogleMaps">
                                    <i class="fa-solid fa-check"></i> Salvar Localização
                                </button>
                            </div>

                            <!-- Botão para abrir o link do Google Maps -->
                            <div v-if="mostrar_maps" class="mt-3">
                                <h6>{{ googleMapsNome }}</h6>
                                <button class="btn btn-map" @click="abrirMapaGoogleMaps">
                                    <i class="fa-solid fa-location-dot"></i> Ver localização
                                </button>
                            </div>
                        </div>


                        <!-- Lista de mapas footer -->
                        <div v-for="(mapa, index) in mapasFooter" :key="index"
                            class="animate__animated animate__zoomIn link-card card-maps card mb-3">
                            <div class="mt-2">
                                <div class="float-end">
                                    <span class="action-icons">
                                        <i v-if="!mapa.editando && !mapa.adicionando"
                                            class="icon-editar-mapa fas fa-edit" @click="editarMapaFooter(index)"
                                            style="cursor: pointer; margin-left: 5px;" title="Editar"></i>
                                        <i v-if="!mapa.editando && !mapa.adicionando"
                                            class="icon-remover-mapa fas fa-trash-can" @click="removerMapaFooter(index)"
                                            style="cursor: pointer; margin-left: 5px;" title="Remover"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- Mostrar o botão de visualizar localização apenas quando não estiver editando ou adicionando -->
                            <div class="card-body" v-if="!mapa.editando && !mapa.adicionando">
                                <h6>{{ mapa.titulo }}</h6>
                                <button class="btn btn-danger" @click="verLocalizacao(mapa.url)">Ver
                                    Localização</button>
                            </div>

                            <!-- Formulário para adicionar ou editar mapa -->
                            <div v-if="mapa.adicionando || mapa.editando" class="form-group mt-5">
                                <input type="text" v-model="mapa.titulo" placeholder="Título do mapa"
                                    class="form-control mb-2">
                                <input type="text" v-model="mapa.url" placeholder="URL do Google Maps"
                                    class="form-control mb-2">

                                <!-- Botão para salvar alterações ou o novo mapa -->
                                <button class="btn btn-success" @click="salvarAlteracoesMapaFooter(index)"
                                    v-if="mapa.editando"><i class="fa-solid fa-check"></i></button>
                                <button class="btn btn-primary ms-2" @click="salvarMapaFooter(index)"
                                    v-if="mapa.adicionando"><i class="fa-solid fa-check"></i></button>
                                <button class="btn btn-secondary ms-2" @click="cancelarEdicaoFooter(index)"><i
                                        class="fa-solid fa-x"></i></button>
                            </div>
                        </div>

                        <!--Inserir qualquer link-->
                        <div
                            class="animate__animated animate__zoomIn card link-card card-links-livres d-flex flex-column align-items-center justify-content-center position-relative">
                            <div v-for="linkAleatorio in $store.getters.linksAleatorios" :key="linkAleatorio.id"
                                class="mt-3 d-flex flex-column align-items-center position-relative">

                                <p v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio">
                                    {{ getNomeRedeSocial(linkAleatorio.url) }}
                                </p>
                                <i :class="`fa-brands fa-${detectarRedeSocial(linkAleatorio.url)} fa-2x`"
                                    v-if="detectarRedeSocial(linkAleatorio.url) && !adicionandoLinkAleatorio && !editandoLinkAleatorio">
                                </i>
                                <i v-else-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio"
                                    class="fa-solid fa-link fa-2x mb-2"></i>

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

                                <!-- Botão para redirecionar -->
                                <button v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio"
                                    @click="redirecionarParaLinkAleatorio(linkAleatorio)"
                                    class="btn btn-secondary btn-sm mt-2">
                                    Ir para o link
                                </button>
                            </div>

                            <!-- Ícone de adicionar link, quando não há links -->
                            <div v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio && !$store.getters.linksAleatorios.length"
                                @click="iniciarAdicaoLinkAleatorio" class="plus-icon position-absolute"
                                style="top: 10px; right: 10px;">
                                <i class="fa-solid fa-plus" style="color: black;"></i>
                            </div>

                            <i v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio && !$store.getters.linksAleatorios.length"
                                class="fa-solid fa-globe fa-2x"></i>
                            <p v-if="!adicionandoLinkAleatorio && !editandoLinkAleatorio && !$store.getters.linksAleatorios.length"
                                class="mt-2">Adicionar link</p>

                            <!-- Exibição de input e botões para adicionar ou editar o link -->
                            <div v-if="adicionandoLinkAleatorio || editandoLinkAleatorio"
                                class="w-100 d-flex flex-column align-items-center">
                                <i v-if="editandoLinkAleatorio" @click="cancelarEdicaoLinkAleatorio"
                                    class="mb-3 fa-solid fa-arrow-left" style="cursor: pointer;"></i>
                                <input v-model="novoLinkAleatorio" type="text" class="form-control mt-2"
                                    placeholder="Insira o link" />

                                <button
                                    @click="editandoLinkAleatorio ? editarLinkAleatorio() : adicionarLinkAleatorio()"
                                    :class="editandoLinkAleatorio ? 'btn btn-success mt-2 btn-sm' : 'btn btn-primary mt-2 btn-sm'">
                                    <i :class="editandoLinkAleatorio ? 'fa-solid fa-check' : 'fa-solid fa-plus'"
                                        style="color: white;"></i>
                                </button>
                            </div>
                        </div>

                        <!--Links do footer-->
                        <LinksFooter :linksFooter="linksFooter" :detectarRedeSocial="detectarRedeSocial"
                            :getNomeRedeSocial="getNomeRedeSocial" @salvar-link-footer="salvarLinkFooter"
                            @salvar-alteracoes-link-footer="salvarAlteracoesLinkFooter"
                            @editar-link-footer="editarLinkFooter" @remover-link-footer="removerLinkFooter"
                            @cancelar-link-footer="cancelarLinkFooter" />

                    </div>
                </div>
            </div>

            <!-- Modal de Compartilhar -->
            <div v-if="mostrarModalCompartilhar" class="modal fade show" id="modalCompartilhar" tabindex="-1"
                aria-labelledby="modalCompartilharLabel" aria-hidden="true" style="display: block;">
                <div class="modal-backdrop fade show" style="z-index: 1040;"></div>
                <div class="modal-dialog" style="z-index: 1050;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalCompartilharLabel">Compartilhar</h5>
                            <button type="button" class="btn-close" aria-label="Close"
                                @click="fecharModalCompartilhar"></button>
                        </div>
                        <div class="modal-body">
                            <p>bioohub.me/{{ usuario }}</p>
                            <!-- Exibir o QR Code -->
                            <QRCodeVue :value="qrcodeValue()" :size="150" level="H" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                @click="fecharModalCompartilhar">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botões visíveis em dispositivos maiores -->
            <MenuConfig v-if="!carregando" :email="email" :usuario="usuario" @logout="fazerLogout" />

            <!--Foter-->
            <Footer v-if="!carregando" @mudar-tela="alterarModoTela" @adicionar-link-footer="adicionarLinkFooter"
                @adicionar-titulo-footer="adicionarTituloFooter" @adicionar-nota-footer="adicionarNotaFooter"
                @imagem-selecionada-footer="handleImagemFooterSelecionada" @adicionar-mapa-footer="adicionarMapaFooter"
                @abrir-modal-compartilhar="mostrarModalCompartilhar = true" class="animate__animated animate__zoomIn" />

            <!-- Inclui os modais -->
            <AlterarSenha />
            <AlterarEmail @emailAlterado="atualizarEmail" />
            <AlterarUsuario @usuarioAlterado="atualizarUsuario" />
        </div>
    </div>

    <div v-if="modoTela === 'celular'">
        <div class="conteudo-celular">
            <h2>Tela de celular</h2>
        </div>

        <Footer @mudar-tela="alterarModoTela" @adicionar-link-footer="adicionarLinkFooter"
            @adicionar-nota-footer="adicionarNotaFooter" @adicionar-titulo-footer="adicionarTituloFooter"
            class="animate__animated animate__zoomIn" />
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
import axios from 'axios'
import ImagemPerfil from '@/components/ImagemPerfil.vue'
import MenuHamburguer from '@/components/MenuHamburguer.vue'
import VisualizacoesPerfil from '@/components/VisualizacoesPerfil.vue'
import MenuConfig from '@/components/MenuConfig.vue'
import TitulosFooter from '@/components/TitulosFooter.vue'
import NotasFooter from '@/components/NotasFooter.vue'
import LinksFooter from '@/components/LinksFooter.vue'
import QRCodeVue from 'qrcode.vue';

@Options({
    components: {
        Alerta,
        Footer,
        AlterarSenha,
        AlterarEmail,
        AlterarUsuario,
        ImagemPerfil,
        MenuHamburguer,
        VisualizacoesPerfil,
        MenuConfig,
        TitulosFooter,
        NotasFooter,
        LinksFooter,
        QRCodeVue
    },

    methods: {
        ...mapActions(['logout']), // Mapeando a ação de logout
    }

})

export default class PaginaUsuario extends Vue {

    public modoTela = 'computador'

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

    //spinner de loading na imagem
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
    public googleMapsNome = ''
    public textoLocalizacaoInput = ''

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

    //link footer
    public linksFooter: Array<{ id: number, url: string, salvo: boolean, editando: boolean, adicionando: boolean, redeSocial: string; }> = []

    //nota footer
    public notasFooter: Array<{ id: number, texto: string, editando: boolean, adicionando: boolean, salvo: boolean }> = [];
    public mostrandoNotaFooter = false

    //titulo footer
    public titulosFooter: Array<{ id: number, titulo: string, editando: boolean, adicionando: boolean, salvo: boolean }> = [];

    //imagem footer
    public imagensFooter: Array<{ id: number, imagem: string }> = []

    //mapa footer
    public mapasFooter: Array<{ id: number, titulo: string, url: string, editando: boolean, adicionando: boolean, salvo: boolean }> = [];
    public mapaIndex: number | null = null

    //mostrar modal compartilhar
    public mostrarModalCompartilhar = false

    //carregar dados
    carregando = true

    mounted() {

        // Recupera o usuário, email e ID do sessionStorage
        this.usuario = this.$store.getters.usuario?.usuario || sessionStorage.getItem('user_name') || '';
        this.email = this.$store.getters.usuario?.email || sessionStorage.getItem('user_email') || '';
        const userId = sessionStorage.getItem('user_id');

        // Carrega os dados do backend
        if (this.usuario) {
            this.carregarDadosBackend(this.usuario);
        }

        // Verifica se a URL do vídeo está no Vuex após carregar
        this.$nextTick(() => {

            const storedVideoUrl = this.$store.state.videoUrl; // Obtém o URL do vídeo do Vuex

            if (storedVideoUrl && storedVideoUrl.length > 0) {
                const videoUrl = storedVideoUrl[0].video_url; // Acessa a URL diretamente
                const videoId = this.getYouTubeVideoId(videoUrl); // Extração do ID com o método simplificado
                if (videoId) {
                    this.videoUrlIframe = `https://www.youtube.com/embed/${videoId}`;
                    this.mostrar_video_youtube = true;
                } else {
                    console.log('Não foi possível encontrar o ID do vídeo.');
                }
            }

            const mapaUrl = this.$store.state.mapaUrl;
            const mapaNome = this.$store.state.mapaNome;

            if (mapaUrl && mapaNome) {
                this.googleMapsUrl = mapaUrl;
                this.googleMapsNome = mapaNome;
                this.mostrar_maps = true;
            }

        });
    }

    // Carregar dados diretamente do backend
    public carregarDadosBackend(username: string) {
        axios
            .get(`https://bioohub.me/src/backend/api/usuario.php?username=${username}`)
            .then((response) => {
                this.carregando = false
                const dados = response.data;

                // Atualiza os dados de perfil
                const perfil = dados.perfil || {};
                this.nome = perfil.nome || '';
                this.bio = perfil.descricao || '';
                this.selectedImage = perfil.foto_perfil ? `data:image/jpeg;base64,${perfil.foto_perfil}` : null;

                // Atualiza os dados no Vuex
                this.$store.commit('UPDATE_PERFIL', perfil);

                // Carrega os links de redes sociais
                if (dados.redes_sociais) {
                    this.$store.commit('SET_LINKS', dados.redes_sociais);
                }

                // Carregar links aleatórios diretamente do backend
                if (dados.links_aleatorios && dados.links_aleatorios.length > 0) {
                    this.$store.commit('SET_LINKS_ALEATORIOS', dados.links_aleatorios); // Atualiza Vuex com os links aleatórios
                }

                // Carrega os links do footer separadamente
                if (dados.links_footer && dados.links_footer.length > 0) {
                    this.linksFooter = dados.links_footer.map((link: any) => {
                        const redeSocialDetectada = this.detectarRedeSocial(link.url); // Detecta a rede social com base na URL
                        return {
                            id: link.id,
                            url: link.url,
                            salvo: true,
                            editando: false,
                            adicionando: false,
                            redeSocial: link.rede_social || redeSocialDetectada // Usa o valor retornado do backend ou detecta
                        };
                    });
                }

                // Carrega as notas do footer separadamente
                if (dados.notas_footer && dados.notas_footer.length > 0) {
                    this.notasFooter = dados.notas_footer.map((nota: any) => {
                        return {
                            id: nota.id,
                            texto: nota.nota,
                            salvo: true,
                            editando: false,
                            adicionando: false
                        };
                    });
                }

                if (dados.titulos && dados.titulos.length > 0) {
                    this.titulosFooter = dados.titulos.map((titulo: any) => {
                        return {
                            id: titulo.id,
                            titulo: titulo.titulo,
                            salvo: true,
                            editando: false,
                            adicionando: false
                        };
                    });
                }

                if (dados.notas && dados.notas.length > 0) {
                    this.$store.commit('SET_NOTA', dados.notas); // Atualiza Vuex com as notas
                }

                // Carrega as imagens
                if (dados.imagens && dados.imagens.length > 0) {
                    const imagens = dados.imagens.map((imagem: { imagem: any }) => `data:image/jpeg;base64,${imagem.imagem}`);
                    this.$store.commit('SET_IMAGEM_URL', imagens);
                    this.imagemUrl = imagens[0] || null;
                    this.imagemSelecionada = true;
                }

                // Carrega os vídeos
                if (dados.videos && dados.videos.length > 0) {
                    this.$store.commit('SET_VIDEO_URL', dados.videos); // Atualiza Vuex com os vídeos

                    // Verifica se a URL do vídeo está disponível após o Vuex ser atualizado
                    this.$nextTick(() => {
                        const videoUrl = dados.videos[0].video_url;
                        const videoId = this.getYouTubeVideoId(videoUrl); // Extração do ID
                        if (videoId) {
                            this.videoUrlIframe = `https://www.youtube.com/embed/${videoId}`;
                            this.mostrar_video_youtube = true;
                        }
                    });
                }

                // Carrega os dados do mapa
                if (dados.mapas && dados.mapas.length > 0) {
                    const mapa = dados.mapas[0]; // Acessa o primeiro mapa da lista (ajuste conforme necessário)

                    if (mapa.mapa_url && mapa.nome) {
                        this.googleMapsUrl = mapa.mapa_url;
                        this.googleMapsNome = mapa.nome;
                        this.mostrar_maps = true;

                        // Atualiza o Vuex com o nome e URL do mapa
                        this.$store.commit('SET_MAPA_NOME', this.googleMapsNome);
                        this.$store.commit('SET_MAPA_URL', this.googleMapsUrl);
                    }
                }

                // Carregar notas e atualizar `notaSalva`
                if (dados.notas && dados.notas.length > 0) {
                    this.$store.commit('SET_NOTA', dados.notas); // Atualiza Vuex com as notas
                    this.notaSalva = dados.notas[0] || null; // Atualiza notaSalva com a primeira nota, ou null se não houver

                    if (this.notaSalva) {
                        this.nota = this.notaSalva.nota; // Atualiza o campo de texto da nota com o conteúdo da nota salva
                    }
                }

                //Carregar imagens Footer
                if (dados.imagens_footer && dados.imagens_footer.length > 0) {
                    this.imagensFooter = dados.imagens_footer.map((imagem: any) => ({
                        id: imagem.id,
                        imagem: `data:image/jpeg;base64,${imagem.imagem}`,
                    }));
                }

                //Carregar mapas Footer
                if (dados.mapas_footer && dados.mapas_footer.length > 0) {
                    this.mapasFooter = dados.mapas_footer.map((mapa: any) => {
                        return {
                            id: mapa.id,
                            titulo: mapa.titulo,
                            url: mapa.url,
                            editando: false,
                            adicionando: false,
                            salvo: true
                        };
                    });
                }

            })
            .catch((error) => {
                this.carregando = false
            });
    }

    //qrcode value
    qrcodeValue() {
        return `https://bioohub.me/${this.usuario.toLowerCase()}`;
    }

    public abrirModalCompartilhar() {
        this.mostrarModalCompartilhar = true;
    }

    // Método para fechar o modal
    public fecharModalCompartilhar() {
        this.mostrarModalCompartilhar = false;
    }

    // Função para alterar o modo de visualização
    public alterarModoTela(modo: string) {
        this.modoTela = modo;
    }

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

    // Função para retornar o nome da rede social
    public getNomeRedeSocial(url: string, redeSocial?: string): string {
        // Usa o campo redeSocial se já estiver definido (para links)
        if (redeSocial) {
            return redeSocial.charAt(0).toUpperCase() + redeSocial.slice(1);
        }

        // Caso contrário, chama detectarRedeSocial
        const nome = this.detectarRedeSocial(url);
        return nome ? nome.charAt(0).toUpperCase() + nome.slice(1) : '';
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
                const response = await axios.post('https://bioohub.me/src/backend/api/adicionar_links.php', dados)
                if (response.data.success) {
                    const novoLinkComId = {
                        url: this.novoLink,
                        redeSocial,
                        id: response.data.links && response.data.links.length > 0 ? response.data.links[0].id : this.gerarId(),
                        usuario_id: usuarioId,
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
        if (this.linkId === null) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro: ID do link não encontrado.', 'alert-error')
            return
        }

        const usuarioId = sessionStorage.getItem('user_id')
        if (!usuarioId) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado. Tente novamente.', 'alert-error')
            return // Encerra se não houver ID do usuário
        }

        const regex = /^(ftp|http|https):\/\/[^ "]+$/
        if (this.novoLink.trim() === '' || !regex.test(this.novoLink)) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido. Tente novamente.', 'alert-error')
            return
        }

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
            const response = await axios.put('https://bioohub.me/src/backend/api/editar_links.php', dados)
            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', response.data.message, 'alert-sucesso')

                const linkEditado = {
                    url: this.novoLink,
                    redeSocial: novaRedeSocial,
                    id: this.linkId,
                    usuario_id: usuarioId
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

        if (id === undefined || id === null) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'ID do link não definido.', 'alert-error')
            return
        }

        const dados = {
            usuario_id: usuarioId,
            id: id // Certifique-se de que 'id' está sendo passado corretamente
        }

        try {
            const response = await axios.delete('https://bioohub.me/src/backend/api/deletar_links.php', { data: dados })

            if (response.data.success) {
                this.$store.commit('DELETE_LINK_BY_ID', id)
                this.$store.dispatch('saveLinks')

                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link deletado com sucesso!', 'alert-sucesso')
                this.redeSocial = ''
                this.linkParaRedirecionar = null
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
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
        } else if (/https?:\/\/(x\.com\/[^/]+|www\.x\.com\/[^/]+).*/.test(url)) {
            return 'x-twitter'
        } else {
            return null // Retorna null como icone generico se não for reconhecida
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

            const tiposPermitidos = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'] // Lista de tipos permitidos

            // Verifica se o arquivo tem um tipo válido
            if (!tiposPermitidos.includes(file.type)) {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Informe um arquivo válido: PNG, JPG ou SVG', 'alert-error')
                return // Cancela o carregamento
            }

            const reader = new FileReader()

            // Converter a imagem para Base64
            reader.onload = (e) => {
                this.selectedImage = e.target?.result as string // Atualiza o src da imagem
                this.imagemPerfilSelecionada = true // Desabilita o input após seleção da imagem

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

        if (!userId) {
            console.error("ID do usuário não encontrado.");
            this.salvandoAlteracoes = false;
            return;
        }

        const perfil: any = {
            usuario_id: userId,
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

        // Faz a requisição para salvar o perfil no backend
        axios.post('https://bioohub.me/src/backend/api/perfil.php', perfil)
            .then(response => {
                this.editandoNome = false;
                this.editandoBio = false;
                console.log('Perfil salvo com sucesso:', response.data);

                // Atualizar o Vuex com os dados do perfil
                this.$store.commit('UPDATE_PERFIL', perfil);
            })
            .catch(error => {
                console.error('Erro ao salvar o perfil:', error.response?.data || error.message);
            })
            .finally(() => {
                this.salvandoAlteracoes = false; // Desativar ao finalizar a requisição
            });
    }

    // Método para remover a imagem de perfil
    public removerImagemPerfil() {
        const userId = this.$store.getters.usuario?.id || sessionStorage.getItem('user_id');

        if (!userId) {
            console.error("ID do usuário não encontrado.");
            return;
        }

        axios.post('https://bioohub.me/src/backend/api/perfil.php', {
            usuario_id: userId,
            acao: 'removerImagemPerfil',
        })
            .then(response => {
                console.log('Imagem de perfil removida com sucesso:', response.data);

                this.selectedImage = null;
                this.imagemPerfilUrl = null;
                this.imagemPerfilSelecionada = false; // Agora permite selecionar uma nova imagem

                // Atualizar o Vuex com os dados do perfil
                this.$store.commit('UPDATE_PERFIL', { usuario_id: userId, foto_perfil: null });
            })
            .catch(error => {
                console.error('Erro ao remover a imagem de perfil:', error.response?.data || error.message);
            });
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

    public carregarImagem(event: Event): void {
        const input = event.target as HTMLInputElement;
        const userId = sessionStorage.getItem('user_id');

        if (input.files && input.files[0] && userId) {
            const file = input.files[0];
            const tiposPermitidos = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']; // Lista de tipos permitidos

            // Verifica se o arquivo tem um tipo válido
            if (!tiposPermitidos.includes(file.type)) {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Informe um arquivo válido: PNG, JPG ou SVG', 'alert-error');
                return; // Cancela o carregamento
            }

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const imagemBase64 = e.target.result; // Obtém a string base64

                // Criar objeto com imagem base64 e usuário ID
                const dados = {
                    imagem: imagemBase64,
                    usuario_id: userId,
                };

                // Pré-visualização da imagem
                this.imagemUrl = imagemBase64; // Carrega a URL da imagem para exibição
                this.imagemSelecionada = true; // Indica que a imagem foi selecionada

                // Ativa o spinner enquanto o arquivo está sendo enviado para o servidor
                this.loading = true;

                // Upload para o backend com JSON
                axios.post('https://bioohub.me/src/backend/api/imagens.php', dados, {
                    headers: {
                        'Content-Type': 'application/json', // Alterado para JSON
                    },
                })
                    .then(response => {
                        this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');
                    })
                    .catch(error => {
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao carregar imagem', 'alert-error');
                    })
                    .finally(() => {
                        // Finaliza o carregamento (spinner)
                        this.loading = false;
                    });
            };

            reader.readAsDataURL(file); // Converte o arquivo para base64
        }
    }

    //remover imagem
    public removerImagem(): void {
        const userId = sessionStorage.getItem('user_id');

        if (userId) {
            axios.delete('https://bioohub.me/src/backend/api/imagens.php', {
                data: { usuario_id: userId }
            })
                .then(response => {
                    this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');
                    this.imagemSelecionada = false;
                    this.imagemUrl = null;
                })
                .catch(error => {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover imagem', 'alert-error');
                });
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'ID do usuario nao encontrado', 'alert-error');
        }
    }

    // Função para mostrar o vídeo no iframe
    public mostrarVideo() {
        if (!this.videoUrlInput || !this.videoUrlInput.trim()) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, insira um link de vídeo do YouTube.', 'alert-error');
            return; // Sai da função se não houver link
        }

        const videoId = this.getYouTubeVideoId(this.videoUrlInput); // Usa a função simplificada

        const userId = sessionStorage.getItem('user_id');

        if (videoId && userId) {
            this.videoUrlIframe = `https://www.youtube.com/embed/${videoId}`;
            this.mostrar_video_youtube = true;

            // Envia a URL do vídeo para o backend
            axios.post('https://bioohub.me/src/backend/api/videos.php', {
                usuario_id: userId,
                video_url: this.videoUrlInput
            })
                .then(response => {
                    if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error');
                    } else {
                        // Atualizando o Vuex com o URL do vídeo
                        this.$store.commit('SET_VIDEO_URL', this.videoUrlInput);

                        // Exibindo alerta de sucesso
                        this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');
                    }
                })
                .catch(error => {
                    console.error("Erro ao adicionar o vídeo:", error);
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar o vídeo. Tente novamente mais tarde.', 'alert-error');
                });
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Link inválido. Por favor, insira um link de vídeo do YouTube válido.', 'alert-error');
        }
    }

    //remover video do youtube
    public removerVideo(videoId: string) {

        const userId = sessionStorage.getItem('user_id') || this.$store.state.usuario?.id;

        // Requisição para remover o vídeo do banco de dados
        axios.delete('https://bioohub.me/src/backend/api/videos.php', {
            data: {
                usuario_id: userId,
                video_id: videoId // Enviando o ID do vídeo a ser removido
            }
        })
            .then(response => {
                if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error');
                } else {
                    // Limpando o estado do vídeo no Vuex
                    this.$store.commit('CLEAR_VIDEO_URL');

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
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover o vídeo. Tente novamente mais tarde.', 'alert-error');
            });
    }

    // Método mais simples para obter o ID do vídeo do YouTube
    getYouTubeVideoId(url: string): string | null {
        if (!url) {
            // Se a URL for undefined ou vazia, retorna null ou algum valor default
            return null;
        }

        const videoId = url.split('v=')[1]?.split('&')[0]; // Assume que o parâmetro "v=" está na URL

        return videoId || null; // Retorna o ID ou null se não encontrar
    }


    public desfazerAlteracaoVideo() {
        if (this.mostrar_input_video) {
            this.videoUrlInput = ''; // Limpar input de vídeo
            this.mostrar_input_video = false; // Fechar o input
        } else if (this.mostrar_video_youtube) {
            this.videoUrlIframe = ''; // Limpar vídeo exibido
            this.mostrar_video_youtube = false; // Fechar vídeo
        }
    }

    //mostrar input de inserir video do youtube
    public mostrarInputVideo() {
        this.mostrar_input_video = true
    }

    // Armazenar o URL do Google Maps no input
    public salvarMapaGoogleMaps() {
        if (this.localizacaoInput && this.textoLocalizacaoInput) {
            this.googleMapsUrl = this.localizacaoInput;
            this.googleMapsNome = this.textoLocalizacaoInput; // Nome da localização

            this.mostrar_maps = true;

            const userId = sessionStorage.getItem('user_id');
            if (userId) {
                axios.post('https://bioohub.me/src/backend/api/maps.php', {
                    usuario_id: userId,
                    mapa_url: this.googleMapsUrl,
                    nome: this.googleMapsNome // Envia o nome da localização também
                })
                    .then(response => {
                        if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error');
                        } else {
                            this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');

                            // Atualiza o Vuex com o nome e URL do mapa
                            this.$store.commit('SET_MAPA_NOME', this.googleMapsNome);
                            this.$store.commit('SET_MAPA_URL', this.googleMapsUrl);
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao salvar o mapa:", error);
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao salvar o mapa. Tente novamente mais tarde.', 'alert-error');
                    });
            }
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, insira o nome e a URL da localização.', 'alert-error');
        }
    }

    // Remover o mapa
    public removerMaps() {
        this.mostrar_maps = false;
        this.localizacaoInput = '';
        this.textoLocalizacaoInput = '';
        this.googleMapsUrl = '';

        const userId = sessionStorage.getItem('user_id');
        if (userId) {
            axios.delete('https://bioohub.me/src/backend/api/maps.php', {
                data: {
                    usuario_id: userId
                }
            })
                .then(response => {
                    if (response.data.mensagem === "Dados inválidos" || response.data.mensagem === "ID do usuário não fornecido") {
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.mensagem, 'alert-error');
                    } else {
                        this.mostrarMensagemAlerta('fa-solid fa-check', response.data.mensagem, 'alert-sucesso');

                        // Limpa o Vuex
                        this.$store.commit('CLEAR_MAPA_NOME');
                        this.$store.commit('CLEAR_MAPA_URL');
                    }
                })
                .catch(error => {
                    console.error("Erro ao remover o mapa:", error);
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover o mapa. Tente novamente mais tarde.', 'alert-error');
                });
        }
    }

    public desfazerAlteracaoMaps() {
        if (this.mostrar_input_maps) {
            this.textoLocalizacaoInput = '';
            this.localizacaoInput = '';
            this.mostrar_input_maps = false;
        } else if (this.mostrar_maps) {
            this.mostrar_maps = false;
        }
    }

    // Função para abrir o Google Maps (quando o botão é clicado)
    public abrirMapaGoogleMaps() {
        // Verifica se o URL está armazenado
        if (this.googleMapsUrl) {
            // Abre o mapa do Google Maps em uma nova aba
            window.open(this.googleMapsUrl, '_blank')
        } else {
            // Exibe uma mensagem de erro caso o URL não tenha sido salvo
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, configure uma localização primeiro.', 'alert-error')
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

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/adicionar_links_aleatorios.php', dados)
            if (response.data.success) {
                const novoLinkComId = {
                    url: this.novoLinkAleatorio,
                    id: response.data.link.id, // Supondo que o ID é retornado
                    usuario_id: dados.usuario_id
                }

                this.$store.commit('ADD_LINK_ALEATORIO', novoLinkComId)
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link adicionado com sucesso!', 'alert-sucesso') // Alerta de sucesso
                this.adicionandoLinkAleatorio = false

            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
            console.error('Erro ao adicionar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar link', 'alert-error')
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
            const response = await axios.put('https://bioohub.me/src/backend/api/editar_links_aleatorios.php', dados)
            if (response.data.success) {
                const linkEditado = {
                    url: this.novoLinkAleatorio,
                    id: this.linkIdAleatorio,
                    usuario_id: dados.usuario_id
                }

                this.$store.commit('UPDATE_LINK_ALEATORIO', linkEditado)
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link atualizado com sucesso!', 'alert-sucesso') // Alerta de sucesso
                this.editandoLinkAleatorio = false
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }
        } catch (error) {
            console.error('Erro ao editar link:', error)
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao editar link.', 'alert-error')
        }
    }

    //Remover link aleatorio
    public async deletarLinkAleatorio(id: number) {
        const dados = {
            id: id,
            usuario_id: sessionStorage.getItem('user_id')
        }

        try {
            const response = await axios.delete('https://bioohub.me/src/backend/api/deletar_links_aleatorios.php', { data: dados })
            if (response.data.success) {
                this.$store.commit('DELETE_LINK_ALEATORIO', id)
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Link removido com sucesso!', 'alert-sucesso') // Alerta de sucesso

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
            const response = await axios.post('https://bioohub.me/src/backend/api/adicionar_nota.php', notaObj);

            if (response.data.success) {
                const novaNota: Nota = {
                    id: Number(response.data.nota.id),
                    usuario_id: userId!,
                    nota: this.nota
                };

                this.$store.commit('ADD_NOTA', novaNota);

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
            const response = await axios.post('https://bioohub.me/src/backend/api/remover_nota.php', {
                id: id,
                usuario_id: usuarioId
            });
            if (response.data.success) {
                this.$store.dispatch('deleteNota', id);

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
            const response = await axios.post('https://bioohub.me/src/backend/api/editar_nota.php', notaEditada);
            if (response.data.success) {
                this.$store.commit('UPDATE_NOTA', notaEditada);
                this.notaSalva = notaEditada;
                this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Nota editada com sucesso!', 'alert-sucesso');

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

    //adicionar link footer
    public adicionarLinkFooter() {
        const novoLink = {
            id: 0,
            url: '',
            salvo: false,
            editando: false,
            adicionando: true,
            redeSocial: '', // Inicializando a propriedade 'redeSocial'
        }; // id inicial temporário
        this.linksFooter.push(novoLink);
    }


    //salvar links do footer
    public async salvarLinkFooter(index: number) {
        const link = this.linksFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        // Detecta a rede social e salva no objeto link
        link.redeSocial = this.detectarRedeSocial(link.url) ?? ''; // Usando coalescência nula

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/adicionar_links_footer.php', {
                usuario_id: usuario_id,
                url: link.url,
            });

            if (response.data.success) {
                this.linksFooter[index] = {
                    id: response.data.link.id,
                    url: response.data.link.url,
                    redeSocial: link.redeSocial,  // Salva o tipo de rede social detectado
                    salvo: true,
                    editando: false,
                    adicionando: false,
                };

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Link adicionado com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar link', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    // Editar links do footer
    public editarLinkFooter(index: number) {
        this.linksFooter[index].editando = true;
        this.linksFooter[index].salvo = false;
    }

    // Salvar alterações do link footer
    public async salvarAlteracoesLinkFooter(index: number) {
        const link = this.linksFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        // Detecta a rede social ao editar
        link.redeSocial = this.detectarRedeSocial(link.url) ?? '';  // Usando coalescência nula

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/editar_links_footer.php', {
                usuario_id: usuario_id,
                id: link.id,
                url: link.url,
            });

            if (response.data.success) {
                this.linksFooter[index].salvo = true;
                this.linksFooter[index].editando = false;

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Alterações salvas com sucesso!', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao salvar alterações', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    //remover links vindos do footer
    public async removerLinkFooter(index: number) {
        const link = this.linksFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/deletar_links_footer.php', {
                usuario_id: usuario_id,
                id: link.id,
            });

            if (response.data.success) {
                this.linksFooter.splice(index, 1);

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Link removido com sucesso!', 'alert-sucesso');
            } else {
                console.error('Erro ao remover link:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
        }
    }

    public cancelarLinkFooter(index: number) {
        const link = this.linksFooter[index];
        if (link.adicionando) {
            this.linksFooter.splice(index, 1);  // Remove o link da lista
        }
    }

    // Função para exibir o textarea
    public adicionarNotaFooter() {
        this.notasFooter.push({
            id: -1,
            texto: '',
            editando: false,
            adicionando: true,
            salvo: false
        });
    }

    // Função para salvar a nota e exibir como <p>
    public async salvarNotaFooter(index: number) {
        const nota = this.notasFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/adicionar_nota_footer.php', {
                usuario_id: usuario_id,
                nota: nota.texto,
            });

            if (response.data.success) {
                this.notasFooter[index] = {
                    ...nota,
                    id: response.data.nota.id,  // Atualiza o id retornado do backend
                    editando: false,
                    adicionando: false,
                    salvo: true
                };

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Nota adicionada com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar nota', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    // Função para editar uma nota existente
    public editarNotaFooter(index: number) {
        this.notasFooter[index].editando = true; // Exibe o textarea novamente para edição
    }

    // Função para salvar alterações em uma nota existente
    public async salvarAlteracoesNotaFooter(index: number) {
        const nota = this.notasFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/editar_nota_footer.php', {
                usuario_id: usuario_id,
                id: nota.id,  // Agora usa o id da nota
                nota: nota.texto,
            });

            if (response.data.success) {
                this.notasFooter[index].editando = false;

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Alterações salvas com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao editar nota', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    // Função para remover uma nota
    public async removerNotaFooter(index: number) {
        const nota = this.notasFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/remover_nota_footer.php', {
                usuario_id: usuario_id,
                id: nota.id,  // Usa o id da nota para remover
            });

            if (response.data.success) {
                this.notasFooter.splice(index, 1);  // Remove a nota localmente

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Nota removida com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover nota', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    public cancelarNotaFooter(index: number) {
        const nota = this.notasFooter[index];

        if (nota.adicionando) {
            // Se for um título novo (adicionando), remove o título
            this.notasFooter.splice(index, 1);
        } else {
            // Caso contrário, apenas cancela a edição
            nota.editando = false;
        }
    }

    // Função para exibir o input para adicionar título
    public adicionarTituloFooter() {
        this.titulosFooter.push({
            id: Date.now(), // ID temporário baseado no timestamp
            titulo: '',
            editando: false,
            adicionando: true,
            salvo: false
        });
    }

    // Função para salvar o título e exibir
    public async salvarTituloFooter(index: number) {
        const titulo = this.titulosFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/adicionar_titulo.php', {
                usuario_id: usuario_id,
                titulo: titulo.titulo,
            });

            if (response.data.success) {
                // Atualiza o id do título retornado do backend
                this.titulosFooter[index] = {
                    ...titulo,
                    id: response.data.titulo.id,  // Atualiza o id do backend
                    adicionando: false,
                    editando: false,
                    salvo: true
                };

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Título adicionado com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar título', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    // Função para editar um título
    public editarTituloFooter(index: number) {
        this.titulosFooter[index].editando = true; // Exibe o input novamente para edição
    }

    // Função para salvar as alterações no título
    public async salvarAlteracoesTituloFooter(index: number) {
        const titulo = this.titulosFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/editar_titulo.php', {
                usuario_id: usuario_id,
                id: titulo.id,  // Usa o id do título para editar
                titulo: titulo.titulo,
            });

            if (response.data.success) {
                this.titulosFooter[index].editando = false;  // Finaliza a edição
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Alterações salvas com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao editar título', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    // Função para remover um título
    public async removerTituloFooter(index: number) {
        const titulo = this.titulosFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/remover_titulo.php', {
                usuario_id: usuario_id,
                id: titulo.id,  // Usa o id do título para remover
            });

            if (response.data.success) {
                this.titulosFooter.splice(index, 1);  // Remove o título localmente
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Título removido com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover título', 'alert-error');
            }
        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    public cancelarTituloFooter(index: number) {
        const titulo = this.titulosFooter[index];

        if (titulo.adicionando) {
            // Se for um título novo (adicionando), remove o título
            this.titulosFooter.splice(index, 1);
        } else {
            // Caso contrário, apenas cancela a edição
            titulo.editando = false;
        }
    }

    // Função para inserir imagem
    public async handleImagemFooterSelecionada(file: File) {
        const usuario_id = sessionStorage.getItem('user_id');  // Obtém o ID do usuário

        if (!usuario_id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado', 'alert-error');
            return;
        }

        const imagemBase64 = await this.convertToBase64(file);  // Converte a imagem para base64

        // Verifica a imagem em base64
        if (!imagemBase64 || imagemBase64.length < 100) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao converter a imagem', 'alert-error');
            return;
        }

        try {
            const response = await axios.post('https://bioohub.me/src/backend/api/imagens_footer.php', {
                usuario_id: usuario_id,
                imagem: imagemBase64  // Envia a imagem em base64
            });

            if (response.data.mensagem === 'Imagem inserida com sucesso') {
                const novaImagem = {
                    id: response.data.id,  // O ID da imagem inserida
                    imagem: imagemBase64,  // A imagem em base64
                    usuario_id: usuario_id  // Associa a imagem ao usuário logado
                };
                this.imagensFooter.push(novaImagem);
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Imagem inserida com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao inserir a imagem', 'alert-error');
            }

        } catch (error) {
            this.mostrarMensagemAlerta('fa-solid fa-xmark', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }

    // Função auxiliar para converter a imagem para base64
    private convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Função para remover uma imagem
    public async removerImagemFooter(id: number) {
        const usuario_id = sessionStorage.getItem('user_id');  // Obtém o ID do usuário

        if (!usuario_id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado', 'alert-error');
            return;
        }

        // Log para verificar o ID do usuário e o ID da imagem
        console.log(`Remover imagem: Usuario ID: ${usuario_id}, Imagem ID: ${id}`);

        try {
            const response = await axios.delete('https://bioohub.me/src/backend/api/imagens_footer.php', {
                params: {
                    usuario_id: usuario_id,  // Passa o ID do usuário
                    imagem_id: id  // Passa o ID da imagem que será removida
                }
            });

            console.log('Resposta do servidor:', response.data);

            if (response.data.mensagem === 'Imagem removida com sucesso') {
                // Remove a imagem localmente
                this.imagensFooter = this.imagensFooter.filter(imagem => imagem.id !== id);
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Imagem removida com sucesso', 'alert-sucesso');
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover a imagem', 'alert-error');
            }
        } catch (error) {
            // Log para erro na requisição
            console.error('Erro na requisição:', error);
            this.mostrarMensagemAlerta('fa-solid fa-xmark', 'Erro ao conectar ao servidor', 'alert-error');
        }
    }


    // Validação da URL do Google Maps (regex simples para verificar se é um link válido)
    private validarLocalizacao(localizacao: string): boolean {
        const regex = /^(https?:\/\/)?(www\.)?(google\.com\/maps|maps\.google\.com).+/i;
        return regex.test(localizacao);
    }

    // Função para adicionar um novo mapa
    public adicionarMapaFooter() {
        this.mapasFooter.push({
            id: Date.now(),  // Gerando um ID temporário com Date.now()
            titulo: '',
            url: '',
            editando: false,
            adicionando: true,
            salvo: false
        });
    }

    // Função para salvar o novo mapa ou as alterações
    public salvarMapaFooter(index: number) {
        const mapa = this.mapasFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');  // Obtém o ID do usuário

        if (!usuario_id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado', 'alert-error');
            return;
        }

        if (mapa.titulo && this.validarLocalizacao(mapa.url)) {
            axios.post('https://bioohub.me/src/backend/api/adicionar_mapa_footer.php', {
                usuario_id: usuario_id,
                titulo: mapa.titulo,
                url: mapa.url
            })
                .then(response => {
                    if (response.data.success) {
                        // Atualiza o ID do mapa com o valor retornado do backend
                        mapa.id = response.data.id;
                        mapa.adicionando = false;
                        mapa.editando = false;
                        mapa.salvo = true;

                        this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Mapa adicionado com sucesso!', 'alert-sucesso');
                    } else {
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
                    }
                })
                .catch(error => {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao adicionar mapa.', 'alert-error');
                    console.error('erro: ', error);
                });
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, preencha todos os campos corretamente e insira uma URL válida do Google Maps.', 'alert-error');
        }
    }

    // Função para editar um mapa existente
    public editarMapaFooter(index: number) {
        const mapa = this.mapasFooter[index];
        mapa.editando = true;
        mapa.adicionando = false;
    }

    // Função para salvar alterações no mapa
    public salvarAlteracoesMapaFooter(index: number) {
        const mapa = this.mapasFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');  // Obtém o ID do usuário

        if (!usuario_id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado', 'alert-error');
            return;
        }

        if (!mapa.id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'ID do mapa não encontrado', 'alert-error');
            return;
        }

        if (mapa.titulo && this.validarLocalizacao(mapa.url)) {
            axios.post('https://bioohub.me/src/backend/api/editar_mapa_footer.php', {
                usuario_id: usuario_id,
                id: mapa.id,  // O id agora é o real após a resposta do servidor
                titulo: mapa.titulo,
                url: mapa.url
            })
                .then(response => {
                    if (response.data.success) {
                        mapa.editando = false;

                        this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Alterações salvas com sucesso!', 'alert-sucesso');
                    } else {
                        this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
                    }
                })
                .catch(error => {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao salvar alterações do mapa.', 'alert-error');
                    console.error('erro: ', error);
                });
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, preencha todos os campos corretamente e insira uma URL válida do Google Maps.', 'alert-error');
        }
    }


    // Função para cancelar a edição de um mapa
    public cancelarEdicaoFooter(index: number) {
        const mapa = this.mapasFooter[index];
        if (mapa.adicionando) {
            // Se for um mapa novo (adicionando), remove o mapa
            this.mapasFooter.splice(index, 1)
        } else {
            // Caso contrário, apenas cancela a edição
            mapa.editando = false
        }
    }

    // Função para remover um mapa
    public removerMapaFooter(index: number) {
        const mapa = this.mapasFooter[index];
        const usuario_id = sessionStorage.getItem('user_id');  // Obtém o ID do usuário

        if (!usuario_id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Usuário não autenticado', 'alert-error');
            return;
        }

        if (!mapa.id) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'ID do mapa não encontrado', 'alert-error');
            return;
        }

        axios.post('https://bioohub.me/src/backend/api/remover_mapa_footer.php', {
            usuario_id: usuario_id,
            id: mapa.id  // Enviando o ID do mapa para remoção
        })
            .then(response => {
                if (response.data.success) {
                    // Remove o mapa do array local após sucesso no servidor
                    this.mapasFooter.splice(index, 1);

                    this.mostrarMensagemAlerta('fa-solid fa-check-circle', 'Mapa removido com sucesso!', 'alert-sucesso');
                } else {
                    this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error');
                }
            })
            .catch(error => {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Erro ao remover mapa.', 'alert-error');
                console.error('erro: ', error)
            });
    }

    // Função para visualizar a localização no Google Maps
    public verLocalizacao(localizacao: string) {
        window.open(localizacao, '_blank');
    }

    // Mostrar mensagem de alerta
    private mostrarMensagemAlerta(icone: string, mensagem: string, status: string) {
        this.mensagem_alerta = { icone, mensagem, status }
        setTimeout(() => {
            this.mensagem_alerta = null
        }, 5000)
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