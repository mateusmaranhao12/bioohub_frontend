<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-error mt-3" role="alert">
                    <h4 class="alert-heading">Opss!</h4>
                    <p>A página que você digitou não existe :/</p>
                    <hr>
                    <button type="button" class="btn btn-error" @click="voltarPaginaAnterior()">Voltar para a página
                        inicial</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
})
export default class PaginaNaoEncontrada extends Vue {

    mounted() { //voltar para a pagina anterior em segundos...
        setTimeout(() => {
            this.voltarPaginaAnterior()
        }, 7000)
    }

    voltarPaginaAnterior() { //voltar para a pagina que estava anteriormente
        this.$router.go(-1)
    }
}
</script>

<style lang="scss">
@import '../scss/alerts.scss';

.btn-error {
    background-color: white;
    color: rgb(182, 0, 0);

    &:hover {
        border: 1px solid white;
    }
}
</style>