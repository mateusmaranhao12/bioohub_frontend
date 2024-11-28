<template>
    <div class="modal fade" id="alterarUsuarioModal" tabindex="-1" aria-labelledby="alterarUsuarioModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="alterarUsuarioModalLabel">Alterar Nome de Usuário</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form v-if="!sucesso">
                        <div class="mb-3">
                            <label for="novoUsuario" class="form-label">Novo Nome de Usuário</label>
                            <input @input="validarUsuario" v-model="novoUsuario" type="text" class="form-control"
                                id="novoUsuario" placeholder="Digite seu novo nome de usuário">
                            <span :style="{ color: corMensagemUsuario }">{{ mensagemUsuario }}</span>
                        </div>
                        <div v-if="mensagemFeedback" :class="`text-${feedbackTipo}`">{{ mensagemFeedback }}</div>
                    </form>
                    <div v-else>
                        <p class="alert alert-sucesso text-center">Nome de usuário alterado com sucesso!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        v-if="!sucesso">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="alterarUsuario()" v-if="!sucesso">Salvar
                        alterações</button>
                    <button type="button" class="btn btn-success" @click="fecharModal()" v-if="sucesso">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'

@Options({})
export default class AlterarUsuario extends Vue {
    mensagemUsuario = ''
    corMensagemUsuario = 'black'
    novoUsuario = '' // Armazena o novo nome de usuário
    mensagemFeedback = '' // Mensagem de feedback para sucesso ou erro
    feedbackTipo = '' // Tipo da mensagem: 'success' ou 'danger'
    sucesso = false // Estado para controlar a exibição da mensagem de sucesso

    // Função para fazer a requisição ao backend e alterar o nome de usuário
    async alterarUsuario() {
        try {
            const userId = sessionStorage.getItem('user_id') // Obtém o ID do usuário do sessionStorage
            console.log('User ID:', userId) // Debug do ID do usuário
            console.log('Novo Usuário:', this.novoUsuario) // Debug do novo usuário

            if (!userId || !this.novoUsuario) {
                this.mostrarMensagemErro('Por favor, preencha o nome de usuário corretamente.', 'danger')
                return
            }

            if (this.novoUsuario.length < 4) {
                this.mostrarMensagemErro('Informe um nome de usuário com no mínimo 4 letras!', 'danger')
                return
            }

            // Criando o objeto para enviar como JSON
            const data = {
                id: userId,
                novoUsuario: this.novoUsuario,
            }

            const response = await axios.post('http://localhost/Projetos/bioohub/backend/api/alterar_dados.php', data, {
                headers: {
                    'Content-Type': 'application/json' // Certificando-se de que os dados são enviados como JSON
                }
            })

            console.log('Resposta da API:', response) // Log detalhado da resposta da API

            // Checa se a resposta contém a chave "success"
            if (response.data && response.data.success) {
                this.sucesso = true // Altera o estado para mostrar a mensagem de sucesso
                sessionStorage.setItem('user_name', this.novoUsuario) // Atualiza o nome de usuário no sessionStorage
                this.$emit('usuarioAlterado', this.novoUsuario) // Emite um evento para atualizar o nome na PaginaUsuario.vue
                this.novoUsuario = '' // Limpa o campo de input
            } else {
                // Caso contrário, mostra a mensagem de erro
                this.mostrarMensagemErro(response.data.message || 'Erro desconhecido ao alterar o nome de usuário.', 'danger')
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            this.mostrarMensagemErro('Ocorreu um erro ao tentar alterar o nome de usuário.', 'danger')
        }
    }

    // Fecha o modal
    fecharModal() {
        const modalElement = document.getElementById('alterarUsuarioModal')
        if (modalElement) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement)
            modalInstance?.hide()
            this.resetModal() // Reseta o modal ao fechá-lo
        }
    }

    // Reseta o estado do modal
    resetModal() {
        this.novoUsuario = ''
        this.mensagemUsuario = ''
        this.corMensagemUsuario = 'black'
        this.mensagemFeedback = ''
        this.feedbackTipo = ''
        this.sucesso = false // Reseta o estado de sucesso
    }

    // Valida o novo nome de usuário
    public validarUsuario() {
        const novoUsuario = this.novoUsuario
        if (novoUsuario.length < 4) {
            this.mensagemUsuario = 'Usuário muito curto'
            this.corMensagemUsuario = 'red'
        } else if (novoUsuario.length >= 4) {
            this.mensagemUsuario = 'Usuário válido'
            this.corMensagemUsuario = 'green'
        }
    }

    // Método para mostrar a mensagem de erro
    mostrarMensagemErro(mensagem: string, tipo: 'success' | 'danger') {
        this.mensagemFeedback = mensagem
        this.feedbackTipo = tipo // Define o tipo da mensagem
        setTimeout(() => {
            this.mensagemFeedback = '' // Limpa a mensagem após 5 segundos
        }, 5000);
    }
}
</script>
