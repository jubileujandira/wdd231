
const dadosFormulario = document.querySelector("#dados-formulario");

const parametros = new URLSearchParams(window.location.search);

const nome = parametros.get("nome");
const email = parametros.get("email");
const interesse = parametros.get("interesse");
const mensagem = parametros.get("mensagem");

if (dadosFormulario) {
    dadosFormulario.replaceChildren();

    if (nome && email && interesse) {
        const titulo = document.createElement("h3");
        titulo.textContent = "Dados enviados";

        dadosFormulario.appendChild(titulo);

        const dados = [
            ["Nome", nome],
            ["E-mail", email],
            ["Área de interesse", interesse],
            ["Mensagem", mensagem || "Não informada"]
        ];

        dados.forEach(([rotulo, valor]) => {
            const paragrafo = document.createElement("p");
            const destaque = document.createElement("strong");

            destaque.textContent = `${rotulo}: `;
            paragrafo.append(destaque, document.createTextNode(valor));

            dadosFormulario.appendChild(paragrafo);
        });
    } else {
        const aviso = document.createElement("p");
        aviso.textContent =
            "Nenhum formulário foi enviado. Preencha o formulário na página inicial.";

        dadosFormulario.appendChild(aviso);
    }
}
