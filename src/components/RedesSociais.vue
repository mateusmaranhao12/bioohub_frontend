<template>
    <div class="container redes-sociais">
        <div class="row">
            <!-- Alerta de mensagens -->
            <div class="col-md-12 d-flex justify-content-center mt-2">
                <Alerta :mensagem_alerta="mensagem_alerta" />
            </div>

            <!-- Formulário de adição de redes sociais -->
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

                <!-- Botões de pular ou continuar -->
                <div class="d-flex mt-3">
                    <button :disabled="!isValid" type="button" @click="validarEContinuar"
                        class="btn btn-dark flex-grow-1 me-1">Próximo</button>
                    <button @click="pularEtapaRedes" type="button" class="btn btn-light flex-grow-1">Pular</button>
                </div>
            </div>

            <!-- Visualização dos cards da página do usuário -->
            <div class="col-md-6">
                <h2>Sua página</h2>
                <div class="row">
                    <div class="d-flex flex-wrap justify-content-center">
                        <div v-for="(rede, index) in redesSociais" :key="index" class="col-md-4 mb-4 d-flex">
                            <div class="card" v-if="rede.exibirCard" @mouseover="rede.hover = true"
                                @mouseleave="rede.hover = false">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div class="content">
                                        <!-- Ícone e nome do usuário -->
                                        <i :class="`fa-brands fa-${rede.nome.toLowerCase()}`"></i>
                                        <h6>@{{ rede.nomeUsuario }}</h6>
                                    </div>
                                    <div class="buttons">
                                        <!-- Botão de seguir -->
                                        <button @click="irParaRedeSocial(rede.usuario)"
                                            class="btn btn-primary">Seguir</button>
                                        <!-- Botão de remover aparece no hover -->
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
import { Prop } from 'vue-property-decorator';
import Alerta from '@/components/Alerta.vue';
import { Alert } from '@/interfaces/Alert';
import axios from 'axios';
import { Store } from 'vuex';

// Definindo a interface para Redes Sociais
interface RedeSocial {
    nome: string;
    icon: any; // Tipo do ícone pode ser ajustado conforme necessário
    placeholder: string;
    usuario: string;
    nomeUsuario: string;
    exibirCard: boolean;
    hover: boolean;
    url: string; // Adicionando a propriedade 'url'
}

@Options({
    components: {
        Alerta
    }
})
export default class RedesSociais extends Vue {
    @Prop({ required: true }) userId!: number;

    $store!: Store<any>;

    mensagem_alerta: Alert | null = null;
    isAdded = false;

    // Redes sociais disponíveis para o usuário cadastrar
    redesSociais: RedeSocial[] = [ // Definindo o tipo para a lista
        {
            nome: 'Instagram',
            icon: require('@/assets/imgs/instagram.png'),
            placeholder: 'https://instagram.com/seu_usuario',
            usuario: '',
            nomeUsuario: '',
            exibirCard: false,
            hover: false,
            url: '' // Inicializando a propriedade 'url'
        },
        {
            nome: 'GitHub',
            icon: require('@/assets/imgs/github.png'),
            placeholder: 'https://github.com/seu_usuario',
            usuario: '',
            nomeUsuario: '',
            exibirCard: false,
            hover: false,
            url: '' // Inicializando a propriedade 'url'
        },
        {
            nome: 'LinkedIn',
            icon: require('@/assets/imgs/linkedin.png'),
            placeholder: 'https://linkedin.com/in/seu_usuario',
            usuario: '',
            nomeUsuario: '',
            exibirCard: false,
            hover: false,
            url: '' // Inicializando a propriedade 'url'
        }
    ];

    // Computed property para habilitar o botão "Próximo"
    get isValid() {
        return this.redesSociais.some(rede => rede.exibirCard);
    }

    // Adiciona uma rede social e exibe o card
    public adicionarRedeSocial(rede: RedeSocial) {
        if (rede.usuario) {
            const usuarioMatch = this.extractUsername(rede.nome, rede.usuario);
            if (usuarioMatch) {
                rede.nomeUsuario = usuarioMatch;
                rede.exibirCard = true;
                rede.url = rede.usuario; // Armazenando o URL na propriedade 'url'
                this.isAdded = true;

                // Adiciona ao Vuex
                this.$store.dispatch('addLink', {
                    url: rede.usuario,
                    redeSocial: rede.nome,
                    usuario_id: this.userId
                });
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-info', `Por favor, insira um link válido para ${rede.nome}.`, 'alert-aviso');
            }
        } else {
            this.mostrarMensagemAlerta('fa-solid fa-circle-info', `Por favor, insira um link para ${rede.nome}.`, 'alert-aviso');
        }
    }

    // Extrai o nome de usuário da URL
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

    // Abre o link da rede social em uma nova aba
    public irParaRedeSocial(link: string) {
        window.open(link, '_blank');
    }

    // Remove o card da rede social
    public removerRedeSocial(index: number) {
        const rede = this.redesSociais[index];
        this.$store.dispatch('deleteLinkByUrl', rede.url); // Remova pelo URL
        rede.exibirCard = false;

        // Atualiza o estado do botão "Próximo"
        this.isAdded = this.redesSociais.some(r => r.exibirCard);
    }

    // Pula a etapa de adicionar redes sociais
    public pularEtapaRedes() {
        this.$router.push({ name: 'pagina-usuario' });
    }

    // Valida as redes sociais e cadastra no servidor
    public validarEContinuar() {
        this.cadastrarRedesSociais()
            .then(() => {
                this.$router.push({ name: 'pagina-usuario' });
            })
            .catch(() => {
                this.mostrarMensagemAlerta('fa-solid fa-circle-exclamation', 'Erro ao cadastrar redes sociais.', 'alert-error');
            });
    }

    // Envia as redes sociais cadastradas para o backend
    public cadastrarRedesSociais(): Promise<void> {
        return new Promise((resolve, reject) => {
            const redes = this.redesSociais
                .filter(rede => rede.exibirCard)
                .map(rede => ({
                    url: rede.usuario,
                    redeSocial: rede.nome
                }));

            // Log para verificar dados antes de enviar
            console.log('userId:', this.userId);
            console.log('redes:', redes);

            // Validar se as redes sociais foram adicionadas
            if (redes.length === 0) {
                reject(new Error('Nenhuma rede social foi adicionada.'));
                return;
            }

            // Verificação de dados completos
            if (!this.userId || redes.some(rede => !rede.url || !rede.redeSocial)) {
                reject(new Error('Dados incompletos.'));
                return;
            }

            // Envio dos dados
            axios.post('http://localhost/Projetos/bioohub/backend/api/adicionar_links.php', {
                usuario_id: this.userId,
                redes: redes
            })
                .then(response => {
                    if (response.data.success) {
                        resolve();
                    } else {
                        reject(new Error(response.data.message));
                    }
                })
                .catch((error) => {
                    console.error('Erro ao enviar dados:', error);
                    reject(new Error('Erro ao enviar dados.'));
                });
        });
    }

    // Mostra mensagem de alerta
    public mostrarMensagemAlerta(icone: string, mensagem: string, status: string) {
        this.mensagem_alerta = { icone, mensagem, status };
        setTimeout(() => {
            this.mensagem_alerta = null;
        }, 5000);
    }
}
</script>

<style scoped>
.redes-sociais {
    margin-top: 50px;
}

.card {
    border: 1px solid #ced4da;
    border-radius: 5px;
}

.btn-remove {
    margin-left: 10px;
}
</style>
