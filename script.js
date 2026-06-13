/**
 * SISTEMA COMPACTO DE CONTROLE DE ESTADO - BIOTERRA
 */

// 1. DADOS DOS COMPONENTES (Array de Objetos)
const CAROUSEL_DATA = [
    {
        tag: "Idade: Livre 🌍",
        title: "Policultivo: O Fim das Monoculturas",
        text: "Ao plantar diversas espécies juntas, uma ajuda a outra a crescer. Raízes de profundidades diferentes compartilham água, imitando o design inteligente de florestas nativas."
    },
    {
        tag: "Idade: Curiosos 🔬",
        title: "Plantas de Cobertura e Proteção",
        text: "O solo nunca deve ficar nu! Plantas de cobertura funcionam como uma roupa protetora contra o sol escaldante, evitando a evaporação e nutrindo microrganismos vivos."
    },
    {
        tag: "Idade: Prático 🌾",
        title: "Integração Lavoura-Pecuária-Floresta",
        text: "Animais e árvores compartilham o mesmo espaço em harmonia. O gado fertiliza o solo naturalmente, enquanto as árvores fornecem sombra e madeira sustentável."
    }
];

const FAQ_DATA = [
    {
        question: "O que diferencia a agricultura regenerativa da orgânica?",
        answer: "A orgânica foca em não usar agroquímicos sintéticos. A regenerativa vai além: ela busca ativamente recuperar, curar e melhorar a biodiversidade e a resiliência do solo que foi degradado."
    },
    {
        question: "Como as crianças e escolas podem interagir com isso?",
        answer: "A biodiversidade é altamente visual e palpável. Através de pequenas hortas escolares, compostagem e observação de insetos, qualquer idade pode compreender o equilíbrio dos biomas."
    },
    {
        question: "É possível aplicar em larga escala?",
        answer: "Sim! Grandes fazendas em todo o mundo já utilizam rotação de culturas complexas e maquinários de plantio direto para regenerar milhares de hectares mantendo a alta lucratividade."
    }
];

// 2. INICIALIZAÇÃO DE COMPONENTES INTERATIVOS
function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    CAROUSEL_DATA.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            <span class="carousel-badge">${item.tag}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        `;
        track.appendChild(slide);
    });

    let currentIndex = 0;
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % CAROUSEL_DATA.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length;
        updateCarousel();
    });
}

function initAccordion() {
    const accordionContainer = document.getElementById('faq-accordion');
    if (!accordionContainer) return;

    FAQ_DATA.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.className = 'accordion-item';
        
        accItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" data-index="${index}">
                <span>${item.question}</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>${item.answer}</p>
            </div>
        `;
        accordionContainer.appendChild(accItem);
    });

    accordionContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const currentItem = header.parentElement;
        const content = currentItem.querySelector('.accordion-content');
        const isCurrentlyActive = currentItem.classList.contains('active');

        // Fecha todos antes de abrir o atual (efeito sanfona)
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-content').style.maxHeight = null;
            item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        });

        if (!isCurrentlyActive) {
            currentItem.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            header.setAttribute('aria-expanded', 'true');
        }
    });
}

// 3. ENGENHARIA DE ACESSIBILIDADE (FONTES E CONTRASTE)
function initAccessibility() {
    let currentFontSize = 16;
    const bodyElement = document.body;

    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');
    const btnContrast = document.getElementById('btn-contrast');

    if (btnIncrease && btnDecrease) {
        btnIncrease.addEventListener('click', () => {
            if (currentFontSize < 24) {
                currentFontSize += 2;
                bodyElement.style.fontSize = currentFontSize + 'px';
            }
        });

        btnDecrease.addEventListener('click', () => {
            if (currentFontSize > 12) {
                currentFontSize -= 2;
                bodyElement.style.fontSize = currentFontSize + 'px';
            }
        });
    }

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            bodyElement.classList.toggle('high-contrast');
        });
    }
}

// Execução segura ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initAccordion();
    initAccessibility();
});