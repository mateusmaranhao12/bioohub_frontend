<template>
    <div class="container pagina-usuario">
        <div class="row">

            <!-- Mensagem de erro -->
            <div v-if="!usuarioEncontrado">
                <div class="alert alert-error mt-3" role="alert">
                    <h4 class="alert-heading">Opss!</h4>
                    <p>Este usuário não existe :/</p>
                    <hr>
                    <button type="button" class="btn btn-error" @click="voltarPaginaAnterior()">Voltar para a página
                        anterior</button>
                </div>
            </div>

            <!-- Coluna Dados -->
            <div class="col-md-6 mt-5 d-flex flex-column align-items-center text-center d-md-block">
                <div v-if="usuarioEncontrado"
                    class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center">
                    <img src="../assets/imgs/11a570b9-08cb-461b-bef6-5b83e8a7f991.jpeg" alt="Avatar"
                        class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover" />
                </div>

                <div v-if="usuarioEncontrado" class="mt-4 animate__animated animate__zoomIn w-100">
                    <h2 class="text-start text-md-start text-center">Mateus Maranhao</h2>
                </div>

                <div v-if="usuarioEncontrado" class="mt-2 animate__animated animate__zoomIn w-100">
                    <p class="text-start text-md-start text-center" style="color: rgb(190, 190, 190)">
                        lorem ipsum dolor sit amet
                    </p>
                </div>
            </div>

            <!-- Coluna Links -->
            <div v-if="usuarioEncontrado" class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <div
                        class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative">
                        <i class="fa-solid fa-mountain fa-2x"></i>
                    </div>

                    <div
                        class="animate__animated animate__zoomIn card link-card card-redes-sociais d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-globe fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-video d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-video fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-maps d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                    </div>
                    <div
                        class="animate__animated animate__zoomIn card link-card card-links-livres d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-share-alt fa-2x"></i>
                    </div>
                </div>
            </div>

            <!-- Botão Criar Bioohub no canto inferior esquerdo -->
            <div v-if="usuarioEncontrado"
                class="animate__animated animate__zoomIn d-flex justify-content-center mt-5 mb-3">
                <router-link to="/cadastro" class="btn btn-bioohub">Criar meu Bioohub</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
    components: {},
})
export default class Usuario extends Vue {
    public username: string | null = null;
    public usuarioEncontrado = true;

    // Função que irá fazer a verificação do usuário
    public fetchUserData(username: string) {
        console.log('Buscando dados do usuário:', username);

        // Verifica no backend se o usuário existe
        axios
            .get(
                `http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${username}`
            )
            .then((response) => {
                console.log('Resposta da API:', response.data);

                if (response.data && response.data.usuario) {
                    console.log('Usuário encontrado:', response.data.usuario);
                    this.username = username;
                    this.usuarioEncontrado = true; // Usuário encontrado
                } else {
                    console.log('Usuário não encontrado.');
                    this.usuarioEncontrado = false; // Marca como não encontrado
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                this.usuarioEncontrado = false; // Marca como não encontrado em caso de erro
            });
    }

    created() {
        const username = this.$route.params.username;
        console.log('Nome de usuário na rota:', username);

        // Verifica se o username é uma string ou um array de strings e obtém o valor correto
        const usernameValue = Array.isArray(username) ? username[0] : username;

        if (usernameValue) {
            this.fetchUserData(usernameValue); // Chama a função para buscar os dados do usuário
        } else {
            console.log('Nome de usuário não encontrado na URL.');
            this.usuarioEncontrado = false; // Marca como não encontrado caso o nome não esteja na URL
        }
    }

    voltarPaginaAnterior() { //voltar para a pagina que estava anteriormente
        this.$router.go(-1)
    }
}
</script>

<style lang="scss">
@import '../scss/pagina_usuario.scss';

.btn-error {
    background-color: white;
    color: rgb(182, 0, 0);

    &:hover {
        border: 1px solid white;
    }
}
</style>
