<template>
    <div
        class="animate__animated animate__zoomIn card link-card card-maps d-flex flex-column align-items-center justify-content-center position-relative">
        <!-- Ícone de adicionar localização (fa-plus) -->
        <div class="plus-icon position-absolute" v-if="!mostrar_input_maps">
            <i class="fa-solid fa-plus" style="color: black;" @click="emitirMostrarInputMaps"></i>
        </div>

        <!-- Ícone de remover localização -->
        <div class="plus-icon position-absolute" v-if="mostrar_maps">
            <i class="fa-solid fa-trash" @click="emitirRemoverMaps"></i>
        </div>

        <i v-if="!mostrar_input_maps && !mostrar_maps" class="fa-solid fa-map-location-dot fa-2x"></i>
        <p v-if="!mostrar_input_maps && !mostrar_maps" class="mt-2">Adicionar localização</p>

        <!-- Botão de desfazer (Ctrl + Z) -->
        <div v-if="mostrar_input_maps && !mostrar_maps" @click="emitirDesfazerAlteracaoMaps"
            class="plus-icon position-absolute" style="top: 10px; left: 10px;">
            <button class="btn btn-danger btn-sm">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>

        <!-- Input para o link do Google Maps e botão para confirmar -->
        <div v-if="mostrar_input_maps && !mostrar_maps" class="mt-3">
            <input :value="textoLocalizacaoInput"
                @input="(event) => $emit('update:textoLocalizacaoInput', (event.target as HTMLInputElement).value)"
                class="form-control mb-2" type="text" placeholder="Nome da localização do Google Maps" />
            <input :value="localizacaoInput"
                @input="(event) => $emit('update:localizacaoInput', (event.target as HTMLInputElement).value)"
                class="form-control" type="text" placeholder="Insira a URL de localização do Google Maps" />
            <button class="btn btn-success mt-3" @click="emitirSalvarMapaGoogleMaps">
                <i class="fa-solid fa-check"></i> Salvar Localização
            </button>
        </div>

        <!-- Botão para abrir o link do Google Maps -->
        <div v-if="mostrar_maps" class="mt-3">
            <h6>{{ googleMapsNome }}</h6>
            <button class="btn btn-map" @click="emitirAbrirMapaGoogleMaps">
                <i class="fa-solid fa-location-dot"></i> Ver localização
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        mostrar_input_maps: {
            type: Boolean,
            required: true
        },
        mostrar_maps: {
            type: Boolean,
            required: true
        },
        localizacaoInput: {
            type: String,
            required: true
        },
        googleMapsUrl: {
            type: String,
            required: true
        },
        googleMapsNome: {
            type: String,
            required: true
        },
        textoLocalizacaoInput: {
            type: String,
            required: true
        }
    },
    methods: {
        emitirMostrarInputMaps() {
            this.$emit('mostrarInputMaps');
        },
        emitirRemoverMaps() {
            this.$emit('removerMaps');
        },
        emitirDesfazerAlteracaoMaps() {
            this.$emit('desfazerAlteracaoMaps');
        },
        emitirSalvarMapaGoogleMaps() {
            this.$emit('salvarMapaGoogleMaps');
        },
        emitirAbrirMapaGoogleMaps() {
            this.$emit('abrirMapaGoogleMaps');
        }
    }
});
</script>
