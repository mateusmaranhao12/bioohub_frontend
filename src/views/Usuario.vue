<template>
    <div class="container pagina-usuario">
        <div class="row">

            <!-- Coluna Dados -->
            <div class="col-md-6 mt-5 d-flex flex-column align-items-center text-center d-md-block">
                <div
                    class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center">
                    <img src="../assets/imgs/11a570b9-08cb-461b-bef6-5b83e8a7f991.jpeg" alt="Avatar"
                        class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
                </div>

                <div class="mt-4 animate__animated animate__zoomIn w-100">
                    <h2 class="text-start text-md-start text-center">Mateus Maranhao</h2>
                </div>
                <div class="mt-2 animate__animated animate__zoomIn w-100">
                    <p class="text-start text-md-start text-center" style="color: rgb(190, 190, 190)">lorem ipsum dolor
                        sit amet</p>
                </div>
            </div>

            <!-- Coluna Links -->
            <div class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <div
                        class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative">
                        <i class="fa-solid fa-mountain fa-2x"></i>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-redes-sociais d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-globe fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-video d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-video fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-maps d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-links-livres d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-share-alt fa-2x"></i>
                    </div>
                </div>
            </div>

            <!-- Botão Criar Bioohub no canto inferior esquerdo -->
            <div class="animate__animated animate__zoomIn d-flex justify-content-center mt-5 mb-3">
                <router-link to="/cadastro" class="btn btn-bioohub">
                    Criar meu Bioohub
                </router-link>
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
