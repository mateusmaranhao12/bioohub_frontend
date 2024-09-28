<template>
    <div class="modal fade" id="alterarEmailModal" tabindex="-1" aria-labelledby="alterarEmailModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="alterarEmailModalLabel">Alterar E-mail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form v-if="!sucesso">
                        <div class="mb-3">
                            <label for="novoEmail" class="form-label">Novo E-mail</label>
                            <input v-model="novoEmail" type="email" class="form-control" id="novoEmail"
                                placeholder="Digite seu novo e-mail" @input="validarEmail">
                            <span :style="{ color: corMensagemEmail }">{{ mensagemEmail }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="confirmarEmail" class="form-label">Confirmar E-mail</label>
                            <input v-model="confirmarEmail" type="email" class="form-control" id="confirmarEmail"
                                placeholder="Confirme seu novo e-mail">
                        </div>
                        <div v-if="mensagemFeedback" :class="`text-${feedbackTipo}`">{{ mensagemFeedback }}</div>
                    </form>
                    <div v-else>
                        <p class="alert alert-success text-center">E-mail alterado com sucesso!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        v-if="!sucesso">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="alterarEmail" v-if="!sucesso">Salvar
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
export default class AlterarEmail extends Vue {
    novoEmail = ''
    confirmarEmail = ''
    mensagemEmail = ''
    corMensagemEmail = 'black'
    mensagemFeedback = ''
    feedbackTipo = ''
    sucesso = false

    validarEmail() {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regexEmail.test(this.novoEmail)) {
            this.mensagemEmail = 'E-mail inválido'
            this.corMensagemEmail = 'red'
        } else {
            this.mensagemEmail = 'E-mail válido'
            this.corMensagemEmail = 'green'
        }
    }

    async alterarEmail() {
        console.log('Tentando alterar o e-mail...')

        if (this.novoEmail !== this.confirmarEmail) {
            this.mostrarMensagemFeed('Os e-mails não coincidem.', 'danger')
            return
        }

        if (!this.novoEmail || !this.confirmarEmail) {
            this.mostrarMensagemFeed('Por favor, preencha todos os campos.', 'danger')
            return
        }

        this.mostrarMensagemFeed('Iniciando a alteração do e-mail...', 'success')

        try {
            const userId = sessionStorage.getItem('user_id')
            const data = {
                id: userId,
                novoEmail: this.novoEmail,
            }

            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/alterar_dados.php', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log('Resposta da API:', response.data)

            if (response.data && response.data.success) {
                this.sucesso = true // Altera o estado para mostrar a mensagem de sucesso
                sessionStorage.setItem('user_email', this.novoEmail) // Atualiza o e-mail no sessionStorage
                this.$emit('emailAlterado', this.novoEmail)
                this.novoEmail = '' // Limpa o campo de input
                this.confirmarEmail = '' // Limpa o campo de input
            } else {
                this.mostrarMensagemFeed(response.data.message || 'Erro desconhecido ao alterar o e-mail.', 'danger')
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            this.mostrarMensagemFeed('Ocorreu um erro ao tentar alterar o e-mail.', 'danger')
        }
    }

    fecharModal() {
        const modalElement = document.getElementById('alterarEmailModal')
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
        this.novoEmail = ''
        this.confirmarEmail = ''
        this.mensagemEmail = ''
        this.corMensagemEmail = 'black'
        this.mensagemFeedback = ''
        this.feedbackTipo = ''
        this.sucesso = false // Reseta o estado de sucesso
    }
}
</script>
