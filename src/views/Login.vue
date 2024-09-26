<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="row w-75">
            <div class="col-md-6 login-form">

                <h2 class="animate__animated animate__zoomIn mb-5">Faça log-in com sua conta</h2>

                <!--Alerta de erro ou de sucesso-->
                <div class="col-md-12 d-flex justify-content-center mt-2">
                    <Alerta :mensagem_alerta="mensagem_alerta" />
                </div>

                <form>
                    <div class="animate__animated animate__zoomIn mb-4">
                        <input type="email" v-model="email" class="form-control" placeholder="Email" aria-label="Email">
                    </div>
                    <div class="animate__animated animate__zoomIn input-group mb-4">
                        <input :type="mostrar_senha ? 'text' : 'password'" class="form-control" placeholder="Senha"
                            aria-label="Senha" v-model="senha">
                        <button class="btn btn-outline-secondary" type="button" @click="alternarExibicaoSenha">
                            <i :class="mostrar_senha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                        </button>
                    </div>

                    <div class="animate__animated animate__zoomIn d-grid gap-2">
                        <button type="button" @click="fazerLogin" class="btn btn-secondary">Log In</button>
                    </div>

                    <div class="animate__animated animate__zoomIn mt-3 mb-3 text-center">
                        <h6 class="animate__animated animate__zoomIn">Ou</h6>
                    </div>

                    <div class="animate__animated animate__zoomIn d-grid gap-2 mt-2">
                        <button type="button" class="animate__animated animate__zoomIn btn btn-primary">
                            <i class="fa-brands fa-google"></i> Log in com Google
                        </button>
                    </div>

                    <div class="animate__animated animate__zoomIn d-flex justify-content-start">
                        <router-link to="/cadastro"
                            class="animate__animated animate__zoomIn botao-cadastro-tela-login">Ou cadastre-se
                            aqui</router-link>
                    </div>
                </form>
            </div>

            <div class="img-rodando animate__animated animate__zoomIn col-md-6 d-none d-md-block">
                <img class="img-fluid img-rodando-1" style="width: 80%"
                    src="../assets/imgs/63e5079c2efbf624bd00d1e3_hero verge-p-800.png">
                <img class="img-fluid img-rodando-2" src="../assets/imgs/63ebce23e53ac60a7fa7bd43_hero youtube.png">
                <img class="img-fluid img-rodando-3" src="../assets/imgs/Insta.png">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import { Alert } from '@/interfaces/Alert'
import Alerta from '@/components/Alerta.vue'
import { mapActions } from 'vuex'

@Options({
    components: {
        Alerta
    },

    methods: {
        ...mapActions(['login'])
    }
})

export default class Login extends Vue {

    email = ''
    senha = ''
    mostrar_senha = false

    //mensagem_alerta
    mensagem_alerta: Alert | null = null

    //mapeando ações do vuex
    private login!: () => Promise<void>

    //alternar exibiçao da senha
    alternarExibicaoSenha() {
        this.mostrar_senha = !this.mostrar_senha
    }

    //fazer login
    async fazerLogin() {
        if (!this.email || !this.senha) {
            this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', 'Por favor, preencha todos os campos.', 'alert-error')
            return
        }

        try {
            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/login.php', {
                email: this.email,
                senha: this.senha
            })

            if (response.data.success) {

                sessionStorage.setItem('mensagem_alerta', JSON.stringify({
                    icone: 'fa-solid fa-check-circle',
                    mensagem: response.data.message,
                    status: 'alert-sucesso'
                }))
                this.$router.push('/pagina-usuario')

            } else {
                this.mostrarMensagemAlerta('fa-solid fa-exclamation-circle', response.data.message, 'alert-error')
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error)
            alert('Ocorreu um erro ao tentar fazer login.')
        }
    }

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

<style lang="scss" scoped>
@import '../scss/forms.scss';
</style>
