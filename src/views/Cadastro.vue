<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="row w-75">

            <!-- Etapa 1 -->
            <div v-if="etapa === 1"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"
                class="cadastro">

                <div class="row">
                    <div class="col-md-6">
                        <h2 class="animate__animated animate__zoomIn h2-cadastro mb-3">First, claim your unique link
                        </h2>
                        <h5 class="animate__animated animate__zoomIn h5-cadastro">The good ones are still available!
                        </h5>

                        <form>
                            <div class="animate__animated animate__zoomIn input-name input-group mb-3">
                                <span class="input-group-text">bioohub.me/</span>
                                <input type="text" class="form-control" placeholder="your-name" aria-label="Username">
                            </div>
                        </form>

                        <div class="d-grid gap-2">
                            <button class="animate__animated animate__zoomIn btn btn-secondary btn-form"
                                @click="proximaEtapa()">Grab my link</button>
                        </div>

                        <div class="d-flex justify-content-start">
                            <router-link to="/login"
                                class="animate__animated animate__zoomIn botao-login-tela-cadastro">
                                Or log-in
                            </router-link>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <GrabLink />
                    </div>
                </div>
            </div>


            <!-- Etapa 2 -->
            <div v-if="etapa === 2" class="row cadastro" :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"> <!-- Adicionado row aqui -->
                <div class="col-md-6 mb-2">
                    <div class="d-flex justify-content-start">
                        <button class="arrow-left" @click="etapaAnterior()">
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                    </div>
                    <h2 class="mb-5">First, claim your unique link</h2>

                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <input type="text" class="form-control" placeholder="email" aria-label="E-mail">
                            </div>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <input :type="mostrar_senha ? 'text' : 'password'" class="form-control"
                                        placeholder="password" aria-label="Password" v-model="senha">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="alternarExibicaoSenha">
                                        <i :class="mostrar_senha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="d-grid gap-2 mt-3">
                            <button @click.prevent="proximaEtapa()" class="btn btn-secondary">Create account</button>
                        </div>

                        <div class="mt-3 mb-3">
                            <h6>Or</h6>
                        </div>

                        <div class="d-grid gap-2 mt-2 mb-2">
                            <button @click.prevent="proximaEtapa()" class="btn btn-primary">
                                <i class="fa-brands fa-google"></i> Sign up with Google
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Adicionando o img-rodando na mesma linha -->
                <div class="col-md-6 img-rodando animate__animated animate__zoomIn">
                    <img class="img-fluid img-rodando-2" src="../assets/imgs/63ebce23e53ac60a7fa7bd43_hero youtube.png">
                    <img class="img-fluid img-rodando-3" src="../assets/imgs/Insta.png">
                </div>
            </div>

            <!-- Etapa 3 (Planos) -->
            <div v-if="etapa === 3"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"
                class="cadastro col-md-12">

                <Planos />

                <!-- Botões de Skip e Next -->
                <div class="d-flex mt-3">
                    <button class="btn btn-light flex-grow-1 me-1" @click="etapaAnterior()">Back</button>
                    <button class="btn btn-dark flex-grow-1" @click="proximaEtapa()">Next</button>
                </div>

            </div>

            <!-- Etapa 4 (Redes sociais) -->
            <div v-if="etapa === 4"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"
                class="cadastro col-md-12">

                <RedesSociais />

            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Planos from '../components/Planos.vue'
import RedesSociais from '@/components/RedesSociais.vue'
import GrabLink from '@/components/GrabLink.vue'

@Options({
    components: {
        Planos,
        RedesSociais,
        GrabLink
    }
})

export default class Cadastro extends Vue {

    //etapa 1
    etapa = 1

    //mostrar senha
    mostrar_senha = false
    senha = ''

    //animações de entrada e saida
    animacaoEntrada = false
    animacaoSaida = false

    public alternarExibicaoSenha() {
        this.mostrar_senha = !this.mostrar_senha
    }

    public proximaEtapa() { //proxima etapa
        this.animacaoSaida = true
        setTimeout(() => {
            this.etapa++
            this.animacaoSaida = false
            this.animacaoEntrada = true
        }, 1000)
    }

    public etapaAnterior() { //etapa anterior
        this.animacaoSaida = true
        setTimeout(() => {
            this.etapa--
            this.animacaoSaida = false
            this.animacaoEntrada = true
        }, 1000)
    }

}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>
