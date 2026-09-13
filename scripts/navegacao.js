const botaoDeNav = document.querySelector('#botao-de-nav');
const barraNavegacao = document.querySelector('#barra-navegacao');

botaoDeNav.addEventListener('click', () => {
  botaoDeNav.classList.toggle('exibir');
  barraNavegacao.classList.toggle('exibir');
});