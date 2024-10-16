<template>
    <div v-for="imagem in imagensFooter" :key="imagem.id"
        class="animate__animated animate__zoomIn card link-card card-imagem d-flex flex-column align-items-center justify-content-center position-relative"
        style="overflow: hidden; height: 100%;">

        <div class="card-body" style="position: relative; padding: 0; height: 100%;">

            <!-- Imagem exibida -->
            <img :src="imagem.imagem" alt="Imagem escolhida" class="img-fluid"
                style="object-fit: cover; width: 100%; height: 100%;" />

            <!-- Botão de Remover Imagem -->
            <div class="plus-icon position-absolute" @click="$emit('remover-imagem', imagem.id)"
                style="cursor: pointer;">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        imagensFooter: {
            type: Array as PropType<Array<{ id: number, imagem: string }>>,
            required: true
        }
    },
    emits: ['remover-imagem']
});
</script>