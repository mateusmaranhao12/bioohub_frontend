<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="row w-75">
            <div class="col-md-6 login-form">

                <h2 class="animate__animated animate__zoomIn mb-5">Log in to your account</h2>

                <form>
                    <div class="animate__animated animate__zoomIn mb-4">
                        <input type="email" class="form-control" placeholder="Email" aria-label="Email">
                    </div>
                    <div class="animate__animated animate__zoomIn input-group mb-4">
                        <input :type="mostrar_senha ? 'text' : 'password'" class="form-control" placeholder="Password"
                            aria-label="Password" v-model="senha">
                        <button class="btn btn-outline-secondary" type="button" @click="alternarExibicaoSenha">
                            <i :class="mostrar_senha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                        </button>
                    </div>

                    <div class="animate__animated animate__zoomIn d-grid gap-2">
                        <button class="btn btn-secondary">Log In</button>
                    </div>

                    <div class="animate__animated animate__zoomIn mt-3 mb-3 text-center">
                        <h6 class="animate__animated animate__zoomIn">Or</h6>
                    </div>

                    <div class="animate__animated animate__zoomIn d-grid gap-2 mt-2">
                        <button class="animate__animated animate__zoomIn btn btn-primary"><i class="fa-brands fa-google"></i> Log in with Google</button>
                    </div>

                    <div class="animate__animated animate__zoomIn d-flex justify-content-start">
                        <router-link to="/cadastro" class="animate__animated animate__zoomIn botao-cadastro-tela-login">Or
                            Sign-Up</router-link>
                    </div>
                </form>
            </div>

            <div class="col-md-6">
                <img class="animate__animated animate__zoomIn img-fluid" src="../assets/verge.png">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

export default class Login extends Vue {

    //mostrar senha
    mostrar_senha = false
    senha = ''

    alternarExibicaoSenha() {
        this.mostrar_senha = !this.mostrar_senha;
    }

}

</script>

<style lang="scss" scoped>
@import '../scss/forms.scss';
</style>
