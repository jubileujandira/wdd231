const cursos = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false
  }
];

const listaCursos = document.querySelector("#lista-cursos");
const totalCreditos = document.querySelector("#total-creditos");

const botaoTodos = document.querySelector("#todos");
const botaoCse = document.querySelector("#cse");
const botaoWdd = document.querySelector("#wdd");

function exibirCursos(lista) {
  listaCursos.innerHTML = "";

  lista.forEach((curso) => {
    const elementoCurso = document.createElement("div");

    elementoCurso.classList.add("curso");

    if (curso.completed) {
      elementoCurso.classList.add("concluido");
    }

    elementoCurso.innerHTML = `
      <p>${curso.subject} ${curso.number}</p>
      <p>${curso.title}</p>
      <p>${curso.credits} créditos</p>
    `;

    listaCursos.appendChild(elementoCurso);
  });

  calcularCreditos(lista);
}

function calcularCreditos(lista) {
  const total = lista.reduce((soma, curso) => {
    return soma + curso.credits;
  }, 0);

  totalCreditos.textContent = total;
}

botaoTodos.addEventListener("click", () => {
  exibirCursos(cursos);
});

botaoCse.addEventListener("click", () => {
  const cursosCse = cursos.filter((curso) => curso.subject === "CSE");
  exibirCursos(cursosCse);
});

botaoWdd.addEventListener("click", () => {
  const cursosWdd = cursos.filter((curso) => curso.subject === "WDD");
  exibirCursos(cursosWdd);
});

exibirCursos(cursos);