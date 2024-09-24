<template>
    <div class="container pagina-usuario">

        <div class="row">

            <!-- Coluna Dados -->
            <div class="col-md-6 mt-5">
                <div
                    class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center">
                    <img src="../assets/imgs/11a570b9-08cb-461b-bef6-5b83e8a7f991.jpeg" alt="Avatar"
                        class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
                    <i class="fa-solid fa-upload fa-2x mb-2"></i>
                    <p class="text-center mb-0">Adicionar avatar</p>
                </div>

                <div class="mt-4 animate__animated animate__zoomIn">
                    <h2>Mateus Maranhao</h2>
                </div>
                <div class="mt-2 animate__animated animate__zoomIn">
                    <p style="color: rgb(190, 190, 190)">lorem ipsum dolor sit amet</p>
                </div>

                <!-- Botão Criar Bioohub no canto inferior esquerdo -->
                <div class="animate__animated animate__zoomIn d-flex justify-content-start mt-3 mb-3">
                    <router-link to="/cadastro" class="btn btn-bioohub">
                        Criar meu Bioohub
                    </router-link>
                </div>
            </div>

            <!-- Coluna Links -->
            <div class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <div
                        class="animate__animated animate__zoomIn card link-card card-small d-flex flex-column align-items-center justify-content-center position-relative">
                        <i class="fa-solid fa-mountain fa-2x"></i>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-vertical d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-globe fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-horizontal d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-brands fa-spotify fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-large-square d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-video fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-vertical2 d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-small2 d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-share-alt fa-2x"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {}
})
export default class Usuario extends Vue {
    public fazerLogout() {
        this.$router.push('/')
    }
}
</script>

<style lang="scss">
@import '../scss/pagina_usuario.scss';
</style>
