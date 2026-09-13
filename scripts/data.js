const anoAtual = document.querySelector("#ano-atual");
const ultimaModificacao = document.querySelector("#ultima-modificacao");

anoAtual.textContent = new Date().getFullYear();

ultimaModificacao.textContent =
  `Última modificação: ${document.lastModified}`;