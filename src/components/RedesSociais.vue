<template>
    <div class="container redes-sociais">
        <div class="row">
            <div class="col-md-12 d-flex justify-content-center mt-2">
                <Alerta :mensagem_alerta="mensagem_alerta" />
            </div>
            <div class="col-md-6 icones">
                <h2>Agora, vamos adicionar suas contas de mídia social à sua página.</h2>
                <div v-for="(rede, index) in redesSociais" :key="index" class="d-flex align-items-center mb-3">
                    <img :src="rede.icon" class="img-fluid me-3 d-md-block d-none" :alt="`${rede.nome} Icon`"
                        style="width: 40px;">
                    <div class="input-group">
                        <span class="input-group-text">Link</span>
                        <input v-model="rede.usuario" type="url" class="form-control" :placeholder="rede.placeholder"
                            aria-label="Link da Rede Social">
                        <button @click.prevent="adicionarRedeSocial(rede)" class="btn btn-success">Adicionar</button>
                    </div>
                </div>
                <div class="d-flex mt-3">
                    <button :disabled="!isAdded" type="button" @click="validarEContinuar"
                        class="btn btn-dark flex-grow-1 me-1">Próximo</button>
                    <button @click="pularEtapaRedes" type="button" class="btn btn-light flex-grow-1">Pular</button>
                </div>
            </div>
            <div class="col-md-6">
                <h2>Sua página</h2>
                <div class="row">
                    <div class="d-flex flex-wrap justify-content-center">
                        <div v-for="(rede, index) in redesSociais" :key="index" class="col-md-4 mb-4 d-flex">
                            <div class="card" v-if="rede.exibirCard" @mouseover="rede.hover = true"
                                @mouseleave="rede.hover = false">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div class="content">
                                        <i :class="`fa-brands fa-${rede.nome.toLowerCase()}`"></i>
                                        <h6>@{{ rede.nomeUsuario }}</h6>
                                    </div>
                                    <div class="buttons">
                                        <button @click="irParaRedeSocial(rede.usuario)"
                                            class="btn btn-primary">Seguir</button>
                                        <button v-if="rede.hover" @click="removerRedeSocial(index)"
                                            class="btn btn-danger btn-remove">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
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
import { Prop } from 'vue-property-decorator'; // Adicione esta linha
import Alerta from '@/components/Alerta.vue';
import { Alert } from '@/interfaces/Alert';
import axios from 'axios';

@Options({
    components: {
        Alerta
    }
})
export default class RedesSociais extends Vue {
    @Prop({ required: true }) userId!: number;

    mensagem_alerta: Alert | null = null;
    isAdded = false;

    redesSociais = [
        {
            nome: 'Instagram',
            icon: require('@/assets/imgs/instagram.png'),
            placeholder: 'https://instagram.com/seu_usuario',
            usuario: '',
            nomeUsuario: '',
            exibirCard: false,
            hover: false,
        },
        {
            nome: 'GitHub',
            icon: require('@/assets/imgs/github.png'),
            placeholder: 'https://github.com/seu_usuario',
            usuario: '',
            nomeUsuario: '',
            exibirCard: false,
            hover: false,
        },
        {
            nome: 'LinkedIn',
            icon: require('@/assets/imgs/linkedin.png'),
            placeholder: 'https://linkedin.com/in/seu_usuario',
            usuario: '',
            nomeUsuario: '',
            exibirCard: false,
            hover: false,
        }
    ];

    // Computed property to determine if the "Próximo" button should be enabled
    get isValid() {
        return this.isAdded; // O botão "Próximo" depende da variável isAdded
    }

    public adicionarRedeSocial(rede: { usuario: string, nome: string, exibirCard: boolean, nomeUsuario: string }) {
        if (rede.usuario) {
            const usuarioMatch = this.extractUsername(rede.nome, rede.usuario);
            if (usuarioMatch) {
                rede.nomeUsuario = usuarioMatch;
                rede.exibirCard = true;
                this.isAdded = true;

            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-info', `Por favor, insira um link válido para ${rede.nome}`, 'alert-aviso');
            }
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-circle-info', `Por favor, insira um link para ${rede.nome}`, 'alert-aviso');
        }
    }

    private extractUsername(nomeRede: string, url: string): string | null {
        let username: string | null = null;

        switch (nomeRede) {
            case 'Instagram': {
                const instagramRegex = /https?:\/\/(www\.)?instagram\.com\/([^/]+)/;
                const instagramMatch = url.match(instagramRegex);
                username = instagramMatch ? instagramMatch[2] : null;
                break;
            }
            case 'GitHub': {
                const githubRegex = /https?:\/\/(www\.)?github\.com\/([^/]+)/;
                const githubMatch = url.match(githubRegex);
                username = githubMatch ? githubMatch[2] : null;
                break;
            }
            case 'LinkedIn': {
                const linkedinRegex = /https?:\/\/(www\.)?linkedin\.com\/in\/([^/]+)/;
                const linkedinMatch = url.match(linkedinRegex);
                username = linkedinMatch ? linkedinMatch[2] : null;
                break;
            }
        }

        return username;
    }

    public irParaRedeSocial(link: string) {
        window.open(link, '_blank');
    }

    public removerRedeSocial(index: number) {
        this.redesSociais[index].exibirCard = false;
    }

    public pularEtapaRedes() {
        this.$router.push({ name: 'pagina-usuario' });
    }

    public validarEContinuar() {
        this.cadastrarRedesSociais()
            .then(() => {
                this.$router.push({ name: 'pagina-usuario' });
            })
            .catch(() => {
                this.mostrarMensagemAlerta('fa-solid fa-circle-exclamation', 'Erro ao cadastrar redes sociais.', 'alert-error');
            });
    }

    public cadastrarRedesSociais(): Promise<void> {
        return new Promise((resolve, reject) => {
            const redes = this.redesSociais
                .filter(rede => rede.exibirCard)
                .map(rede => ({ url: rede.usuario })); // Altere para incluir apenas a URL

            // Verifique se há redes para cadastrar
            if (redes.length === 0) {
                reject(new Error('Nenhuma rede social foi adicionada.'));
                return;
            }

            // Enviar usuario_id e as redes corretas
            axios.post('http://localhost/Projetos/bioohub/backend/api/adicionar_links.php', { usuario_id: this.userId, redes })
                .then(response => {
                    if (response.data.success) {
                        resolve();
                    } else {
                        reject(new Error('Cadastro falhou: ' + response.data.message));
                    }
                })
                .catch(err => {
                    console.error('Erro ao cadastrar redes sociais:', err); // Log do erro para depuração
                    reject(err);
                });
        });
    }


    private mostrarMensagemAlerta(icone: string, mensagem: string, status: string) {
        setTimeout(() => {
            this.mensagem_alerta = { icone, mensagem, status };
            setTimeout(() => {
                this.mensagem_alerta = null;
            }, 5000);
        }, 0);
    }
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>