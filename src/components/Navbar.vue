<template>
    <ul class="animate__animated animate__fadeInDownBig nav navbar-bioohub justify-content-center">
        <li class="nav-item">
            <h2 class="nav-link" href="#">Big news! Linktree acquired Bioohub! <i class="fa-solid fa-arrow-right"></i></h2>
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {}
})

export default class Navbar extends Vue {

}

</script>

<style lang="scss">
@import '../scss/navbar.scss';
</style>