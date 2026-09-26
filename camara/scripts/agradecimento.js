// Menu responsivo
const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

botaoMenu.addEventListener("click", () => {
  navegacao.classList.toggle("aberto");

  const aberto = navegacao.classList.contains("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.textContent = aberto ? "✕" : "☰";
});

// Obtém os parâmetros enviados pelo formulário
const parametros = new URLSearchParams(window.location.search);

const nome = parametros.get("nome");
const sobrenome = parametros.get("sobrenome");
const email = parametros.get("email");
const telefone = parametros.get("telefone");
const organizacao = parametros.get("organizacao");
const timestamp = parametros.get("timestamp");

const dadosEnviados = document.querySelector("#dados-enviados");

// Formata a data e hora
let dataFormatada = timestamp;

if (timestamp) {
  const data = new Date(timestamp);

  dataFormatada = data.toLocaleString("pt-BR");
}

// Exibe os campos obrigatórios
dadosEnviados.innerHTML = `
  <p><strong>Nome:</strong> ${nome ?? ""} ${sobrenome ?? ""}</p>
  <p><strong>E-mail:</strong> ${email ?? ""}</p>
  <p><strong>Celular:</strong> ${telefone ?? ""}</p>
  <p><strong>Empresa/Organização:</strong> ${organizacao ?? ""}</p>
  <p><strong>Data e hora:</strong> ${dataFormatada ?? ""}</p>
`;

// Rodapé
const anoAtual = document.querySelector("#anoAtual");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

const ultimaModificacao = document.querySelector("#ultimaModificacao");

if (ultimaModificacao) {
  ultimaModificacao.textContent = document.lastModified;
}