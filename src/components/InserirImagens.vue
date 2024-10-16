<template>
    <div class="animate__animated animate__zoomIn card link-card 
        card-imagem d-flex flex-column align-items-center justify-content-center 
        position-relative" style="overflow: hidden;">

        <!-- Input de arquivo oculto -->
        <input type="file" ref="fileInput" @change="emitirCarregarImagem" style="display:none;" accept="image/*">

        <!-- Ícone de + e trash -->
        <div v-if="!imagemSelecionada && !loading" class="plus-icon position-absolute" @click="emitirAbrirSeletorImagem"
            style="cursor: pointer;">
            <i class="fa-solid fa-plus" style="color: black;"></i>
        </div>

        <div v-if="imagemSelecionada && !loading" class="plus-icon position-absolute" @click="emitirRemoverImagem"
            style="cursor: pointer;">
            <i class="fa-solid fa-trash"></i>
        </div>

        <!-- Spinner de carregando durante o upload -->
        <div v-if="loading" class="position-absolute d-flex align-items-center justify-content-center w-100 h-100">
            <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
        </div>

        <!-- Imagem exibida (se disponível) -->
        <div v-if="imagemUrl" class="w-100 h-100">
            <img :src="imagemUrl" class="img-fluid w-100 h-100" style="object-fit: cover;" />
        </div>

        <!-- Ícone e texto padrão quando não há imagem -->
        <div v-else>
            <i class="fa-solid fa-mountain fa-2x"></i>
            <p class="mt-2">Adicionar imagem</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
    name: 'InserirImagens',
    props: {
        imagemSelecionada: {
            type: Boolean,
            default: false
        },
        imagemUrl: {
            type: String as PropType<string | null>,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['carregarImagem', 'abrirSeletorImagem', 'removerImagem'],

    setup(props, { emit }) {

        const fileInput = ref<HTMLInputElement | null>(null)

        const emitirCarregarImagem = (event: Event) => {
            emit('carregarImagem', event);
        };

        const emitirAbrirSeletorImagem = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };

        const emitirRemoverImagem = () => {
            emit('removerImagem');
        };

        return {
            fileInput,
            emitirCarregarImagem,
            emitirAbrirSeletorImagem,
            emitirRemoverImagem
        };
    }
});
</script>
