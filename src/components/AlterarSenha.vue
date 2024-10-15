<template>
    <div class="modal fade" id="alterarSenhaModal" tabindex="-1" aria-labelledby="alterarSenhaModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="alterarSenhaModalLabel">Alterar Senha</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form v-if="!sucesso">
                        <div class="mb-3">
                            <label for="senhaAnterior" class="form-label">Senha anterior</label>
                            <input v-model="senhaAnterior" type="password" class="form-control" id="senhaAnterior"
                                placeholder="Digite sua senha anterior" required>
                        </div>
                        <div class="mb-3">
                            <label for="novaSenha" class="form-label">Nova Senha</label>
                            <input v-model="novaSenha" type="password" class="form-control" id="novaSenha"
                                placeholder="Digite sua nova senha" @input="validarSenha" required>
                            <span :style="{ color: corMensagemSenha }">{{ mensagemSenha }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="confirmarSenha" class="form-label">Confirmar Senha</label>
                            <input v-model="confirmarSenha" type="password" class="form-control" id="confirmarSenha"
                                placeholder="Confirme sua nova senha" required>
                        </div>
                        <div v-if="mensagemFeedback" :class="`text-${feedbackTipo}`">{{ mensagemFeedback }}</div>
                    </form>
                    <div v-else>
                        <p class="alert alert-success text-center">Senha alterada com sucesso!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        v-if="!sucesso">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="alterarSenha" v-if="!sucesso">Salvar
                        alterações</button>
                    <button type="button" class="btn btn-success" @click="fecharModal" v-if="sucesso">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'

@Options({})
export default class AlterarSenha extends Vue {
    senhaAnterior = ''
    novaSenha = ''
    confirmarSenha = ''
    mensagemSenha = ''
    corMensagemSenha = 'black'
    mensagemFeedback = ''
    feedbackTipo = ''
    sucesso = false

    validarSenha() {
        const senha = this.novaSenha
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

    async alterarSenha() {
        console.log('Tentando alterar a senha...')

        if (this.novaSenha !== this.confirmarSenha) {
            this.mostrarMensagemFeed('As senhas não coincidem.', 'danger')
            return
        }

        if (!this.senhaAnterior || !this.novaSenha || !this.confirmarSenha) {
            this.mostrarMensagemFeed('Por favor, preencha todos os campos.', 'danger')
            return
        }

        this.mostrarMensagemFeed('Iniciando a alteração da senha...', 'success')

        try {
            const userId = sessionStorage.getItem('user_id')
            const data = {
                id: userId,
                senhaAnterior: this.senhaAnterior,
                novaSenha: this.novaSenha,
            }

            const response = await axios.post('https://bioohub.me/src/backend/api/alterar_dados.php', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log('Resposta da API:', response.data)

            if (response.data && response.data.success) {
                this.sucesso = true // Altera o estado para mostrar a mensagem de sucesso
                this.novaSenha = '' // Limpa o campo de input
                this.confirmarSenha = '' // Limpa o campo de input
            } else {
                this.mostrarMensagemFeed(response.data.message || 'Erro desconhecido ao alterar a senha.', 'danger')
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            this.mostrarMensagemFeed('Ocorreu um erro ao tentar alterar a senha.', 'danger')
        }
    }

    fecharModal() {
        const modalElement = document.getElementById('alterarSenhaModal')
        if (modalElement) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement)
            modalInstance?.hide()
            this.resetModal() // Reseta o modal ao fechá-lo
        }
    }

    mostrarMensagemFeed(mensagem: string, tipo: 'success' | 'danger') {
        this.mensagemFeedback = mensagem
        this.feedbackTipo = tipo // Define o tipo da mensagem
        setTimeout(() => {
            this.mensagemFeedback = '' // Limpa a mensagem após 5 segundos
        }, 5000)
    }

    resetModal() {
        this.senhaAnterior = ''
        this.novaSenha = ''
        this.confirmarSenha = ''
        this.mensagemSenha = ''
        this.corMensagemSenha = 'black'
        this.mensagemFeedback = ''
        this.feedbackTipo = ''
        this.sucesso = false // Reseta o estado de sucesso
    }
}
</script>
