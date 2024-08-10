const html = document.querySelector('html');
const pomodoroBotao = document.querySelector('.app__card-botao--pomodoro');
const curtoBotao = document.querySelector('.app__card-botao--curto');
const longoBotao = document.querySelector('.app__card-botao--longo');
const botoes = document.querySelectorAll('.app__card-botao');
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const iniciarOuPausarBotaoIcon = document.querySelector('.app__card-botao-iniciar_icon');
const audioPlay = new Audio ('/sounds/play.wav');
const audioPause = new Audio ('/sounds/pause.mp3');
const audioBeep = new Audio ('/sounds/beep.mp3')
const timerTela = document.querySelector('#timer')

let tempoSegundos = 1500;
let intervaloId = null;

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (botao){
        botao.classList.remove('ativo'); //remove o destaque (class active) dos botões que não estao selecionados
    })
    html.setAttribute('data-contexto', contexto)
}

pomodoroBotao.addEventListener('click', () => {
    tempoSegundos = 1500;
    alterarContexto('pomodoro')
    pomodoroBotao.classList.add('ativo')
});

curtoBotao.addEventListener('click', () => {
    tempoSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('ativo')
});

longoBotao.addEventListener('click', () => {
    tempoSegundos = 900;
    alterarContexto('descanso-longo')
    longoBotao.classList.add('ativo')
});

const contagemRegressiva = () => { 
    if(tempoSegundos <= 0) {
        audioBeep.play()
        alert('Tempo finalizado!')
        parar()
        return;
    }
    tempoSegundos -= 1;
    mostrarTempo()
}

iniciarOuPausarBotao.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPause.play()
        parar()
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    audioPlay.play()
    iniciarOuPausarBotao.textContent = "Pausar"
    iniciarOuPausarBotaoIcon.setAttribute('src', './assets/pause.png')
}

function parar() {
    clearInterval(intervaloId)
    iniciarOuPausarBotao.textContent = "Iniciar"
    iniciarOuPausarBotaoIcon.setAttribute('src', './assets/play_arrow.png')
    intervaloId = null
}

function mostrarTempo () {
    const timer = new Date(tempoSegundos * 1000)
    const timerFormatado = timer.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timerTela.innerHTML = `${timerFormatado}`
}

mostrarTempo()