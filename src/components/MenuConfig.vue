<template>
    <div class="mt-3 col-md-6 d-none d-md-block">
        <div class="d-flex justify-content-start gap-2" style="width: 60%;">
            <div class="dropdown dropup mb-2">
                <button
                    class="animate__animated animate__zoomIn botao-dropdown btn btn-configuracoes dropdown-toggle btn-sm"
                    type="button" id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-gear"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
                    <li>
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#alterarSenhaModal">
                            Alterar senha
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item mt-2" href="#" data-bs-toggle="modal"
                            data-bs-target="#alterarEmailModal">
                            Alterar e-mail
                        </a>
                        <small class="text-muted d-block ms-3 me-3">{{ email }}</small>
                    </li>
                    <li>
                        <a class="dropdown-item mt-2" href="#" data-bs-toggle="modal"
                            data-bs-target="#alterarUsuarioModal">
                            Alterar usuário
                        </a>
                        <small class="text-muted d-block ms-3 me-3">{{ usuario }}</small>
                    </li>
                    <li>
                        <a @click="fazerLogout" class="dropdown-item mt-2" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Redireciona para a página do usuário usando o valor da prop 'usuario' -->
            <a :href="`/${usuario}`" target="_blank"
                class="animate__animated animate__zoomIn botao-visualizar-perfil btn btn-visualizar-perfil btn-sm">
                <i class="fa-solid fa-user"></i>
            </a>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MenuConfig',
    props: {
        email: {
            type: String,
            required: true,
        },
        usuario: {
            type: String,
            required: true,
        }
    },
    methods: {
        fazerLogout() {
            this.$emit('logout'); // Emite evento para o componente pai realizar o logout
        }
    }
});
</script>

<style scoped>
/* Adicione qualquer estilo necessário aqui */
</style>
