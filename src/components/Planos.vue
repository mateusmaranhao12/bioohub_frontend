<template>
    <div class="container mt-5">
        <div class="planos">
            <h2 class="text-center mb-4">Choose Your Plan</h2>

            <div class="row justify-content-center">
                <!-- Plano Free -->
                <div class="col-sm-6 col-md-4">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <h3 class="card-title">Free Plan</h3>
                            <p class="card-text">Create up to 5 links.</p>
                            <p class="card-text">Ads will be displayed.</p>
                            <p class="card-price">R$0/month</p>
                            <button class="btn btn-outline-dark">Get Started</button>
                        </div>
                    </div>
                </div>

                <!-- Plano Pago Básico -->
                <div class="col-sm-6 col-md-4">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <h3 class="card-title">Basic Plan</h3>
                            <p class="card-text">Create up to 20 links.</p>
                            <p class="card-text">No ads.</p>
                            <p class="card-price">R$5/month</p>
                            <button class="btn btn-primary">Select Plan</button>
                        </div>
                    </div>
                </div>

                <!-- Plano Pago Premium -->
                <div class="col-sm-6 col-md-4">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <h3 class="card-title">Premium Plan</h3>
                            <p class="card-text">Unlimited links.</p>
                            <p class="card-text">No ads.</p>
                            <p class="card-price">R$10/month</p>
                            <button class="btn btn-primary">Select Plan</button>
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
