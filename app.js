// let titulo = document.querySelector('h1');
// titulo.innerText = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


let listaDeNumerosSorteados = [];
let numeroLimite = 10;

let numeroSecreto = gerarNumeroAleatorio();
// console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

    
}

exibirMensagemInicial();



function verificarChute() {

    let chute = Number(document.querySelector('.container__input').value);


    if (chute === numeroSecreto) {

        exibirTextoNaTela('h1', 'acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById("reiniciar").removeAttribute('disabled');

    } else {

        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é MENOR');
        } else {
            exibirTextoNaTela('p', 'O número secreto é MAIOR');
        }

        tentativas++;
        limparCampo();
    }



}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    console.log(numeroSecreto);
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    // window.location.reload();
}