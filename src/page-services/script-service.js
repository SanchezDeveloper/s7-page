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
                <a href="../page-contact-us/contact.html">Solicite agora seu orçamento</a>
            </div>
        `;
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




