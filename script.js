const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconeComecarOuPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/projeto-fokus/sons/luna-rise-part-one.mp3');
const beep = new Audio('/projeto-fokus/sons/beep.mp3');
const play = new Audio('/projeto-fokus/sons/play.wav');
const pause = new Audio('/projeto-fokus/sons/pause.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});



function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/projeto-fokus/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa</strong>
            `                
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        beep.play();
        alert('Tempo finalizado!');
        zerar(); 
        return 
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
    //console.log('Temporizador:' + tempoDecorridoEmSegundos);
    //console.log('Id:' + intervaloId);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        pause.play();
        zerar();
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconeComecarOuPausar.setAttribute('src', '/projeto-fokus/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    iconeComecarOuPausar.setAttribute('src','/projeto-fokus/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormato = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormato}`;
}

mostrarTempo();
