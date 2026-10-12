
"use strict";

// ==========================================
// iGaming Insights Brasil
// Menu responsivo e armazenamento local
// ==========================================

// MENU RESPONSIVO

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
        );
    });
}

// ==========================================
// LOCALSTORAGE - REGISTRO DE VISITAS
// ==========================================

const chaveVisitas = "igaming-total-visitas";
const chaveUltimaVisita = "igaming-ultima-visita";

function registrarVisita() {
    try {
        const visitasAnteriores = Number(
            localStorage.getItem(chaveVisitas)
        ) || 0;

        const totalVisitas = visitasAnteriores + 1;

        const ultimaVisita = localStorage.getItem(
            chaveUltimaVisita
        );

        localStorage.setItem(
            chaveVisitas,
            String(totalVisitas)
        );

        localStorage.setItem(
            chaveUltimaVisita,
            new Date().toISOString()
        );

        console.log(
            "Total de visitas neste navegador:",
            totalVisitas
        );

        if (ultimaVisita) {
            console.log(
                "Visita anterior:",
                new Date(ultimaVisita).toLocaleString("pt-BR")
            );
        } else {
            console.log(
                "Esta é a primeira visita registrada."
            );
        }

        // Exibe os dados se existir um elemento
        // com o identificador contador-visitas.

        const contador = document.querySelector(
            "#contador-visitas"
        );

        if (contador) {
            contador.textContent =
                `Acessos registrados neste navegador: ${totalVisitas}`;
        }

    } catch (erro) {
        console.warn(
            "Não foi possível acessar o armazenamento local.",
            erro
        );
    }
}

registrarVisita();
