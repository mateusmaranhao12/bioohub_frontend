<template>
    <div class="container redes-sociais">
        <div class="row">
            <div class="col-md-6 icones">
                <h2>Now, let’s add your social media accounts to your page.</h2>
                <div v-for="(rede, index) in redesSociais" :key="index" class="d-flex align-items-center mb-3">
                    <img :src="rede.icon" class="img-fluid me-3" :alt="`${rede.nome} Icon`" style="width: 40px;">
                    <div class="input-group">
                        <span class="input-group-text">@</span>
                        <input v-model="rede.usuario" type="text" class="form-control" :placeholder="rede.placeholder"
                            aria-label="Username">
                    </div>
                </div>
                <!-- Botões de Skip e Next -->
                <div class="d-flex mt-3">
                    <button @click="cadastrarUsuario()" class="btn btn-dark flex-grow-1 me-1">Next</button>
                    <button @click="cadastrarUsuario()" class="btn btn-light flex-grow-1">Skip</button>
                </div>
            </div>
            <div class="col-md-6">
                <h2>Your page</h2>
                <div class="row">
                    <div class="d-flex justify-content-center">
                        <div class="col-md-4 mb-3 me-3"> <!-- Adicione a classe me-3 aqui -->
                            <div class="card">
                                <div class="card-body">
                                    <i class="fa-brands fa-instagram"></i>
                                    <h6>@mateusmaranhao12</h6>
                                    <button class="btn btn-primary">Follow</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <i class="fa-brands fa-github"></i>
                                    <h6>Mateus Maranhão</h6>
                                    <button class="btn btn-dark">Follow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class RedesSociais extends Vue {

    redesSociais = [
        {
            nome: 'Instagram',
            icon: require('@/assets/imgs/instagram.png'),
            placeholder: 'your-instagram',
            usuario: ''
        },
        {
            nome: 'GitHub',
            icon: require('@/assets/imgs/github.png'),
            placeholder: 'your-github',
            usuario: ''
        },
        {
            nome: 'LinkedIn',
            icon: require('@/assets/imgs/linkedin.png'),
            placeholder: 'your-linkedin',
            usuario: ''
        }
    ]

    public cadastrarUsuario() {
        this.$router.push('/pagina-usuario')
    }
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>
