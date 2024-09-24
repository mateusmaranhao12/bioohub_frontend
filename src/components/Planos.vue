<template>
    <div class="container mt-5">
        <div class="planos">
            <h2 class="text-center mb-4">Escolha seu plano</h2>

            <div class="row justify-content-center">
                <!-- Plano Free -->
                <div class="col-sm-6 col-md-4">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <h3 class="card-title">Plano free</h3>
                            <p class="card-text">Crie até 5 links.</p>
                            <p class="card-text">Anúncios serão exibidos.</p>
                            <p class="card-price">R$0/mensal</p>
                            <button class="btn btn-outline-dark">Começar</button>
                        </div>
                    </div>
                </div>

                <!-- Plano Pago Básico -->
                <div class="col-sm-6 col-md-4">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <h3 class="card-title">Plano básico</h3>
                            <p class="card-text">Crie até to 20 links.</p>
                            <p class="card-text">Sem anúncios</p>
                            <p class="card-price">R$5/mensal</p>
                            <button class="btn btn-primary">Selecionar plano</button>
                        </div>
                    </div>
                </div>

                <!-- Plano Pago Premium -->
                <div class="col-sm-6 col-md-4">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <h3 class="card-title">Plano premium</h3>
                            <p class="card-text">Links ilimitados</p>
                            <p class="card-text">Sem anúncios</p>
                            <p class="card-price">R$10/mensais</p>
                            <button class="btn btn-primary">Selecionar plano</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Planos extends Vue {}
</script>

<style lang="scss" scoped>
@import '../scss/forms.scss';
</style>
