<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="row w-75">

            <!--Alerta de erro ou de sucesso-->
            <div class="col-md-12 d-flex justify-content-center mt-2">
                <Alerta :mensagem_alerta="mensagem_alerta" />
            </div>

            <!-- Etapa 1 -->
            <div v-if="etapa === 1"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"
                class="cadastro">

                <div class="row">

                    <div class="col-md-6">
                        <h2 class="animate__animated animate__zoomIn h2-cadastro mb-3">Primeiro, escolha seu link
                            exclusivo
                        </h2>
                        <h5 class="animate__animated animate__zoomIn h5-cadastro">Os bons ainda estão disponíveis!
                        </h5>

                        <form @submit.prevent="proximaEtapa">
                            <div class="animate__animated animate__zoomIn input-name input-group mb-3">
                                <span class="input-group-text">bioohub.me/</span>
                                <input @input="validarUsuario" v-model="usuarios.usuario" type="text"
                                    class="form-control" placeholder="usuario" aria-label="Username">
                            </div>
                            <span :style="{ color: corMensagemUsuario }">{{ mensagemUsuario }}</span>

                            <div class="d-grid gap-2">
                                <button
                                    class="mt-2 animate__animated animate__zoomIn btn btn-secondary btn-form">Próxima
                                    etapa</button>
                            </div>
                        </form>

                        <div class="d-flex justify-content-start">
                            <router-link to="/login"
                                class="animate__animated animate__zoomIn botao-login-tela-cadastro">
                                Ou faça log-in
                            </router-link>
                        </div>
                    </div>

                    <div class="d-none d-md-block col-md-6">
                        <GrabLink />
                    </div>
                </div>
            </div>


            <!-- Etapa 2 -->
            <div v-if="etapa === 2" class="row cadastro"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }">
                <!-- Adicionado row aqui -->
                <div class="col-md-6 mb-2">
                    <div class="d-flex justify-content-start">
                        <button class="arrow-left" @click="etapaAnterior()">
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                    </div>
                    <h2 class="mb-5">Insira seu e-mail e senha</h2>

                    <form @submit.prevent="proximaEtapa">
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <input v-model="usuarios.email" type="text" class="form-control" placeholder="e-mail"
                                    aria-label="E-mail">
                            </div>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <input @input="validarSenha" v-model="usuarios.senha"
                                        :type="mostrar_senha ? 'text' : 'password'" class="form-control"
                                        placeholder="senha" aria-label="Senha">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="alternarExibicaoSenha">
                                        <i :class="mostrar_senha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </button>
                                </div>
                                <span :style="{ color: corMensagemSenha }">{{ mensagemSenha }}</span>
                            </div>
                        </div>

                        <div class="d-grid gap-2 mt-3">
                            <button class="btn btn-secondary">Criar conta</button>
                        </div>

                        <div class="mt-3 mb-3">
                            <h6>Ou</h6>
                        </div>

                        <div class="d-grid gap-2 mt-2 mb-2">
                            <button class="btn btn-primary">
                                <i class="fa-brands fa-google"></i> Cadastre-se com o Google
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Adicionando o img-rodando na mesma linha -->
                <div class="col-md-6 d-none d-md-block img-rodando animate__animated animate__zoomIn">
                    <img class="img-fluid img-rodando-2" src="../assets/imgs/63ebce23e53ac60a7fa7bd43_hero youtube.png">
                    <img class="img-fluid img-rodando-3" src="../assets/imgs/Insta.png">
                </div>
            </div>

            <!-- Etapa 3 (Planos) -->
            <div v-if="etapa === 3"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"
                class="cadastro col-md-12 mt-3 mb-3">

                <Planos />

                <!-- Botões de Skip e Next -->
                <div class="d-flex mt-3">
                    <button class="btn btn-light flex-grow-1 me-1" @click="etapaAnterior()">Voltar</button>
                    <button class="btn btn-dark flex-grow-1" @click="proximaEtapa()">Próxima</button>
                </div>

            </div>

            <!-- Etapa 4 (Redes sociais) -->
            <div v-if="etapa === 4"
                :class="{ 'animate__animated animate__fadeOutLeft': animacaoSaida, 'animate__animated animate__fadeInRight': animacaoEntrada }"
                class="cadastro col-md-12">

                <!--Funcao cadastrar usuario-->
                <RedesSociais @cadastrar="cadastrarUsuario()" />

            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Planos from '../components/Planos.vue'
import RedesSociais from '@/components/RedesSociais.vue'
import Alerta from '@/components/Alerta.vue'
import GrabLink from '@/components/GrabLink.vue'
import axios from 'axios'
import { Alert } from '@/interfaces/Alert'

