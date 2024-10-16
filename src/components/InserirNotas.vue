<template>
    <div class="animate__animated animate__zoomIn">
        <!-- Textarea para adicionar ou editar nota -->
        <textarea v-if="!notaSalva || editandoNota" placeholder="Adicione uma nota aqui" class="form-control text-area"
            rows="3" :style="textareaStyle" v-model="nota" @input="mostrarBotaoSalvar">
      </textarea>

        <!-- Exibir a nota salva -->
        <p v-if="notaSalva && !editandoNota" class="nota-display">
            {{ notaSalva.nota }}
            <span @click="emitirEditarNota" class="icon-editar-nota" style="cursor: pointer; margin-left: 10px;">
                <i class="fa-solid fa-pen-to-square"></i>
            </span>
            <span @click="emitirRemoverNota(notaSalva.id)" class="icon-remover-nota"
                style="cursor: pointer; margin-left: 5px;">
                <i class="fa-solid fa-trash"></i>
            </span>
        </p>

        <!-- Botão para salvar nota ou salvar alterações -->
        <button v-if="botaoSalvarNota" @click="emitirSalvarNota" class="btn btn-success mt-2">
            <i class="fa-solid fa-check"></i> {{ editandoNota ? 'Salvar alterações' : 'Salvar nota' }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';

export default defineComponent({
    name: 'InserirNotas',
    props: {
        notaSalva: {
            type: Object as PropType<{ id: number; nota: string } | null>,
            default: null
        },

        editandoNota: {
            type: Boolean,
            default: false
        },

        textareaStyle: {
            type: Object,
            default: () => ({})
        },

        limparTextarea: { 
            type: Boolean,
            default: false
        }

    },
    emits: ['salvarNota', 'editarNota', 'removerNota', 'salvarEdicaoNota'],
    setup(props, { emit }) {
        const nota = ref<string>(props.notaSalva?.nota || '');
        const botaoSalvarNota = ref<boolean>(false);

        // Limpar o textarea quando a prop 'limparTextarea' for alterada
        watch(() => props.limparTextarea, (novoValor) => {
            if (novoValor) {
                nota.value = '';  // Limpar a nota
                botaoSalvarNota.value = false;  // Ocultar botão de salvar
            }
        });

        const mostrarBotaoSalvar = () => {
            botaoSalvarNota.value = true;
        };

        const emitirSalvarNota = () => {
            if (props.editandoNota) {
                emit('salvarEdicaoNota', nota.value);
            } else {
                emit('salvarNota', nota.value);
            }
            botaoSalvarNota.value = false;
        };

        const emitirEditarNota = () => {
            emit('editarNota');
        };

        const emitirRemoverNota = (id: number) => {
            emit('removerNota', id);
        };

        return {
            nota,
            botaoSalvarNota,
            mostrarBotaoSalvar,
            emitirSalvarNota,
            emitirEditarNota,
            emitirRemoverNota
        };
    }
});
</script>
