
import { lugares } from "../dados/lugares.mjs";

// Criar os cartões dos pontos turísticos
const container = document.querySelector("#cartoes-lugares");

lugares.forEach((lugar, indice) => {
  const cartao = document.createElement("article");
  cartao.classList.add("cartao-lugar");
  cartao.style.gridArea = `lugar${indice + 1}`;

  const titulo = document.createElement("h2");
  titulo.textContent = lugar.nome;

  const figura = document.createElement("figure");
  const imagem = document.createElement("img");

  imagem.src = `imagens/${lugar.imagem}`;
  imagem.alt = `Vista de ${lugar.nome}`;
  imagem.width = 300;
  imagem.height = 200;
  imagem.loading = "lazy";

  figura.appendChild(imagem);

  const endereco = document.createElement("address");
  endereco.textContent = lugar.endereco;

  const descricao = document.createElement("p");
  descricao.textContent = lugar.descricao;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Saiba mais";
  botao.setAttribute("aria-expanded", "false");

  const detalhes = document.createElement("p");
  detalhes.classList.add("detalhes-lugar");
  detalhes.textContent = `Localização: ${lugar.endereco}`;
  detalhes.hidden = true;

  botao.addEventListener("click", () => {
    detalhes.hidden = !detalhes.hidden;
    botao.setAttribute("aria-expanded", String(!detalhes.hidden));
  });

  cartao.append(
    titulo,
    figura,
    endereco,
    descricao,
    botao,
    detalhes
  );

  container.appendChild(cartao);
});

// Mensagem sobre a última visita
const mensagem = document.querySelector("#mensagem-visita");
const ultimaVisita = localStorage.getItem("ultimaVisitaCamara");
const agora = Date.now();

if (ultimaVisita === null) {
  mensagem.textContent =
    "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
} else {
  const diferenca = agora - Number(ultimaVisita);
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

  if (dias < 1) {
    mensagem.textContent = "Já voltou? Que legal!";
  } else if (dias === 1) {
    mensagem.textContent = "Seu último acesso foi há 1 dia.";
  } else {
    mensagem.textContent = `Seu último acesso foi há ${dias} dias.`;
  }
}

localStorage.setItem("ultimaVisitaCamara", String(agora));

// Menu responsivo
const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

botaoMenu.addEventListener("click", () => {
  const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

  botaoMenu.setAttribute("aria-expanded", String(!aberto));
  navegacao.classList.toggle("aberto", !aberto);
});

// Informações do rodapé
document.querySelector("#anoAtual").textContent =
  new Date().getFullYear();

document.querySelector("#ultimaModificacao").textContent =
  document.lastModified;
