<template>
    <footer class="mb-3 footer d-flex justify-content-center align-items-center">
    <div class="footer-content row">
        <div class="col-md-4">
            <button class="btn btn-share">Share my Bioohub</button>
        </div>
        <div class="col-md-4 d-flex justify-content-center">
            <i class="fa-solid fa-link fa-2x me-2 icone" title="Add link" style="color: #000000;"></i>
            <i class="fa-solid fa-mountain-sun fa-2x me-2 icone" title="Add image or video" style="color: #5c2500;"></i>
            <i class="fa-solid fa-quote-left fa-2x me-2 icone" title="Add text" style="color: #74C0FC;"></i>
            <i class="fa-solid fa-map-pin fa-2x me-2 icone" title="Add a map" style="color: #63E6BE;"></i>
            <i class="fa-solid fa-keyboard fa-2x me-2 icone" title="Selection title" style="color: #000000;"></i>
        </div>
        <div class="col-md-4">
            <i class="fa-solid fa-display fa-2x me-2 screen" title="PC screen" style="color: #000000;"></i>
            <i class="fa-solid fa-mobile-screen-button fa-2x me-2 screen" title="Mobile screen" style="color: #000000;"></i>
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
