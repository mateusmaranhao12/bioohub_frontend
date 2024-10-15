<template>
    <div class="container pagina-usuario">
        <!-- Spinner de loading -->
        <div v-if="carregando" class="loading-spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Carregando...</span>
            </div>
        </div>

        <div v-else class="row">

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
            <div v-if="usuarioEncontrado"
                class="col-md-6 mt-5 d-flex flex-column align-items-center text-center d-md-block">
                <div
                    class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center">
                    <img :src="fotoPerfil || require('@/assets/imgs/default-image.png')"
                        class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover" />
                </div>

                <div class="mt-4 animate__animated animate__zoomIn w-100">
                    <h2 class="text-start text-md-start text-center">{{ nome }}</h2>
                </div>

                <div class="mt-2 animate__animated animate__zoomIn w-100">
                    <p class="text-start text-md-start text-center" style="color: rgb(190, 190, 190)">
                        {{ descricao }}
                    </p>
                </div>
            </div>

            <!-- Coluna Links -->
            <div v-if="usuarioEncontrado" class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <!-- Titulos -->
                    <div v-for="(titulo, index) in titulos" :key="index"
                        class="animate__animated animate__zoomIn col-md-12">
                        <h1 class="titulo-footer">{{ titulo.titulo }}</h1>
                    </div>

                    <!-- Notas -->
                    <div v-for="(nota, index) in notas" :key="index"
                        class="animate__animated animate__zoomIn col-md-12">
                        <p class="nota-display">{{ nota.nota }}</p>
                    </div>

                    <!-- Notas Footer -->
                    <div v-for="(nota, index) in notas_footer" :key="index"
                        class="animate__animated animate__zoomIn col-md-12">
                        <p class="nota-display">{{ nota.nota }}</p>
                    </div>

                    <!-- Imagens -->
                    <div v-for="(imagem, index) in imagens" :key="index"
                        class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative">
                        <img style="border-radius: 18px;" :src="imagem.imagem" class="img-fluid w-100 h-100" />
                    </div>

                    <!-- Imagens Footer -->
                    <div v-for="(imagem_footer, index) in imagens_footer" :key="index"
                        class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative">
                        <img style="border-radius: 18px;" :src="imagem_footer.imagem" class="img-fluid w-100 h-100" />
                    </div>

                    <!-- Mapa -->
                    <div v-for="(mapa, index) in mapas" :key="index"
                        class="animate__animated animate__zoomIn card link-card card-redes-sociais d-flex flex-column align-items-center justify-content-center">
                        <h6>{{ mapa.nome }}</h6>
                        <button class="btn btn-danger" @click="abrirMapaGoogleMaps(mapa.mapa_url)">
                            <i class="fa-solid fa-location-dot" style="color: white;"></i> Ver localização
                        </button>
                    </div>

                    <!--Mapa Footer-->
                    <div v-for="(mapa_footer, index) in mapas_footer" :key="index"
                        class="animate__animated animate__zoomIn card link-card card-redes-sociais d-flex flex-column align-items-center justify-content-center">
                        <h6>{{ mapa_footer.titulo }}</h6>
                        <button class="btn btn-danger" @click="abrirMapaGoogleMaps(mapa_footer.url)">
                            <i class="fa-solid fa-location-dot" style="color: white;"></i> Ver localização
                        </button>
                    </div>

                    <!-- Video -->
                    <div v-if="usuarioEncontrado && videos.length"
                        class="animate__animated animate__zoomIn card link-card card-video d-flex flex-column align-items-center justify-content-center">
                        <div v-for="(video, index) in videos" :key="index" class="video-container">
                            <!-- Criando o iframe com o link do YouTube -->
                            <iframe v-bind:src="'https://www.youtube.com/embed/' + getYouTubeVideoId(video.video_url)"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen class="youtube-iframe"></iframe>
                        </div>
                    </div>

                    <!--Redes Sociais-->
                    <div v-for="(rede_social, index) in redes_sociais" :key="index" class="animate__animated animate__zoomIn card link-card card-redes-sociais 
                        d-flex flex-column align-items-center justify-content-center">

                        <!-- Exibe o nome da rede social -->
                        <p class="mt-2">{{ getNomeRedeSocial(rede_social.url) }}</p>

                        <!-- Exibe o ícone da rede social -->
                        <i :class="`fa-brands fa-${detectarRedeSocial(rede_social.url)} fa-2x`"
                            v-if="detectarRedeSocial(rede_social.url)"></i>
                        <i class="fa-solid fa-link fa-2x" v-else></i>
                        <!-- Ícone genérico caso a rede social não seja detectada -->

                        <!-- Botão para abrir o link da rede social -->
                        <button @click="abrirLink(rede_social.url)" class="btn btn-dark mt-3">
                            Ir para o link
                        </button>
                    </div>

                    <!--Links aleatorios-->
                    <div v-for="(link, index) in links_aleatorios" :key="index" class="animate__animated animate__zoomIn card link-card card-links-livres 
                        d-flex flex-column align-items-center justify-content-center">

                        <!-- Exibe o nome da rede social -->
                        <p class="mt-2">{{ getNomeRedeSocial(link.url) }}</p>

                        <!-- Exibe o ícone da rede social -->
                        <i :class="`fa-brands fa-${detectarRedeSocial(link.url)} fa-2x`"
                            v-if="detectarRedeSocial(link.url)"></i>
                        <i class="fa-solid fa-link fa-2x" v-else></i>

                        <!-- Botão para abrir o link da rede social -->
                        <button @click="abrirLink(link.url)" class="btn btn-dark mt-3">
                            Ir para o link
                        </button>
                    </div>

                    <!--Links Footer-->
                    <div v-for="(link, index) in links_footer" :key="index" class="animate__animated animate__zoomIn card link-card card-links-livres 
                        d-flex flex-column align-items-center justify-content-center">

                        <!-- Exibe o nome da rede social -->
                        <p class="mt-2">{{ getNomeRedeSocial(link.url) }}</p>

                        <!-- Exibe o ícone da rede social -->
                        <i :class="`fa-brands fa-${detectarRedeSocial(link.url)} fa-2x`"
                            v-if="detectarRedeSocial(link.url)"></i>
                        <i class="fa-solid fa-link fa-2x" v-else></i>

                        <!-- Botão para abrir o link da rede social -->
                        <button @click="abrirLink(link.url)" class="btn btn-dark mt-3">
                            Ir para o link
                        </button>
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
    public notas_footer: Array<{ nota: string }> = []
    public imagens: Array<{ imagem: string }> = []
    public imagens_footer: Array<{ imagem: string }> = []
    public videos: Array<{ video_url: string }> = []
    public mapas: Array<{ mapa_url: string, nome: string }> = []
    public mapas_footer: Array<{ url: string, titulo: string }> = []
    public redes_sociais: Array<{ url: string }> = []
    public links_aleatorios: Array<{ url: string }> = []
    public links_footer: Array<{ url: string }> = []

    public carregando = true // Variável para controlar o estado de carregamento

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

        this.redes_sociais = [
            { url: 'https://www.instagram.com/user' },
            { url: 'https://github.com/user' },
            { url: 'https://www.linkedin.com/in/user' }
        ];
    }

    // Método para obter o ID do vídeo a partir da URL do YouTube
    public getYouTubeVideoId(url: string): string {
        const videoId = url.split('v=')[1];
        return videoId ? videoId.split('&')[0] : '';
    }

    public fetchUserData(username: string) {
        // Verifica no backend se o usuário existe
        axios
            .get(`http://localhost/Projetos/bioohub/backend/api/usuario.php?username=${username}`)
            .then((response) => {
                this.carregando = false; // Desabilita o carregamento após a resposta
                if (response.data && response.data.usuario) {
                    this.username = username;
                    this.usuarioEncontrado = true;

                    // Atribuindo os dados do perfil retornados
                    const perfil = response.data.perfil
                    const titulos = response.data.titulos
                    const notas = response.data.notas
                    const videos = response.data.videos || []
                    const imagens = response.data.imagens || []
                    const imagens_footer = response.data.imagens_footer || []
                    const mapas = response.data.mapas || []
                    const mapas_footer = response.data.mapas_footer || []
                    const redes_sociais = response.data.redes_sociais || []
                    const links_aleatorios = response.data.links_aleatorios || []
                    const links_footer = response.data.links_footer || []
                    const notas_footer = response.data.notas_footer || []

                    // Verifica se há algum dado importante (links, imagens, vídeos, etc.)
                    if (perfil) {
                        this.fotoPerfil = perfil.foto_perfil ? `data:image/jpeg;base64,${perfil.foto_perfil}` : null;
                        this.nome = perfil.nome || '';
                        this.descricao = perfil.descricao || '';
                    }

                    // Atualiza os outros dados do perfil
                    this.titulos = titulos || []
                    this.notas = notas || []
                    this.videos = videos
                    this.imagens = imagens.map((img: { imagem: any }) => ({ imagem: `data:image/jpeg;base64,${img.imagem}` })) || []
                    this.imagens_footer = imagens_footer.map((img: { imagem: any }) => ({ imagem: `data:image/jpeg;base64,${img.imagem}` })) || []
                    this.mapas = mapas || []
                    this.mapas_footer = mapas_footer || []
                    this.redes_sociais = redes_sociais || []
                    this.links_aleatorios = links_aleatorios || []
                    this.links_footer = links_footer || []
                    this.notas_footer = notas_footer || []

                    // Define que o usuário foi encontrado se houver dados relevantes
                    this.usuarioEncontrado =
                        Boolean(
                            this.fotoPerfil ||
                            this.nome ||
                            this.descricao ||
                            this.imagens.length ||
                            this.videos.length ||
                            this.links_aleatorios.length ||
                            this.redes_sociais.length ||
                            this.mapas.length ||
                            this.links_footer.length ||
                            this.notas_footer.length
                        );

                } else {
                    this.usuarioEncontrado = false;
                }
            })
            .catch((error) => {
                this.carregando = false; // Desabilita o carregamento mesmo em caso de erro
                console.error('Erro na requisição:', error);
                this.usuarioEncontrado = false; // Marca como não encontrado em caso de erro
            });
    }

    voltarPaginaAnterior() { // Voltar para a página que estava anteriormente
        this.$router.go(-1);
    }

    // Método para abrir o Google Maps
    public abrirMapaGoogleMaps(mapaUrl: string) {
        // Verificar se o URL é válido antes de tentar abrir
        if (mapaUrl && mapaUrl.startsWith('https://www.google.com/maps')) {
            window.open(mapaUrl, '_blank');  // Abre o link em uma nova aba
        } else {
            console.error('URL do Google Maps inválido:', mapaUrl);
        }
    }

    public abrirLink(url: string) {
        if (url && url.startsWith('http')) {
            window.open(url, '_blank'); // Abre o link em uma nova aba
        } else {
            console.error('URL inválida:', url);
        }
    }

    // Função para detectar a rede social com base na URL e retornar o nome do ícone FontAwesome
    public detectarRedeSocial(url: string): string | null {
        if (/https?:\/\/(www\.)?instagram\.com\/[^/]+/.test(url)) {
            return 'instagram';
        } else if (/https?:\/\/(www\.)?github\.com\/[^/]+/.test(url)) {
            return 'github';
        } else if (/https?:\/\/(www\.)?linkedin\.com\/in\/[^/]+/.test(url)) {
            return 'linkedin';
        } else if (/https?:\/\/(www\.)?whatsapp\.com\/[^/]+/.test(url) || /https?:\/\/wa\.me\/[^/]+/.test(url)) {
            return 'whatsapp';
        } else if (/https?:\/\/(www\.)?pix\.br\/[^/]+/.test(url)) {
            return 'pix';
        } else if (/https?:\/\/(www\.)?twitter\.com\/[^/]+/.test(url)) {
            return 'twitter';
        } else if (/https?:\/\/(www\.)?tiktok\.com\/[^/]+/.test(url)) {
            return 'tiktok';
        } else if (/https?:\/\/(open\.)?spotify\.com\/[^/]+/.test(url)) {
            return 'spotify';
        } else if (/https?:\/\/(www\.)?youtube\.com\/[^/]+/.test(url)) {
            return 'youtube';
        } else if (/https?:\/\/(www\.)?vimeo\.com\/[^/]+/.test(url)) {
            return 'vimeo';
        } else if (/https?:\/\/(www\.)?substack\.com\/[^/]+/.test(url)) {
            return 'substack';
        } else if (/https?:\/\/(www\.)?medium\.com\/[^/]+/.test(url)) {
            return 'medium';
        } else if (/https?:\/\/(music\.)?apple\.com\/[^/]+/.test(url)) {
            return 'apple_music';
        } else if (/https?:\/\/(www\.)?soundcloud\.com\/[^/]+/.test(url)) {
            return 'soundcloud';
        } else if (/https?:\/\/(docs\.)?google\.com\/[^/]+/.test(url)) {
            return 'google_docs';
        } else if (/https?:\/\/(drive\.)?google\.com\/[^/]+/.test(url)) {
            return 'google_drive';
        } else if (/https?:\/\/(www\.)?notion\.so\/[^/]+/.test(url)) {
            return 'notion';
        } else if (/https?:\/\/(www\.)?calendly\.com\/[^/]+/.test(url)) {
            return 'calendly';
        } else if (/https?:\/\/(www\.)?producthunt\.com\/[^/]+/.test(url)) {
            return 'product_hunt';
        } else if (/https?:\/\/(www\.)?amazon\.com\/[^/]+/.test(url)) {
            return 'amazon';
        } else if (/https?:\/\/(calendar\.)?google\.com\/[^/]+/.test(url)) {
            return 'google_calendar';
        } else if (/https?:\/\/(www\.)?patreon\.com\/[^/]+/.test(url)) {
            return 'patreon';
        } else if (/https?:\/\/(www\.)?twitch\.tv\/[^/]+/.test(url)) {
            return 'twitch';
        } else if (/https?:\/\/(www\.)?paypal\.com\/[^/]+/.test(url)) {
            return 'paypal';
        } else if (/https?:\/\/(www\.)?kickstarter\.com\/[^/]+/.test(url)) {
            return 'kickstarter';
        } else if (/https?:\/\/(www\.)?shopify\.com\/[^/]+/.test(url)) {
            return 'shopify';
        } else if (/https?:\/\/(www\.)?gumroad\.com\/[^/]+/.test(url)) {
            return 'gumroad';
        } else if (/https?:\/\/(www\.)?eventbrite\.com\/[^/]+/.test(url)) {
            return 'eventbrite';
        } else if (/https?:\/\/(www\.)?discord\.com\/[^/]+/.test(url)) {
            return 'discord';
        } else if (/https?:\/\/(www\.)?reddit\.com\/r\/[^/]+/.test(url)) {
            return 'reddit';
        } else if (/portfolio/.test(url)) {
            return 'portfolio';
        } else if (/https?:\/\/(x\.com\/[^/]+|www\.x\.com\/[^/]+).*/.test(url)) {
            return 'x-twitter'
        } else {
            return null; // Genérico se não for reconhecida
        }
    }

    // Função para retornar o nome da rede social
    public getNomeRedeSocial(url: string): string {
        const nome = this.detectarRedeSocial(url);
        return nome ? nome.charAt(0).toUpperCase() + nome.slice(1) : '';
    }

}
</script>

<style lang="scss">
@import '../scss/pagina_usuario.scss';

.loading-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}

.spinner-border {
    width: 4rem;
    height: 4rem;
}

.btn-error {
    background-color: white;
    color: rgb(182, 0, 0);

    &:hover {
        border: 1px solid white;
    }
}
</style>
