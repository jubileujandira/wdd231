// ==============================
// MENU DE NAVEGAÇÃO
// ==============================

const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

botaoMenu.addEventListener("click", () => {
  navegacao.classList.toggle("aberto");

  const aberto = navegacao.classList.contains("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});


// ==============================
// RODAPÉ
// ==============================

const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

anoAtual.textContent = new Date().getFullYear();
ultimaModificacao.textContent = document.lastModified;


// ==============================
// CLIMA - OPENWEATHERMAP
// ==============================

const apiKey = "6be3f10fed2a5313759be3cdd5e95100";

const latitude = -8.0476;
const longitude = -34.8770;

const tempoAtual = document.querySelector("#tempo-atual");
const previsaoTempo = document.querySelector("#previsao-tempo");

const urlAtual =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`;

const urlPrevisao =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`;


// TEMPO ATUAL

async function buscarTempoAtual() {
  try {
    const resposta = await fetch(urlAtual);

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar o clima.");
    }

    const dados = await resposta.json();

    const temperatura = Math.round(dados.main.temp);
    const descricao = dados.weather[0].description;

    tempoAtual.innerHTML = `
      <p><strong>${temperatura}°C</strong></p>
      <p>${descricao}</p>
    `;
  } catch (erro) {
    console.error(erro);
    tempoAtual.innerHTML =
      "<p>Não foi possível carregar o clima.</p>";
  }
}


// PREVISÃO DE 3 DIAS

async function buscarPrevisao() {
  try {
    const resposta = await fetch(urlPrevisao);

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar a previsão.");
    }

    const dados = await resposta.json();

    /*
      A API fornece previsões em intervalos de 3 horas.
      Vamos selecionar aproximadamente o horário de 12:00
      dos próximos três dias.
    */

    const previsoes = dados.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    previsaoTempo.innerHTML = "";

    previsoes.forEach((previsao) => {
      const data = new Date(previsao.dt * 1000);

      const dia = data.toLocaleDateString("pt-BR", {
        weekday: "long"
      });

      const temperatura = Math.round(previsao.main.temp);

      previsaoTempo.innerHTML += `
        <p>
          <strong>${dia}:</strong>
          ${temperatura}°C
        </p>
      `;
    });
  } catch (erro) {
    console.error(erro);
    previsaoTempo.innerHTML =
      "<p>Não foi possível carregar a previsão.</p>";
  }
}


// ==============================
// EMPRESAS EM DESTAQUE
// ==============================

const empresasDestaque =
  document.querySelector("#empresas-destaque");

async function buscarEmpresas() {
  try {
    const resposta = await fetch("dados/membros.json");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os membros.");
    }

    const membros = await resposta.json();

    // Somente membros Ouro (3) e Prata (2)
    const membrosElegiveis = membros.filter(
      (membro) => membro.nivel === 2 || membro.nivel === 3
    );

    // Embaralha os membros
    membrosElegiveis.sort(() => Math.random() - 0.5);

    // Seleciona três empresas
    const selecionados = membrosElegiveis.slice(0, 3);

    empresasDestaque.innerHTML = "";

    selecionados.forEach((membro) => {
      const cartao = document.createElement("section");

      const nivelAssociacao =
        membro.nivel === 3 ? "Ouro" : "Prata";

      cartao.innerHTML = `
        <h3>${membro.nome}</h3>

        <img
          src="imagens/${membro.imagem}"
          alt="Logotipo da empresa ${membro.nome}"
          width="180"
          height="120"
          loading="lazy">

        <p>${membro.endereco}</p>

        <p>
          <strong>Telefone:</strong>
          ${membro.telefone}
        </p>

        <p>
          <a
            href="${membro.website}"
            target="_blank"
            rel="noopener">
            Visitar site
          </a>
        </p>

        <p>
          <strong>Nível:</strong>
          ${nivelAssociacao}
        </p>
      `;

      empresasDestaque.appendChild(cartao);
    });
  } catch (erro) {
    console.error(erro);

    empresasDestaque.innerHTML =
      "<p>Não foi possível carregar as empresas.</p>";
  }
}


// ==============================
// EXECUÇÃO
// ==============================

buscarTempoAtual();
buscarPrevisao();
buscarEmpresas();