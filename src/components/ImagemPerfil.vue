<template>
    <div
        class="animate__animated animate__zoomIn avatar-circle d-flex flex-column justify-content-center align-items-center position-relative">
        <input type="file" id="file-input" class="file-input" accept="image/*" @change="carregarImagemPerfil"
            :disabled="imagemPerfilSelecionada" style="display:none;">
        <label for="file-input" class="d-flex flex-column justify-content-center align-items-center">
            <img v-if="selectedImage" :src="selectedImage" class="img-fluid rounded-circle"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
            <img v-else :src="imagemPerfilUrl || '../default-image.png'" class="img-fluid rounded-circle"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
            <i v-if="!selectedImage" class="icone-upload fa-solid fa-upload fa-2x mb-5"></i>
            <p v-if="!selectedImage" class="text-center mb-4">Adicionar foto</p>
        </label>

        <div v-if="selectedImage" class="position-absolute" style="top: 5px; right: 5px;">
            <button class="btn btn-danger btn-sm ms-2" @click="removerImagemPerfil">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        selectedImage: String,
        imagemPerfilUrl: String,
        imagemPerfilSelecionada: Boolean,
    },
    emits: ['carregar-imagem-perfil', 'remover-imagem-perfil'],
    methods: {
        carregarImagemPerfil(event: Event) {
            this.$emit('carregar-imagem-perfil', event);
        },
        removerImagemPerfil() {
            this.$emit('remover-imagem-perfil');
        }
    }
});
</script>