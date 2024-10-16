<template>
    <div
        class="animate__animated animate__zoomIn card link-card card-video d-flex flex-column align-items-center justify-content-center position-relative">
        <!-- Ícone de adicionar vídeo (fa-plus) -->
        <div class="plus-icon position-absolute" v-if="!mostrar_input_video">
            <i class="fa-solid fa-plus" style="color: black;" @click="mostrarInputVideo"></i>
        </div>

        <!-- Ícone de remover vídeo -->
        <div class="plus-icon position-absolute" v-if="videoUrlIframe && mostrar_video_youtube">
            <i class="fa-solid fa-trash" @click="removerVideo"></i>
        </div>

        <i v-if="!mostrar_input_video && !mostrar_video_youtube" class="fa-solid fa-video fa-2x"></i>
        <p v-if="!mostrar_input_video && !mostrar_video_youtube" class="mt-2">Adicionar vídeo</p>

        <!-- Botão de desfazer (Ctrl + Z) -->
        <div v-if="mostrar_input_video && !videoUrlIframe" @click="desfazerAlteracaoVideo"
            class="plus-icon position-absolute" style="top: 10px; left: 10px;">
            <i class="fa-solid fa-arrow-left"></i>
        </div>

        <!-- Input para o link do YouTube e botão para confirmar -->
        <div v-if="mostrar_input_video && !mostrar_video_youtube" class="mt-3">
            <input :value="videoUrlInput" @input="updateVideoUrlInput" class="form-control" type="text"
                placeholder="Insira o link do vídeo do YouTube" />
            <button class="btn btn-success mt-3" @click="mostrarVideo">
                <i class="fa-solid fa-check"></i>
            </button>
        </div>

        <!-- Iframe para exibir o vídeo -->
        <div v-if="videoUrlIframe && mostrar_video_youtube">
            <iframe :src="videoUrlIframe" width="300px" height="360px" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'InserirVideoYoutube',
    props: {
        videoUrlIframe: {
            type: String,
            default: ''
        },
        mostrar_video_youtube: {
            type: Boolean,
            default: false
        },
        mostrar_input_video: {
            type: Boolean,
            default: false
        },
        videoUrlInput: {
            type: String,
            default: ''
        }
    },
    methods: {
        // Emitir a função para mostrar o input de vídeo
        mostrarInputVideo() {
            this.$emit('mostrarInputVideo');
        },

        // Emitir a função para atualizar o valor do input de vídeo
        updateVideoUrlInput(event: Event) {
            const input = event.target as HTMLInputElement;
            this.$emit('update:videoUrlInput', input.value);
        },

        // Emitir a função para adicionar o vídeo
        mostrarVideo() {
            if (!this.videoUrlInput || !this.videoUrlInput.trim()) {
                return; // No need to show alert here, it will be handled in PaginaUsuario.vue
            }

            const videoId = this.getYouTubeVideoId(this.videoUrlInput);

            if (videoId) {
                this.$emit('mostrarVideo', videoId, this.videoUrlInput);
            }
        },

        // Emitir a função para remover o vídeo
        removerVideo() {
            this.$emit('removerVideo');
        },

        // Emitir a função para desfazer alteração
        desfazerAlteracaoVideo() {
            this.$emit('desfazerAlteracaoVideo');
        },

        // Método robusto para obter o ID do vídeo do YouTube
        getYouTubeVideoId(url: string): string | null {
            if (!url) {
                return null;
            }

            let videoId = null;

            const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
            if (shortUrlMatch && shortUrlMatch[1]) {
                videoId = shortUrlMatch[1];
            }

            const fullUrlMatch = url.match(/(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/)|m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
            if (fullUrlMatch && fullUrlMatch[3]) {
                videoId = fullUrlMatch[3];
            }

            return videoId || null;
        }
    }
}
</script>