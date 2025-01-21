//menumobile
const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

//whatsapp bubble 
const bubble = document.getElementById('bubbleParagraph');
setInterval(function toggleBubble() {
    if (bubble.classList.contains('show')) {
        bubble.classList.remove('show');
    } else {
        bubble.classList.add('show');
    }

    if (window.getComputedStyle(bubble).opacity === '0') {
        bubble.style.display = 'nome';
    } else {
        bubble.style.display = 'block';
    }
}, 5000);


//filtro de serviços e rederização de serviços


const servicesContainer = document.getElementById('services');
const filterSector = document.getElementById('sector-filter');
let servicesData = [];


//função para buscar os dados do JSON e redenrizar os serviços
async function loadServices() {
    try {
        const response = await fetch('services.json');
        servicesData = await response.json();

        renderServices(servicesData);
        
        filterSector.addEventListener('change', function(){
            const sectorSelected = this.value;

            //Filtra os servços de acordo com o setor selecionado
            const filteredServices = servicesData.filter(service => {
                if ( sectorSelected === 'todos') {
                    return true; //Mostra todos os serviços
                }
                return service.sector === sectorSelected;
            });

            //Renderiza os serviços filtrados
            renderServices(filteredServices);
        });

    } catch (error) {
        console.error('Erro ao carregar os serviços:', error)
    }
}

// Função para criar o HTML dos serviços
function renderServices(services) {
    servicesContainer.innerHTML = ''; // Limpa os serviços renderizados anteriormente
    services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service');
        serviceElement.setAttribute('data-sector', service.sector); // Atribui o data-sector

        // Criar o conteúdo HTML dos serviços
        serviceElement.innerHTML = `
            <div class="service-img"><img class="service-img" src="${service.image}" alt="${service.title}"></div>
            <div class="service-desc">
                <h2>${service.title}</h2>
                <p>${service.description}</p>
                <div class="service-buttons">
                    <a href="../page-contact-us/contact.html" class="service-btn1">Solicite agora seu orçamento</a>
                    <a href="#" class="service-btn2">Saiba Mais</a>
                </div>
            </div>
        `;
        // Encontrar o botão "Saiba Mais" e adicionar um evento de clique
        const saibaMaisBtn = serviceElement.querySelector('.service-btn2');
        saibaMaisBtn.addEventListener('click', (e) => {
            e.preventDefault();  // Previne a navegação para a outra página
            openModal(service);  // Abre o modal com as informações do serviço
        });

        servicesContainer.appendChild(serviceElement);
    });
}

// Inicializar os serviços na página
loadServices();

filterSector.addEventListener('change', function() {
    const sectorSelected = this.value;
    
    // Filtra os serviços de acordo com o setor selecionado
    const filteredServices = servicesData.filter(service => {
        if (sectorSelected === 'todos') {
            return true; // Mostra todos os serviços
        }
        return service.sector === sectorSelected;
    });

    // Renderiza os serviços filtrados
    renderServices(filteredServices);
});

//Modal de saiba mais dos serviços
// Variáveis globais
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalAdvantages = document.getElementById('modal-advantages');
const closeModalBtn = document.getElementById('close-modal-btn');
const overlay = document.getElementById('overlay');


// Função para abrir o modal e preencher com os dados do serviço
function openModal(service) {
    // Preenche o modal com as informações do serviço
    modalTitle.textContent = service.title;  // Título do serviço
    modalImage.innerHTML = `<img src="${service.image}" alt="Imagem do Serviço">`;  // Imagem adicional (image2)
    modalAdvantages.textContent = service.advantages;  // Vantagens do serviço

    // Exibe o modal e a sobrecarga (se existir)
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Função para fechar o modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');  // Fecha o modal
    overlay.classList.remove('active');  // Remove a sobrecarga (se existir)
});

// Inicializar os serviços na página
loadServices();

