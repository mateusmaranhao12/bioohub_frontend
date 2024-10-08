<template>
    <footer class="mb-3 footer d-flex justify-content-center align-items-center">
        <div class="footer-content row">
            <div class="col-md-4">
                <button class="btn btn-share">Compartilhar</button>
            </div>
            <div class="col-md-4 d-flex justify-content-center">
                <img src="../assets/imgs/link-building.png" @click="adicionarLinkFooter" class="img-footer img-fluid"
                    title="Adicionar link">
                <img src="../assets/imgs/media.png" class="img-footer img-fluid" title="Adicionar imagem">
                <img src="../assets/imgs/pencil.png" class="img-footer img-fluid" title="Adicionar nota">
                <img src="../assets/imgs/location.png" class="img-footer img-fluid" title="Adicionar localização">
                <img src="../assets/imgs/title.png" class="img-footer img-fluid" title="Adicionar título">
            </div>
            <div class="col-md-4">
                <img src="../assets/imgs/activity-feed.png" class="img-fluid img-footer" title="Tela de PC"
                    @click="mostrarTelaComputador">
                <img src="../assets/imgs/smartphone.png" class="img-fluid img-footer" title="Tela Mobile"
                    @click="mostrarTelaCelular">
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Footer extends Vue {

    // Emitir evento para alternar a exibição de telas
    public adicionarLinkFooter() {
        this.$emit('adicionar-link-footer');
    }

    public mostrarTelaComputador() {
        this.$emit('mudar-tela', 'computador');
    }

    public mostrarTelaCelular() {
        this.$emit('mudar-tela', 'celular');
    }
}
</script>

<style lang="scss">
    @import '../scss/footer.scss';
</style>