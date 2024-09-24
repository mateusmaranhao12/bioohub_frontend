<template>
    <footer class="mb-3 footer d-flex justify-content-center align-items-center">
    <div class="footer-content row">
        <div class="col-md-4">
            <button class="btn btn-share">Compartilhar</button>
        </div>
        <div class="col-md-4 d-flex justify-content-center">
            <i class="fa-solid fa-link fa-2x me-2 icone" title="Adicionar link" style="color: #000000;"></i>
            <i class="fa-solid fa-mountain-sun fa-2x me-2 icone" title="Adicionar imagem ou video" style="color: #5c2500;"></i>
            <i class="fa-solid fa-quote-left fa-2x me-2 icone" title="Adicionar texto" style="color: #74C0FC;"></i>
            <i class="fa-solid fa-map-pin fa-2x me-2 icone" title="Adicionar um mapa" style="color: #63E6BE;"></i>
            <i class="fa-solid fa-keyboard fa-2x me-2 icone" title="Selecionar titulo" style="color: #000000;"></i>
        </div>
        <div class="col-md-4">
            <i class="fa-solid fa-display fa-2x me-2 screen" title="Tela de PC" style="color: #000000;"></i>
            <i class="fa-solid fa-mobile-screen-button fa-2x me-2 screen" title="Tela de aparelhos menores" style="color: #000000;"></i>
        </div>
    </div>
</footer>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Footer extends Vue {}
</script>

<style lang="scss">
@import '../scss/footer.scss';
</style>