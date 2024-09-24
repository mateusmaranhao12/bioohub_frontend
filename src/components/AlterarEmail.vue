<template>
    <div class="modal fade" id="alterarEmailModal" tabindex="-1" aria-labelledby="alterarEmailModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="alterarEmailModalLabel">Alterar E-mail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="novoEmail" class="form-label">Novo E-mail</label>
                            <input type="email" class="form-control" id="novoEmail"
                                placeholder="Digite seu novo e-mail">
                        </div>
                        <div class="mb-3">
                            <label for="confirmarEmail" class="form-label">Confirmar E-mail</label>
                            <input type="email" class="form-control" id="confirmarEmail"
                                placeholder="Confirme seu novo e-mail">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary">Salvar alterações</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class AlterarEmail extends Vue { }
</script>