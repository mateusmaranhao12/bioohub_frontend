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
                    <img :src="fotoPerfil || require('@/assets/imgs/default-image.png')"
                        class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover" />
                </div>

                <div v-if="usuarioEncontrado" class="mt-4 animate__animated animate__zoomIn w-100">
                    <h2 class="text-start text-md-start text-center">{{ nome }}</h2>
                </div>

                <div v-if="usuarioEncontrado" class="mt-2 animate__animated animate__zoomIn w-100">
                    <p class="text-start text-md-start text-center" style="color: rgb(190, 190, 190)">
                        {{ descricao }}
                    </p>
                </div>
            </div>

            <!-- Coluna Links -->
            <div v-if="usuarioEncontrado" class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <!--Titulos-->
                    <div v-for="(titulo, index) in titulos" :key="index"
                        class="animate__animated animate__zoomIn col-md-12">
                        <h1 class="titulo-footer">{{ titulo.titulo }}</h1>
                    </div>

                    <!--Notas-->
                    <div v-for="(nota, index) in notas" :key="index"
                        class="animate__animated animate__zoomIn col-md-12">
                        <p class="nota-display">{{ nota.nota }}</p>
                    </div>

                    <!-- Imagens -->
                    <div
                        class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative">
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

    public username: string | null = null
    public usuarioEncontrado = true
    public fotoPerfil: string | null = null
    public nome: string | null = null
    public descricao: string | null = null
    public titulos: Array<{ titulo: string }> = []
    public notas: Array<{ nota: string }> = []
    public imagens: string | null = null

    created() {
        // Obter o nome de usuário da URL
        const username = this.$route.params.username;

        if (typeof username === 'string') {
            console.log('Nome de usuário:', username);
            this.fetchUserData(username); // Chama a função com uma string válida
        } else {
            console.log('Nome de usuário não encontrado ou é inválido.');
            this.usuarioEncontrado = false;
        }
    }

    public fetchUserData(username: string) {
        // Verifica no backend se o usuário existe
        axios
            .get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${username}`)
            .then((response) => {
                if (response.data && response.data.usuario) {
                    this.username = username;
                    this.usuarioEncontrado = true;

                    // Atribuindo os dados do perfil retornados
                    const perfil = response.data.perfil;
                    const titulos = response.data.titulos;
                    const notas = response.data.notas;
                    const imagens = response.data.imagens;  // Aqui vamos trabalhar com apenas uma imagem

                    if (perfil) {
                        // Lógica para foto de perfil
                        this.fotoPerfil = perfil.foto_perfil ?
                            `data:image/jpeg;base64,${perfil.foto_perfil}` : null;
                        console.log('foto de perfil: ', perfil.foto_perfil);
                        this.nome = perfil.nome || '';
                        this.descricao = perfil.descricao || '';
                    } else {
                        console.log('Perfil não encontrado.');
                    }

                    if (titulos) {
                        this.titulos = titulos;
                    }

                    if (notas) {
                        this.notas = notas;
                    }

                } else {
                    this.usuarioEncontrado = false;
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                this.usuarioEncontrado = false; // Marca como não encontrado em caso de erro
            });
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
