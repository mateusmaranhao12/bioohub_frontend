<template>
    <div class="container pagina-usuario">
        <div class="row">

            <!-- Coluna Dados -->
            <div class="col-md-6 mt-5">
                <div class="avatar-circle d-flex flex-column justify-content-center align-items-center">
                    <input type="file" id="file-input" class="file-input" />
                    <label for="file-input" class="d-flex flex-column justify-content-center align-items-center">
                        <i class="fa-solid fa-upload fa-2x mb-2"></i>
                        <p class="text-center mb-0">Add avatar</p>
                    </label>
                </div>

                <div class="mt-4">
                    <input type="text" class="form-control input-usuario" placeholder="Your Name" aria-label="Name">
                </div>
                <div class="mt-2">
                    <textarea type="text" class="form-control input-bio" placeholder="Your bio..."
                        aria-label="Bio"></textarea>
                </div>
            </div>

            <!-- Coluna Links -->
            <div class="col-md-6 mt-5">
                <div class="d-flex flex-wrap gap-3 justify-content-between">
                    <div
                        class="card link-card card-small d-flex flex-column align-items-center justify-content-center position-relative">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-mountain fa-2x"></i>
                        <p class="mt-2">Add image</p>
                    </div>

                    <div
                        class="card link-card card-vertical d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-globe fa-2x"></i>
                        <p class="mt-2">Add link</p>
                    </div>
                    <div
                        class="card link-card card-horizontal d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-brands fa-spotify fa-2x"></i>
                        <p class="mt-2">Add music</p>
                    </div>
                    <div
                        class="card link-card card-large-square d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-video fa-2x"></i>
                        <p class="mt-2">Add video</p>
                    </div>
                    <div
                        class="card link-card card-vertical2 d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                        <p class="mt-2">Add a location</p>
                    </div>
                    <div
                        class="card link-card card-small2 d-flex flex-column align-items-center justify-content-center">
                        <div class="plus-icon position-absolute">
                            <i class="fa-solid fa-plus" style="color: black;"></i>
                        </div>
                        <i class="fa-solid fa-share-alt fa-2x"></i>
                        <p class="mt-2">Add link</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class PaginaUsuario extends Vue { }
</script>

<style lang="scss">
@import '../scss/pagina_usuario.scss';
</style>
