<template>
    <!-- Alerta de sucesso ou erro -->
    <transition enter-active-class="animate__animated animate__flipInX"
        leave-active-class="animate__animated animate__flipOutX">
        <div v-if="mensagem_alerta" class="mt-3 mb-3 text-center alert" :class="mensagem_alerta.status">
            <i :class="mensagem_alerta.icone"></i> {{ mensagem_alerta.mensagem }}
        </div>
    </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Alert } from '@/interfaces/Alert'; // Importa a interface Alert

@Options({
    props: {
        mensagem_alerta: {
            type: Object as () => Alert | null, // Tipagem correta da prop
            required: false
        }
    }
})
export default class Alerta extends Vue {
    mensagem_alerta!: Alert | null
}
</script>

<style lang="scss">
@import '../scss/alerts.scss';
</style>
