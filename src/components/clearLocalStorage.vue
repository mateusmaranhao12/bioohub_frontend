<template>
    <div>
        <button class="btn btn-danger" @click="limparTodasImagens">Limpar Todas as Imagens</button>
        <button class="btn btn-light" @click="clearNotas">Limpar notas</button>
        <button class="btn btn-success" @click="limparImagensDePerfil"> Limpar Todas as Imagens de Perfil </button>
        <button class="btn btn-warning" @click="limparDadosPerfil"> Limpar Perfil </button>
        <button class="btn btn-primary" @click="limparTitulosFooterDoLocalStorage">limpar titulos</button>
        <button class="btn btn-secondary" @click="limparNotasFooterDoLocalStorage">limpar notas footer</button>
        <button class="btn btn-dark" @click="limparImagensFooterDoLocalStorage">limpar imagens footer</button>
        <button class="btn btn-dark" @click="limparVideosDoLocalStorage">limpar videos</button>
        <button class="btn btn-success" @click="limparMapas"> Limpar mapas </button>
        <button class="btn btn-success" @click="limparMapasFooterDoLocalStorage"> Limpar mapas footer </button>
        <button class="btn btn-success" @click="limparLinksDoLocalStorage"> Limpar links </button>
        <button class="btn btn-success" @click="limparLinksAleatoriosDoLocalStorage"> Limpar links aleatorios
        </button>
        <button class="btn btn-danger" @click="limparLinksFooterDoLocalStorage"> Limpar links footer
        </button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class clearLocalStorage extends Vue {
    $store: any;
    imagemUrl = null;

    //caso precise limpar localStorage
    public clearNotas() {
        // Laço para percorrer todas as chaves do localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            // Verifica se a chave começa com 'nota_'
            if (key && key.startsWith('nota_')) {
                localStorage.removeItem(key); // Remove a chave que começa com 'nota_'
                console.log(`Nota removida do localStorage: ${key}`);
            }
        }

        // Limpa as notas no Vuex
        this.$store.commit('CLEAR_NOTA'); // Você deve ter uma mutação para limpar as notas

        console.log('Todas as notas foram limpas do localStorage e Vuex.');
    }

    public limparImagensDePerfil() {
        // Percorre todas as chaves do localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);

            // Verifica se a chave está relacionada ao perfil (começa com 'perfil_')
            if (chave && chave.startsWith('perfil_')) {
                const perfilItem = localStorage.getItem(chave);

                if (perfilItem) {
                    const perfil = JSON.parse(perfilItem);

                    // Se existir uma imagem de perfil, remove apenas o campo `foto_perfil`
                    if (perfil && perfil.foto_perfil) {
                        delete perfil.foto_perfil;
                        localStorage.setItem(chave, JSON.stringify(perfil));
                    }
                }
            }
        }

        console.log("Todas as imagens de perfil foram removidas do localStorage.");
    }

    // Limpar imagem do localStorage
    public limparTodasImagens(): void {
        // Itera sobre todas as chaves do localStorage
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const chave = localStorage.key(i);

            // Verifica se a chave começa com 'imagem_' (indicando que é uma imagem)
            if (chave && chave.startsWith('imagem_')) {
                localStorage.removeItem(chave); // Remove a chave do localStorage
                console.log(`Imagem removida: ${chave}`);
            }
        }

        this.imagemUrl = null; // Limpa a URL da imagem na variável, se aplicável
        this.mostrarMensagemAlerta('fa-solid fa-check', 'Todas as imagens foram limpas do localStorage.', 'alert-sucesso');
        console.log('Todas as imagens foram limpas do localStorage.');
    }
    mostrarMensagemAlerta(arg0: string, arg1: string, arg2: string) {
        throw new Error('Method not implemented.');
    }

    public limparDadosPerfil() {
        // Limpa todos os dados de perfil armazenados no localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key && key.startsWith('perfil_')) {
                localStorage.removeItem(key); // Remove a chave que começa com 'perfil_'
                console.log(`Dados de perfil removidos: ${key}`);
            }
        }
    }

    // Função para limpar os títulos do localStorage
    public limparTitulosFooterDoLocalStorage() {
        // Limpa todos os títulos do footer armazenados no localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key && key.startsWith('titulosFooter_')) {
                localStorage.removeItem(key); // Remove a chave que começa com 'titulosFooter_'
                console.log(`Títulos do footer removidos: ${key}`);
            }
        }
    }

    public limparNotasFooterDoLocalStorage() {
        // Limpa todas as notas do footer armazenadas no localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key && key.startsWith('notasFooter_')) {
                localStorage.removeItem(key); // Remove a chave que começa com 'notasFooter_'
                console.log(`Notas do footer removidas: ${key}`);
            }
        }

        this.$store.commit('CLEAR_NOTA');
    }

    public limparImagensFooterDoLocalStorage() {
        // Remove as imagens de footer de todos os usuários no localStorage
        localStorage.removeItem('imagensFooter'); // Remove todas as imagens salvas no localStorage

        console.log('Todas as imagens de footer foram removidas do localStorage.');
    }

    public limparVideosDoLocalStorage() {
        // Remove todos os vídeos de todos os usuários no localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('videoUrl_')) {
                localStorage.removeItem(key); // Remove a chave de vídeo para todos os usuários
            }
        });

        console.log('Todos os vídeos foram removidos do localStorage.');
    }

    public limparMapas() {
        // Remove todos os mapas de todos os usuários no localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('mapa_') || key.startsWith('mapa_nome_')) {
                localStorage.removeItem(key); // Remove a chave do mapa para todos os usuários
            }
        });

        console.log('Todos os mapas foram removidos do localStorage.');
    }

    public limparMapasFooterDoLocalStorage() {
        // Remove todos os mapas footer de todos os usuários no localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('mapasFooter_')) {
                localStorage.removeItem(key); // Remove a chave do mapa footer para todos os usuários
            }
        });

        console.log('Todos os mapas footer foram removidos do localStorage.');
    }

    public limparLinksDoLocalStorage() {
        // Remove todos os links de todos os usuários no localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('links_')) {
                localStorage.removeItem(key); // Remove a chave dos links para todos os usuários
            }
        });

        console.log('Todos os links foram removidos do localStorage.');
    }

    public limparLinksAleatoriosDoLocalStorage() {
        // Remove todos os links aleatórios de todos os usuários no localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('links_aleatorios_')) {
                localStorage.removeItem(key); // Remove a chave de links aleatórios para todos os usuários
            }
        });

        console.log('Todos os links aleatórios foram removidos do localStorage.');
    }

    public limparLinksFooterDoLocalStorage() {
        // Remove todos os links de rodapé de todos os usuários no localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('linksFooter_')) {
                localStorage.removeItem(key); // Remove a chave de links de rodapé para todos os usuários
            }
        });

        console.log('Todos os links de rodapé foram removidos do localStorage.');
    }


}
</script>