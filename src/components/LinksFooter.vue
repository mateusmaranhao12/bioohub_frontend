<template>
    <div v-for="(link, index) in linksFooter" :key="index"
        class="animate__animated animate__zoomIn card link-card card-links-footer d-flex flex-column align-items-center justify-content-center position-relative"
        style="overflow: hidden;">

        <i v-if="link.redeSocial" style="color: darkgreen" :class="`fa-brands fa-${link.redeSocial} fa-2x`"></i>
        <i v-else class="fa-solid fa-link fa-2x"></i>

        <p>{{ link.redeSocial }}</p>

        <!-- Input para adição ou edição -->
        <input v-if="link.adicionando || link.editando" v-model="link.url" type="text" class="form-control mt-2"
            placeholder="Insira o link" />

        <div class="mt-3 d-flex flex-row justify-content-between w-100">
            <div class="d-flex align-items-center">
                <!-- Botão de salvar quando adicionando -->
                <button v-if="!link.salvo && link.adicionando" @click="emitSalvarLinkFooter(index)"
                    class="btn btn-success btn-sm me-2">
                    <i class="fa-solid fa-check"></i>
                </button>
                <!-- Link salvo -->
                <a v-if="link.salvo" :href="link.url" target="_blank" class="btn btn-dark btn-sm me-2">
                    Ir para o link
                </a>
            </div>

            <div>
                <!-- Botões de editar e remover -->
                <button v-if="link.salvo" @click="emitEditarLinkFooter(index)" class="btn btn-primary btn-sm me-2">
                    <i class="fa-solid fa-pencil-alt"></i>
                </button>

                <button v-if="link.salvo" @click="emitRemoverLinkFooter(index)" class="btn btn-danger btn-sm">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>

        <!-- Botão de cancelamento quando adicionando -->
        <button v-if="link.adicionando" @click="emitCancelarLinkFooter(index)" class="btn btn-secondary btn-sm mt-2">
            <i class="fa-solid fa-arrow-left"></i> Cancelar
        </button>

        <!-- Botão de salvar alterações quando editando -->
        <button v-if="link.editando" @click="emitSalvarAlteracoesLinkFooter(index)" class="btn btn-success btn-sm mt-2">
            <i class="fa-solid fa-check"></i> Salvar Alterações
        </button>
    </div>
</template>

<script>
export default {
    props: {
        linksFooter: {
            type: Array,
            required: true
        },
        detectarRedeSocial: {
            type: Function,
            required: true
        },
        getNomeRedeSocial: {
            type: Function,
            required: true
        }
    },

    emits: ['salvar-link-footer', 'salvar-alteracoes-link-footer', 'editar-link-footer', 'remover-link-footer', 'cancelar-link-footer'],

    methods: {
        emitSalvarLinkFooter(index) {
            this.$emit('salvar-link-footer', index);
        },

        emitSalvarAlteracoesLinkFooter(index) {
            this.$emit('salvar-alteracoes-link-footer', index);
        },

        emitEditarLinkFooter(index) {
            this.$emit('editar-link-footer', index);
        },

        emitRemoverLinkFooter(index) {
            this.$emit('remover-link-footer', index);
        },

        emitCancelarLinkFooter(index) {
            this.$emit('cancelar-link-footer', index);  // Emitir evento para cancelar a adição
        }
    }
};
</script>
