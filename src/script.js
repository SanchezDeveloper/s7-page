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
}, 10000);



//slider
var counter = 1;
var slideInterval;

function startSlideInterval() {
    slideInterval = setInterval(function() {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if (counter > 6) {
            counter = 1;
        }
    }, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

    // Inicializa o intervalo quando a página carrega
startSlideInterval();

    // Adiciona o event listener para os botões de navegação
var navButtons = document.querySelectorAll('.nav-m .m-btn');
navButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Desmarcar todos os botões de rádio
        document.querySelectorAll('.slider input[type="radio"]').forEach(input => {
            input.checked = false;
        });

        // Marcar o botão de rádio correspondente ao botão clicado
        var id = button.getAttribute('for');
        document.getElementById(id).checked = true;
        
        // Atualiza o contador para o slide atual
        counter = parseInt(id.replace('radio', ''), 10);
        
        // Reinicia o intervalo
        resetSlideInterval();
    });
});
