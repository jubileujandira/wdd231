// iGaming Insights Brasil - Modalidades esportivas

const listaEsportes = document.querySelector("#lista-esportes");
const filtroCategoria = document.querySelector("#filtro-categoria");
const resultadoContagem = document.querySelector("#resultado-contagem");

const modal = document.querySelector("#modal-esporte");
const modalTitulo = document.querySelector("#modal-titulo");
const modalDetalhes = document.querySelector("#modal-detalhes");
const fecharModal = document.querySelector("#fechar-modal");

const chavePreferencia = "igaming-categoria-esportes";

let modalidades = [];

// Recuperar preferência salva
function recuperarPreferencia() {
    try {
        const categoriaSalva = localStorage.getItem(chavePreferencia);

        const categoriaValida = Array.from(filtroCategoria.options)
            .some((opcao) => opcao.value === categoriaSalva);

        if (categoriaValida) {
            filtroCategoria.value = categoriaSalva;
        }
    } catch (erro) {
        console.warn("Não foi possível recuperar a preferência.", erro);
    }
}

// Salvar preferência
function salvarPreferencia(categoria) {
    try {
        localStorage.setItem(chavePreferencia, categoria);
    } catch (erro) {
        console.warn("Não foi possível salvar a preferência.", erro);
    }
}

// Carregar modalidades do JSON
async function carregarModalidades() {
    try {
        const resposta = await fetch("data/modalidades.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
            throw new Error("Formato de dados inválido.");
        }

        modalidades = dados;

        recuperarPreferencia();
        aplicarFiltro();

    } catch (erro) {
        console.error("Erro ao carregar modalidades:", erro);

        listaEsportes.textContent =
            "Não foi possível carregar as modalidades esportivas.";

        resultadoContagem.textContent = "";
    }
}

// Criar um parágrafo com rótulo e valor
function criarInformacao(rotulo, valor) {
    const paragrafo = document.createElement("p");
    const destaque = document.createElement("strong");

    destaque.textContent = `${rotulo}: `;
    paragrafo.appendChild(destaque);
    paragrafo.appendChild(document.createTextNode(String(valor)));

    return paragrafo;
}

// Exibir modalidades dinamicamente
function exibirModalidades(lista) {
    listaEsportes.replaceChildren();

    resultadoContagem.textContent =
        `${lista.length} modalidade(s) encontrada(s).`;

    if (lista.length === 0) {
        listaEsportes.textContent = "Nenhuma modalidade encontrada.";
        return;
    }

    lista.forEach((esporte) => {
        const artigo = document.createElement("article");
        artigo.classList.add("info-card");

        const titulo = document.createElement("h3");
        titulo.textContent = esporte.nome;

        artigo.appendChild(titulo);
        artigo.appendChild(criarInformacao("Categoria", esporte.categoria));
        artigo.appendChild(criarInformacao("Participantes", esporte.participantes));
        artigo.appendChild(criarInformacao("Mercados", esporte.mercados));
        artigo.appendChild(criarInformacao("ID", esporte.id));

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "button-secondary";
        botao.textContent = "Ver detalhes";

        botao.addEventListener("click", () => {
            abrirDetalhes(esporte);
        });

        artigo.appendChild(botao);
        listaEsportes.appendChild(artigo);
    });
}

// Abrir modal
function abrirDetalhes(esporte) {
    modalTitulo.textContent = esporte.nome;

    modalDetalhes.replaceChildren(
        criarInformacao("Identificação", esporte.id),
        criarInformacao("Categoria", esporte.categoria),
        criarInformacao("Participantes", esporte.participantes),
        criarInformacao("Mercados", esporte.mercados)
    );

    modal.showModal();
}

// Aplicar filtro
function aplicarFiltro() {
    const categoria = filtroCategoria.value;

    const modalidadesFiltradas = modalidades.filter((esporte) => {
        return categoria === "todos" ||
               esporte.categoria === categoria;
    });

    exibirModalidades(modalidadesFiltradas);
}

// Alteração de categoria
filtroCategoria.addEventListener("change", () => {
    salvarPreferencia(filtroCategoria.value);
    aplicarFiltro();
});

// Fechar modal
fecharModal.addEventListener("click", () => {
    modal.close();
});

// Fechar ao clicar fora do modal
modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.close();
    }
});

// Inicialização
carregarModalidades();