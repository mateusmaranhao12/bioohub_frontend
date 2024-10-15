<template>
    <div class="col-md-12 animate__animated animate__zoomIn">
        <div v-for="(nota, index) in notasFooter" :key="index">

            <div v-if="nota.adicionando">
                <textarea class="form-control textarea" v-model="nota.texto"></textarea>
                <button class="btn btn-secondary me-2 mt-2" @click="emitCancelarNotaFooter(index)">
                    <i class="fa-solid fa-arrow-left"></i> Cancelar
                </button>
                <button class="btn btn-success mt-2" @click="emitSalvarNotaFooter(index)">
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>

            <div v-if="nota.editando">
                <textarea class="form-control textarea" v-model="nota.texto"></textarea>
                <button class="btn btn-success mt-2" @click="emitSalvarAlteracoesNotaFooter(index)">
                    <i class="fa-solid fa-check"></i> Salvar alterações
                </button>
            </div>
            <div v-else>
                <p class="mt-2" v-if="!nota.adicionando">{{ nota.texto }}</p>
                <span class="action-icons" v-if="!nota.adicionando">
                    <i class="icon-editar-nota fas fa-edit" @click="emitEditarNotaFooter(index)"
                        style="cursor: pointer; margin-left: 5px;" title="Editar"></i>
                    <i class="icon-remover-nota fas fa-trash" @click="emitRemoverNotaFooter(index)"
                        style="cursor: pointer; margin-left: 5px;" title="Remover"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotasFooter',

    props: {
        notasFooter: {
            type: Array,
            required: true
        }
    },

    emits: ['salvar-nota-footer', 'salvar-alteracoes-nota-footer', 'editar-nota-footer', 'remover-nota-footer'],

    methods: {

        emitSalvarNotaFooter(index) {
            this.$emit('salvar-nota-footer', index);
        },

        emitSalvarAlteracoesNotaFooter(index) {
            this.$emit('salvar-alteracoes-nota-footer', index);
        },

        emitEditarNotaFooter(index) {
            this.$emit('editar-nota-footer', index);
        },

        emitRemoverNotaFooter(index) {
            this.$emit('remover-nota-footer', index);
        },

        emitCancelarNotaFooter(index) {
            this.$emit('cancelar-nota-footer', index);
        }
    }
};
</script>