<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="row w-75">
            <div class="col-md-6 login-form">

                <h2 class="animate__animated animate__zoomIn mb-5">Faça log-in com sua conta</h2>

                <form>
                    <div class="animate__animated animate__zoomIn mb-4">
                        <input type="email" class="form-control" placeholder="Email" aria-label="Email">
                    </div>
                    <div class="animate__animated animate__zoomIn input-group mb-4">
                        <input :type="mostrar_senha ? 'text' : 'password'" class="form-control" placeholder="Senha"
                            aria-label="Senha" v-model="senha">
                        <button class="btn btn-outline-secondary" type="button" @click="alternarExibicaoSenha">
                            <i :class="mostrar_senha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                        </button>
                    </div>

                    <div class="animate__animated animate__zoomIn d-grid gap-2">
                        <button @click="fazerLogin()" class="btn btn-secondary">Log In</button>
                    </div>

                    <div class="animate__animated animate__zoomIn mt-3 mb-3 text-center">
                        <h6 class="animate__animated animate__zoomIn">Ou</h6>
                    </div>

                    <div class="animate__animated animate__zoomIn d-grid gap-2 mt-2">
                        <button @click="fazerLogin()" class="animate__animated animate__zoomIn btn btn-primary"><i
                                class="fa-brands fa-google"></i> Log in com Google</button>
                    </div>

                    <div class="animate__animated animate__zoomIn d-flex justify-content-start">
                        <router-link to="/cadastro"
                            class="animate__animated animate__zoomIn botao-cadastro-tela-login">Ou cadastre-se
                            aqui</router-link>
                    </div>
                </form>
            </div>

            <div class="img-rodando animate__animated animate__zoomIn col-md-6 d-none d-md-block">
                <img class="img-fluid img-rodando-1" src="../assets/imgs/63e5079c2efbf624bd00d1e3_hero verge-p-800.png">
                <img class="img-fluid img-rodando-2" src="../assets/imgs/63ebce23e53ac60a7fa7bd43_hero youtube.png">
                <img class="img-fluid img-rodando-3" src="../assets/imgs/Insta.png">
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

    public fazerLogin() {
        this.$router.push('/pagina-usuario')
    }

}

</script>

<style lang="scss" scoped>
@import '../scss/forms.scss';
</style>
