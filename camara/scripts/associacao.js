// Menu responsivo
const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

botaoMenu.addEventListener("click", () => {
  navegacao.classList.toggle("aberto");

  const aberto = navegacao.classList.contains("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);

  botaoMenu.textContent = aberto ? "✕" : "☰";
});

// Data e hora do carregamento do formulário
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
  timestamp.value = new Date().toISOString();
}

// Abrir os modais
const botoesModal = document.querySelectorAll("[data-modal]");

botoesModal.forEach((botao) => {
  botao.addEventListener("click", () => {
    const modalId = botao.dataset.modal;
    const modal = document.querySelector(`#${modalId}`);

    if (modal) {
      modal.showModal();
    }
  });
});

// Fechar os modais
const botoesFechar = document.querySelectorAll(".fechar-modal");

botoesFechar.forEach((botao) => {
  botao.addEventListener("click", () => {
    const modal = botao.closest("dialog");

    if (modal) {
      modal.close();
    }
  });
});

// Fechar modal clicando na área externa
const modais = document.querySelectorAll("dialog");

modais.forEach((modal) => {
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      modal.close();
    }
  });
});

// Ano atual no rodapé
const anoAtual = document.querySelector("#anoAtual");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

// Última modificação da página
const ultimaModificacao = document.querySelector("#ultimaModificacao");

if (ultimaModificacao) {
  ultimaModificacao.textContent = document.lastModified;
}