<template>
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-4 mt-5 d-none d-md-block">
                <img src="../assets/imgs/Insta.png" class="animate__animated animate__zoomIn img-fluid img1">
                <img src="../assets/imgs/63e5079c2efbf624bd00d1e3_hero verge-p-800.png"
                    class="animate__animated animate__zoomIn img-fluid img3">
                <img src="../assets/imgs/63ebce23e53ac60a7fa7bd43_hero youtube.png"
                    class="animate__animated animate__zoomIn img-fluid img2">
            </div>
            <div class="col-md-5 bioohub">
                <img src="../assets/imgs/logo.png" class="animate__animated animate__bounceIn img-fluid logo">
                <h3 class="animate__animated animate__bounceIn h3-bioohub">BiooHub</h3>
                <h1 class="animate__animated animate__fadeInUp link-in-bio">Um simples link na bio
                    <br>
                    Agora é uma poderosa página de apresentação.
                </h1>
                <p class="animate__animated animate__fadeInUp p">
                    Conecte todas as suas redes, conteúdos e projetos em um só lugar!
                </p>
                <div class="d-flex justify-content-center">
                    <router-link to="/cadastro" class="animate__animated animate__fadeIn btn btn-bioohub btn-lg">
                        Cadastre-se no BiooHub
                    </router-link>
                </div>
                <div class="d-flex justify-content-center">
                    <router-link to="/login" class="animate__animated animate__fadeIn botao-login">Log-in</router-link>
                </div>

            </div>
            <div class="col-md-3 d-none d-md-block">
                <img src="../assets/imgs/paint.png" class="animate__animated animate__zoomIn img-fluid img4 img-fluid">
                <img src="../assets/imgs/tweets.png" class="animate__animated animate__zoomIn img-fluid img5 img-fluid">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
    }
})

export default class Index extends Vue {

}

</script>

<style lang="scss">
@import '../scss/index.scss';
</style>