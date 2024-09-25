<template>
    <div class="container pagina-usuario">

        <!--Alerta de sucesso ao cadastrar usuario-->
        <div class="col-md-12 d-flex justify-content-center mt-2">
            <Alerta :mensagem_alerta="mensagem_alerta" />
        </div>

        <button @click="fazerLogout()" class="animate__animated animate__zoomIn btn btn-logout">
            <i class="fa-solid fa-sign-out-alt"></i> Logout
        </button>

        <div class="row">
            <!-- Coluna Dados -->
            <div class="col-md-6 mt-5">
                <div
                    class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center">
                    <input type="file" id="file-input" class="file-input" accept="image/*" @change="carregarImagem"
                        style="display:none;">
                    <label for="file-input" class="d-flex flex-column justify-content-center align-items-center">
                        <img id="avatar-preview" class="img-fluid rounded-circle"
                            :src="selectedImage || '../default-image.png'"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <i v-if="!selectedImage" class="fa-solid fa-upload fa-2x mb-5"></i>
                        <p v-if="!selectedImage" class="text-center mb-4">Adicionar foto</p>
                    </label>
                </div>

                <div class="mt-4">
                    <input type="text" class="animate__animated animate__zoomIn form-control input-usuario"
                        placeholder="Seu nome" aria-label="Nome">
                </div>
                <div class="mt-2">
                    <textarea type="text" class="animate__animated animate__zoomIn form-control input-bio"
                        placeholder="Sua biografia..." aria-label="Bio"></textarea>
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
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-globe fa-2x"></i>
                        <p class="mt-2">Adicionar link</p>
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
                            <small class="text-muted d-block ms-3 me-3">mateusnmaranhao@gmail.com</small>
                        </li>
                        <li>
                            <a class="dropdown-item mt-2" href="#" data-bs-toggle="modal"
                                data-bs-target="#alterarUsuarioModal">Alterar usuário</a>
                            <small class="text-muted d-block ms-3 me-3">mateusmaranhao12</small>
                        </li>
                    </ul>
                </div>

                <router-link to="/usuario"
                    class="animate__animated animate__zoomIn botao-visualizar-perfil btn btn-visualizar-perfil btn-sm">
                    <i class="fa-solid fa-user"></i>
                </router-link>
            </div>
        </div>

        <Footer class="animate__animated animate__zoomIn" />

        <!-- Inclui os modais -->
        <AlterarSenha />
        <AlterarEmail />
        <AlterarUsuario />
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

@Options({
    components: {
        Alerta,
        Footer,
        AlterarSenha,
        AlterarEmail,
        AlterarUsuario,
    }
})
export default class PaginaUsuario extends Vue {
    public selectedImage: string | null = null // Propriedade para armazenar a imagem selecionada
    public mensagem_alerta: Alert | null = null

    mounted() {
        // Recupera a mensagem do sessionStorage
        const mensagem = sessionStorage.getItem('mensagem_alerta');
        if (mensagem) {
            const alertData = JSON.parse(mensagem);
            this.mensagem_alerta = alertData; // Define a mensagem de alerta
            sessionStorage.removeItem('mensagem_alerta'); // Remove a mensagem após exibi-la

            // Exibe a mensagem usando a função mostrarMensagemAlerta
            this.mostrarMensagemAlerta(alertData.icone, alertData.mensagem, alertData.status);
        }
    }

    public fazerLogout() { //logout
        this.$router.push('/')
    }

    public carregarImagem(event: Event) { // Manipulador de upload de imagem
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                this.selectedImage = reader.result as string
            };
            reader.readAsDataURL(file)
        }
    }

    // Método para exibir mensagens de alerta
    //mostrar mensagem alerta
    private mostrarMensagemAlerta(icone: string, mensagem: string, status: string) {
        setTimeout(() => {
            this.mensagem_alerta = { icone, mensagem, status }
            setTimeout(() => {
                this.mensagem_alerta = null
            }, 5000)
        }, 0)
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
