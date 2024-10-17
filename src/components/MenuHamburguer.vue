<template>
    <!-- Navbar para o modo celular ou para quando a tela for menor em computadores -->
    <nav
    :class="{'d-md-none': modoTela === 'computador'}" class="navbar navbar-expand-lg navbar-light mt-3">
        <div class="container-fluid">
            <button class="animate__animated animate__zoomIn navbar-toggler mb-3" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                Exibir mais
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div class="d-flex justify-content-start gap-2">
                            <div class="dropdown dropup mb-2">
                                <button
                                    class="animate__animated animate__zoomIn botao-dropdown btn btn-configuracoes dropdown-toggle btn-sm"
                                    type="button" id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-gear"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
                                    <li>
                                        <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                            data-bs-target="#alterarSenhaModal">
                                            Alterar senha
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                            data-bs-target="#alterarEmailModal">
                                            Alterar e-mail
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                            data-bs-target="#alterarUsuarioModal">
                                            Alterar usuário
                                        </a>
                                    </li>
                                    <li>
                                        <a @click="fazerLogout()" class="dropdown-item" href="#">
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
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MenuHamburguer',
    props: {
        email: {
            type: String,
            required: true,
        },

        usuario: {
            type: String,
            required: true,
        },

        modoTela: {
            type: String,
            required: true,
        }
    },

    methods: {
        fazerLogout() {
            this.$emit('fazer-logout')
        },
    },
});
</script>