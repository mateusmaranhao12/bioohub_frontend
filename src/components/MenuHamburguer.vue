<template>
    <nav class="navbar navbar-expand-lg navbar-light d-md-none mt-3">
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

                            <router-link to="/usuario"
                                class="animate__animated animate__zoomIn btn btn-visualizar-perfil btn-sm">
                                <i class="fa-solid fa-user"></i>
                            </router-link>
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
    methods: {
        fazerLogout() {
            this.$emit('fazer-logout')
        },
    },
});
</script>