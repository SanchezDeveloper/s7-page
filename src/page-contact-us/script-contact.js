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
        bubble.style.display = 'nome'
    } else {
        bubble.style.display = 'block'
    }
}, 5000);





// populateSelect

async function populateSelect() {
    try {
        // Faz a requisição para obter o arquivo JSON
        const response = await fetch('../page-services/services.json'); // Ajuste o caminho para o arquivo JSON

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON.');
        }

        // Converte o JSON em um array de objetos
        const services = await response.json();

        // Seleciona o elemento <select> do HTML
        const select = document.getElementById('sector-select');

        // Limpa as opções existentes (se houver)
        select.innerHTML = '<option value="">Selecione um assunto</option>';

        // Percorre os serviços e cria uma <option> para cada título
        services.forEach(service => {
            if (service.title) { // Verifica se o título está definido
                const option = document.createElement('option');
                option.value = service.title; // Define o valor da opção como o título do serviço
                option.textContent = service.title; // Texto exibido na opção
                select.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os serviços:', error);
    }
}

// Chamar a função para preencher o select ao carregar a página
document.addEventListener('DOMContentLoaded', populateSelect);


// Função para gerar o link do WhatsApp
function gerarLinkWhatsapp(dados) {
    const mensagem =
        `Olá, me chamo ${dados.nome}\n` +
        `Quero saber mais sobre ${dados.assunto}\n`+
        `Mensagem específica: ${dados.mensagem}\n`;

    // Substitua o número abaixo pelo número de telefone do WhatsApp
    return `https://api.whatsapp.com/send?phone=6135273860&text=${encodeURIComponent(mensagem)}`;
}

// Seleciona o formulário pelo ID
const formulario = document.getElementById('contact-form');

// Adiciona um evento de submissão ao formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Coleta os valores dos campos
    const dados = {
        nome: document.getElementById('name').value,
        assunto: document.getElementById('sector-select').value,
        mensagem: document.getElementById('message').value
    };

    // Gera o link do WhatsApp com os dados do formulário
    const linkWhatsapp = gerarLinkWhatsapp(dados);

    // Abre o link do WhatsApp em uma nova aba
    window.open(linkWhatsapp, '_blank');
});


//copiar email 
document.getElementById('copy-email-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    // Endereço de e-mail que você deseja copiar
    const email = 'S7portoesautomaticos@outlook.com';

    // Cria um elemento de input temporário para copiar o texto
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Opcional: exibe uma mensagem de confirmação
    alert('Endereço de e-mail copiado para a área de transferência!');
});