const url = 'dados/membros.json';

const membrosContainer = document.querySelector('#membros');
const botaoGrade = document.querySelector('#grade');
const botaoLista = document.querySelector('#lista');
const botaoMenu = document.querySelector('#menu');
const navegacao = document.querySelector('#navegacao');

async function obterMembros() {
  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error('Não foi possível carregar os dados dos membros.');
    }

    const membros = await resposta.json();
    exibirMembros(membros);
  } catch (erro) {
    console.error('Erro ao carregar os membros:', erro);
  }
}

function exibirMembros(membros) {
  membrosContainer.innerHTML = '';

  membros.forEach((membro) => {
    const card = document.createElement('section');

    const imagem = document.createElement('img');
    imagem.src = `imagens/${membro.imagem}`;
    imagem.alt = `Logotipo de ${membro.nome}`;
    imagem.loading = 'lazy';
    imagem.width = 300;
    imagem.height = 180;

    const nome = document.createElement('h3');
    nome.textContent = membro.nome;

    const endereco = document.createElement('p');
    endereco.textContent = membro.endereco;

    const telefone = document.createElement('p');
    telefone.textContent = membro.telefone;

    const nivel = document.createElement('p');

    if (membro.nivel === 3) {
      nivel.textContent = 'Membro Ouro';
    } else if (membro.nivel === 2) {
      nivel.textContent = 'Membro Prata';
    } else {
      nivel.textContent = 'Membro';
    }

    const site = document.createElement('a');
    site.href = membro.website;
    site.textContent = 'Visitar site';
    site.target = '_blank';
    site.rel = 'noopener noreferrer';

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(endereco);
    card.appendChild(telefone);
    card.appendChild(nivel);
    card.appendChild(site);

    membrosContainer.appendChild(card);
  });
}

/* VISUALIZAÇÃO EM GRADE */
botaoGrade.addEventListener('click', () => {
  membrosContainer.className = 'grade';

  const imagens = membrosContainer.querySelectorAll('img');

  imagens.forEach((imagem) => {
    imagem.style.display = 'block';
  });
});

/* VISUALIZAÇÃO EM LISTA */
botaoLista.addEventListener('click', () => {
  membrosContainer.className = 'lista';

  const imagens = membrosContainer.querySelectorAll('img');

  imagens.forEach((imagem) => {
    imagem.style.display = 'none';
  });
});

/* MENU MOBILE */
botaoMenu.addEventListener('click', () => {
  const aberto = navegacao.classList.toggle('aberto');

  botaoMenu.setAttribute('aria-expanded', aberto);
});

/* RODAPÉ */
const anoAtual = document.querySelector('#anoAtual');
const ultimaModificacao = document.querySelector('#ultimaModificacao');

anoAtual.textContent = new Date().getFullYear();
ultimaModificacao.textContent = document.lastModified;

obterMembros();