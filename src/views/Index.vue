<template>
    <navbar />
    <div class="container">
        <div class="row">
            <div class="col-md-4 mt-3">
                <img src="../assets/support_my_art.png" class="animate__animated animate__zoomIn img-fluid img1">
                <img src="../assets/verge.png" class="animate__animated animate__zoomIn img-fluid img2">
                <img src="../assets/gadget.png" class="animate__animated animate__zoomIn img-fluid img3">
            </div>
            <div class="col-md-5 bioohub">
                <img src="../assets/logo.png" class="animate__animated animate__bounceIn img-fluid logo">
                <h3 class="animate__animated animate__bounceIn h3-bioohub">BiooHub</h3>
                <h1 class="animate__animated animate__fadeInUp link-in-bio">A Link in Bio.
                    <br>
                    But Rich and Beautiful.
                </h1>
                <p class="animate__animated animate__fadeInUp p">
                    Your personal page to show everything you are and create.
                </p>
                <div class="d-flex justify-content-center">
                    <router-link to="/cadastro" class="animate__animated animate__fadeIn btn btn-bioohub btn-lg">
                        Create your Bioohub
                    </router-link>
                </div>
                <div class="d-flex justify-content-center">
                    <small class="animate__animated animate__fadeIn botao-login">Log-in</small>
                </div>

            </div>
            <div class="col-md-3">
                <img src="../assets/paint.png" class="animate__animated animate__zoomIn img-fluid img4 img-fluid">
                <img src="../assets/tweets.png" class="animate__animated animate__zoomIn img-fluid img5 img-fluid">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '../components/Navbar.vue'

@Options({
    components: {
        Navbar
    }
})

export default class Index extends Vue {

}

</script>

<style lang="scss">
@import '../scss/index.scss';
</style>