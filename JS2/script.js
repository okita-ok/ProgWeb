function textoComputador(comp){
    if(comp == 1){
        console.log('O computador jogou Papel');
    }
    else if(comp == 2){
        console.log('O computador jogou Pedra');
    }
    else{
        console.log('O computador jogou Tesoura');
    }
}

function perdeu(){
    console.log('Você perdeu! Sua pontuação foi de ' + pontuacao);
    flag = false;
}

function ganhou(){
    console.log('Você ganhou!');
    pontuacao++;
}

function jogada(u, c){
    if(u == 1){//papel
        if(c == 1){//  papel
            console.log('A rodada empatou!');
        }
        else if(c == 2){// pedra
            ganhou();
        }
        else{// tesoura
            perdeu();
        }
    }
    else if(u == 2){// pedra
        if(c == 1){// papel
            perdeu();
        }
        else if(c == 2){// pedra
            console.log('A rodada empatou!');
        }
        else{// tesoura
            ganhou();
        }
    }
    else if(u == 3){// tesoura
        if(c == 1){// papel
            ganhou();
        }
        else if(c == 2){// pedra
            perdeu();
        }
        else{// tesoura
            console.log('A rodada empatou!');
        }
    }
    else{
        console.log('Entrada Inválida. Fim de Jogo!');
        flag = false;
    }
}

let flag = true;
let input;
let comp = 0;
let pontuacao = 0;

while(flag){
    console.log('Escolha a sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura');
    input = parseInt(prompt());
    comp = Math.floor(Math.random() * 3) + 1;
    textoComputador(comp);
    jogada(input, comp);
}