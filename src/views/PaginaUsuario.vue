<template>
    <div class="container pagina-usuario">
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
                            :src="selectedImage || 'default-avatar.jpg'"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <i v-if="!selectedImage" class="fa-solid fa-upload fa-2x mb-5"></i>
                        <p v-if="!selectedImage" class="text-center mb-4">Add avatar</p>
                    </label>
                </div>

                <div class="mt-4">
                    <input type="text" class="animate__animated animate__zoomIn form-control input-usuario"
                        placeholder="Your Name" aria-label="Name">
                </div>
                <div class="mt-2">
                    <textarea type="text" class="animate__animated animate__zoomIn form-control input-bio"
                        placeholder="Your bio..." aria-label="Bio"></textarea>
                </div>

                <!-- Menu Hamburguer visível em dispositivos menores (abaixo do textarea) -->
                <nav class="navbar navbar-expand-lg navbar-light d-md-none mt-3">
                    <div class="container-fluid">
                        <button class="animate__animated animate__zoomIn navbar-toggler mb-3" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            Show more
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <button class="btn btn-secondary w-100 mb-2">
                                        <i class="fa-solid fa-gear"></i> Settings
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/usuario" class="btn btn-primary w-100">
                                        <i class="fa-solid fa-user"></i> View Profile
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <!-- Coluna Links -->
            <div class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <div
                        class="animate__animated animate__zoomIn card link-card card-small d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-mountain fa-2x"></i>
                        <p class="mt-2">Add image</p>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-vertical d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-globe fa-2x"></i>
                        <p class="mt-2">Add link</p>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-horizontal d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-brands fa-spotify fa-2x"></i>
                        <p class="mt-2">Add music</p>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-large-square d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-video fa-2x"></i>
                        <p class="mt-2">Add video</p>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-vertical2 d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                        <p class="mt-2">Add a location</p>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-small2 d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-share-alt fa-2x"></i>
                        <p class="mt-2">Add link</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Botões visíveis em dispositivos maiores -->
        <div class="mt-3 col-md-6 d-none d-md-block">
            <div class="dropdown dropup mb-2" style="width: 60%;">
                <button class="animate__animated animate__zoomIn botao-dropdown btn btn-secondary dropdown-toggle w-100"
                    type="button" id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-gear"></i> Settings
                </button>
                <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
                    <li><a class="dropdown-item" href="#">Change password</a></li>
                    <li><a class="dropdown-item" href="#">Change e-mail</a></li>
                    <li><a class="dropdown-item" href="#">Change username</a></li>
                </ul>
            </div>

            <router-link to="/usuario" class="animate__animated animate__zoomIn botao-visualizar-perfil btn btn-primary"
                style="width: 60%;">
                <i class="fa-solid fa-user"></i> View Profile
            </router-link>
        </div>

        <Footer class="animate__animated animate__zoomIn" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Footer from '@/components/Footer.vue';

@Options({
    components: {
        Footer
    }
})
export default class PaginaUsuario extends Vue {
    public selectedImage: string | null = null; // Propriedade para armazenar a imagem selecionada

    public fazerLogout() { //logout
        this.$router.push('/');
    }

    public carregarImagem(event: Event) { //carregar imagem
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.selectedImage = e.target?.result as string; // Atualiza a imagem selecionada
            };

            reader.readAsDataURL(file);
        }
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