@Options({
    components: {
        Alerta,
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

    //usuarios
    usuarios = {
        usuario: '',
        email: '',
        senha: ''
    }

    //mensagem_alerta
    mensagem_alerta: Alert | null = null

    //mensagens de validação de senha
    mensagemSenha = ''
    corMensagemSenha = 'black'

    //mensagens de validação de usuario
    mensagemUsuario = ''
    corMensagemUsuario = 'black'

    //mensagem de erro de usuario ou email ja em uso
    mensagemErroUsuario = ''
    mensagemErroEmail = ''

    public cadastrarUsuario() { //cadastrar usuario

        //responde ao servidor localhost
        /*axios.post('http://localhost/Projetos/bioohub/backend/api/cadastrar_usuario.php', {
            usuario: this.usuarios.usuario,
            email: this.usuarios.email,
            senha: this.usuarios.senha
        })*/

        //responde ao servidor cpanel
        axios.post('https://bioohub.me/src/backend/api/cadastrar_usuario.php', {
            usuario: this.usuarios.usuario,
            email: this.usuarios.email,
            senha: this.usuarios.senha
        })
            .then(response => {
                console.log('usuario cadastrado: ', response.data)

                // Armazena o email do usuário no sessionStorage
                sessionStorage.setItem('user_email', this.usuarios.email)

                // Armazena a mensagem de sucesso no sessionStorage
                sessionStorage.setItem('mensagem_alerta', JSON.stringify({
                    icone: 'fa-solid fa-check-circle',
                    mensagem: response.data.message,
                    status: 'alert-sucesso'
                }))

                // Redireciona para PaginaUsuario
                this.$router.push('/pagina-usuario')
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log('erro ao cadastrar usuario: ', error.response.data);
                    this.mostrarMensagemAlerta('fa-solid fa-circle-info', error.response.data.message, 'alert-error')
                } else {
                    console.log('Erro inesperado:', error)
                    this.mostrarMensagemAlerta('fa-solid fa-circle-info', 'Erro inesperado. Tente novamente.', 'alert-error')
                }
            })
    }

    //validar email
    public validarEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    //validar senha
    public validarSenha() {

        const senha = this.usuarios.senha
        if (senha.length < 5) {
            this.mensagemSenha = 'Senha fraca'
            this.corMensagemSenha = 'red'
        } else if (senha.length >= 5 && senha.length < 8) {
            this.mensagemSenha = 'Vulnerável'
            this.corMensagemSenha = 'orange'
        } else if (senha.length >= 10 && !/[A-Z]/.test(senha)) {
            this.mensagemSenha = 'Forte'
            this.corMensagemSenha = 'green'
        } else if (senha.length >= 10 && /[A-Z]/.test(senha) && /[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            this.mensagemSenha = 'Senha muito forte'
            this.corMensagemSenha = 'darkgreen'
        } else if (senha.length >= 10) {
            this.mensagemSenha = 'Forte'
            this.corMensagemSenha = 'green'
        }

    }

    //validar usuario
    public validarUsuario() {

        const usuario = this.usuarios.usuario
        if (usuario.length < 4) {
            this.mensagemUsuario = 'Usuário muito curto'
            this.corMensagemUsuario = 'red'
        } else if (usuario.length >= 4) {
            this.mensagemUsuario = 'Usuário válido'
            this.corMensagemUsuario = 'green'
        }

    }

    //alternar exibicao da senha
    public alternarExibicaoSenha() {
        this.mostrar_senha = !this.mostrar_senha
    }

    public proximaEtapa() { //proxima etapa
        this.validarDados()
            .then(() => {
                // Avança para a próxima etapa se a validação for bem-sucedida
                this.animacaoSaida = true
                setTimeout(() => {
                    this.etapa++
                    this.animacaoSaida = false
                    this.animacaoEntrada = true
                }, 1000)
            })
            .catch((error) => {
                // Mensagem de erro já exibida dentro do método validarDados()
                console.log(error)
            })
    }

    public validarDados(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Verificação da etapa 1 (usuário)
            if (this.etapa === 1) {
                if (this.usuarios.usuario.length < 4) {
                    this.mensagemErroUsuario = 'Insira um nome de usuário com no mínimo 4 caracteres!'
                    this.mensagemErroEmail = ''
                    this.mostrarMensagemAlerta('fa-solid fa-circle-info', this.mensagemErroUsuario, 'alert-error')
                    return reject(new Error(this.mensagemErroUsuario))
                } else {
                    this.mensagemErroUsuario = ''
                }
            }

            // Verificação da etapa 2 (e-mail e senha)
            if (this.etapa === 2) {
                if (!this.validarEmail(this.usuarios.email)) {
                    this.mensagemErroEmail = 'Insira um e-mail válido!'
                    this.mensagemErroUsuario = ''
                    this.mostrarMensagemAlerta('fa-solid fa-circle-info', this.mensagemErroEmail, 'alert-error')
                    return reject(new Error(this.mensagemErroEmail))
                } else {
                    this.mensagemErroEmail = ''
                }

                if (this.usuarios.senha.length < 5) {
                    this.mensagemErroEmail = ''
                    this.mensagemErroUsuario = ''
                    this.mostrarMensagemAlerta('fa-solid fa-circle-info', 'Insira uma senha com no mínimo 5 caracteres!', 'alert-error')
                    return reject(new Error('Insira uma senha com no mínimo 5 caracteres!'))
                }

                // Verificação se o usuário ou e-mail já existe
                //responde ao servidor localhost

                /*axios.post('http://localhost/Projetos/bioohub/backend/api/verificar_usuario.php', {
                    usuario: this.usuarios.usuario,
                    email: this.usuarios.email
                })*/

                //responde ao servidor no cpanel
                axios.post('https://bioohub.me/src/backend/api/verificar_usuario.php', {
                    usuario: this.usuarios.usuario,
                    email: this.usuarios.email
                })


                    .then(response => {
                        resolve() // Se a verificação for bem-sucedida
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                            this.mensagemErroEmail = error.response.data.message
                            this.mensagemErroUsuario = ''
                            this.mostrarMensagemAlerta('fa-solid fa-circle-info', this.mensagemErroEmail, 'alert-error')
                            return reject(new Error(this.mensagemErroEmail)) // Rejeita a promise sem logar no console
                        }
                    })

                return
            }

            // Se todas as validações passarem, resolve a Promise
            resolve()
        })
    }


    //etapa anterior
    public etapaAnterior() {
        this.animacaoSaida = true
        setTimeout(() => {
            this.etapa--
            this.animacaoSaida = false
            this.animacaoEntrada = true
        }, 1000)
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

<style lang="scss">
@import '../scss/forms.scss';
</style>
