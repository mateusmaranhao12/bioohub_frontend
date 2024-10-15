<template>
    <div v-for="(titulo, index) in titulosFooter" :key="titulo.id"
        class="col-md-12 animate__animated animate__zoomIn titulo-footer">
        <div v-if="titulo.adicionando">
            <input class="form-control" v-model="titulo.titulo" placeholder="Digite o título" />
            <button class="btn btn-secondary me-2 mt-2" @click="emitCancelarTituloFooter(index)">
                <i class="fa-solid fa-arrow-left"></i> Cancelar
            </button>
            <button class="btn btn-success mt-2" @click="emitSalvarTituloFooter(index)">
                <i class="fa-solid fa-check"></i> Salvar
            </button>
        </div>

        <div v-if="titulo.editando">
            <input class="form-control" v-model="titulo.titulo" placeholder="Editar título" />
            <button class="btn btn-secondary me-2 mt-2" @click="emitCancelarTituloFooter(index)">
                <i class="fa-solid fa-arrow-left"></i> Cancelar
            </button>
            <button class="btn btn-success mt-2" @click="emitSalvarAlteracoesTituloFooter(index)">
                <i class="fa-solid fa-check"></i> Salvar alterações
            </button>
        </div>

        <div v-if="!titulo.adicionando && !titulo.editando">
            <h1 class="titulo-footer mt-2">{{ titulo.titulo }}</h1>
            <span class="action-icons">
                <i class="icon-editar-titulo fas fa-edit fa-2x" @click="emitEditarTituloFooter(index)"
                    style="cursor: pointer; margin-left: 5px;" title="Editar"></i>
                <i class="icon-remover-titulo fas fa-trash fa-2x" @click="emitRemoverTituloFooter(index)"
                    style="cursor: pointer; margin-left: 5px;" title="Remover"></i>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TituloFooter',

    props: {
        titulosFooter: {
            type: Array,
            required: true
        }
    },

    emits: ['salvar-titulo-footer', 'salvar-alteracoes-titulo-footer', 'editar-titulo-footer', 'remover-titulo-footer', 'cancelar-titulo-footer'],

    methods: {
        emitSalvarTituloFooter(index) {
            this.$emit('salvar-titulo-footer', index);
        },

        emitSalvarAlteracoesTituloFooter(index) {
            this.$emit('salvar-alteracoes-titulo-footer', index);
        },

        emitEditarTituloFooter(index) {
            this.$emit('editar-titulo-footer', index);
        },

        emitRemoverTituloFooter(index) {
            this.$emit('remover-titulo-footer', index);
        },

        emitCancelarTituloFooter(index) {
            this.$emit('cancelar-titulo-footer', index);
        }
    }
};
</script>

<style scoped>
/* Adicione seus estilos aqui, se necessário */
</style>
