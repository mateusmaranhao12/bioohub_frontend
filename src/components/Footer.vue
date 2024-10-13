<template>
    <footer class="mb-3 footer d-flex justify-content-center align-items-center">
        <div class="footer-content row">
            <div class="col-md-4">
                <button class="btn btn-share" @click="abrirModalCompartilhar">Compartilhar</button>
            </div>
            <div class="col-md-4 d-flex justify-content-center">
                <img src="../assets/imgs/link-building.png" @click="adicionarLinkFooter" class="img-footer img-fluid"
                    title="Adicionar link">
                <img src="../assets/imgs/media.png" @click="abrirSeletorImagemFooter" class="img-footer img-fluid"
                    title="Adicionar imagem">
                <img src="../assets/imgs/pencil.png" @click="adicionarNotaFooter" class="img-footer img-fluid"
                    title="Adicionar nota">
                <img src="../assets/imgs/location.png" @click="adicionarMapaFooter" class="img-footer img-fluid" title="Adicionar localização">
                <img src="../assets/imgs/title.png" @click="adicionarTituloFooter" class="img-footer img-fluid"
                    title="Adicionar título">
            </div>
            <div class="col-md-4 d-md-block d-none">
                <img src="../assets/imgs/activity-feed.png" class="img-fluid img-footer" title="Tela de PC"
                    @click="mostrarTelaComputador">
                <img src="../assets/imgs/smartphone.png" class="img-fluid img-footer" title="Tela Mobile"
                    @click="mostrarTelaCelular">
            </div>
        </div>

        <!-- Seletor de arquivo de imagem -->
        <input ref="imagemFooterInput" type="file" accept=".png, .jpg, .jpeg, .svg" style="display: none;"
            @change="emitirImagemSelecionada" />
    </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Footer extends Vue {

    // Função que abre o seletor de imagem
    public abrirSeletorImagemFooter() {
        const imagemFooterInput: HTMLInputElement = this.$refs.imagemFooterInput as HTMLInputElement;
        imagemFooterInput.click();  // Aciona o clique no input de arquivos
    }

    // Emite evento para o PaginaUsuario.vue quando a imagem for selecionada
    public emitirImagemSelecionada(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input?.files ? input.files[0] : null;

        if (file) {
            // Verifica se o arquivo é PNG, JPG ou SVG
            const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
            if (validTypes.includes(file.type)) {
                this.$emit('imagem-selecionada-footer', file);  // Emite evento para o PaginaUsuario
            } else {
                alert('Por favor, selecione um arquivo PNG, JPG, WEBP ou SVG.');
            }
        }
    }

    // Funções de outros eventos (como adicionar link, etc.)
    public adicionarLinkFooter() {
        this.$emit('adicionar-link-footer');
    }

    public adicionarTituloFooter() {
        this.$emit('adicionar-titulo-footer');
    }

    public adicionarNotaFooter() {
        this.$emit('adicionar-nota-footer');
    }

    public adicionarMapaFooter() {
        this.$emit('adicionar-mapa-footer');
    }

    public mostrarTelaComputador() {
        this.$emit('mudar-tela', 'computador');
    }

    public mostrarTelaCelular() {
        this.$emit('mudar-tela', 'celular');
    }

    public abrirModalCompartilhar() {
        this.$emit('abrir-modal-compartilhar');
    }
}
</script>

<style lang="scss">
@import '../scss/footer.scss';
</style>
