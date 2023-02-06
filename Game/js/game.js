/*
  REGRA 1: PONTUACAO E 3 VIDAS
  REGRA 2: COMECA COM A BARRA DE ESPACO E PAUSA COM P
  REGRA 3: NAVE NAO PODE ULTRAPASSAR O CENARIO (OK)
  REGRA 4: DISCO VOADOR, ASTEROIDE GRANDE E ASTEROIDE PEQUENO
  REGRA 5: VELOCIDADE DOS OBSTACULOS ALEATORIA
  REGRA 6: VELOCIDADE MEDIA DOS OBSTACULOS AUMENTA POR MINUTO
  REGRA 7: BARRA DE ESPACO = TIRO / ACERTOU NO OBSTACULO = QUEBROU (PARCIALMENTE OK)
           ASTEROIDE GRANDE: 10 PONTOS
           DISCO VOADOR: 20 PONTOS
           NAVE EXTRATERRESTRE: 50 PONTOS
           ASTEROIDE PEQUENO: 100 PONTOS
  REGRA 8: APENAS 3 VIDAS, BATEU PERDEU UMA / NAVE VAI APARECER COM DANOS POR 5 SEGUNDOS
  REGRA 9: PERDEU TODAS AS VIDAS = MORREU / MENSAGEM DE GAMEOVER E BOTAO DE RESTART
  REGRA 10: OBSTACULO MORREU OU SAIU DO CENARIO = TIRA DA DOM (PARCIALMENTE OK)
*/

(function () {
  const TAMX = 600;
  const TAMY = 800;
  const FPS = 120;

  const PROB_ENEMY_SHIP = 0.5;

  let space, ship;
  let enemies = [];
  let shots = [];
  let dmg = false;

  function init() {
    space = new Space();
    ship = new Ship();
    const interval = window.setInterval(run, 1000 / FPS);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") ship.mudaDirecao(-1);
    else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
    else if (e.key === " ") shots.push(new Shot());
  });

  class Space {
    constructor() {
      this.element = document.getElementById("space");
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPositionY = "0px";
    }
    move() {
      this.element.style.backgroundPositionY = `${
        parseInt(this.element.style.backgroundPositionY) + 1
      }px`;
    }
  }

  class Ship { // 99 x 75 px
    constructor() {
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "assets/playerLeft.png",
        "assets/player.png",
        "assets/playerRight.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.bottom = "20px";
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`;
    }
    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        if(dmg == false){
          this.element.src = this.AssetsDirecoes[this.direcao];
        }
      }
    }
    move() {
      if (this.direcao === 0)
        if(parseInt(this.element.style.left)>0){
          this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
        }
      if (this.direcao === 2)
        if(parseInt(this.element.style.left)<=500){
          this.element.style.left = `${parseInt(this.element.style.left) + 1}px`;
        }
      space.move();
    }
    collision(){ //mudar isso aqui
      let navesInimigas = document.getElementsByClassName("enemy-ship");
      // ovnis
      // asteroide grande
      // asteroide pequeno

      let xNave = parseInt(this.element.style.left);
      let yNave = parseInt(this.element.style.bottom);

      // array de naves inimigas
      Array.from(navesInimigas).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yNave+75 >= yInimigo-25) && (yNave+75 <= yInimigo+25)){
          if(((xNave+99 >= xInimigo) && (xNave+99 <= xInimigo+98)) || ((xNave <= xInimigo+98) && (xNave >= xInimigo))){
            // 1) a ponta direita da nave eh maior que a ponta esquerda do inimigo E
            //    a ponta direita da nave eh menor que a ponta direita do inimigo
            // 2) a ponta esquerda da nave eh maior que a ponta esquerda do inimigo E
            //    a ponta esquerda da nave eh menor que a ponta direita do inimigo
            this.damage();
          }
        }
      });

      // array de ovnis

      // array de asteroide grande

      // array de asteroides pequenos
    }
    damage(){
      dmg = true;
      this.element.src = "assets/playerDamaged.png";
      setTimeout(this.damage_effect,4000);
    }
    damage_effect(){
      dmg = false;
      document.getElementById("ship").src = "assets/player.png";
    }
  }

  class Shot{ // 9 x 33 px
    constructor(){
      this.element = document.createElement("img");
      this.element.className = "shot";
      this.element.src = "assets/laserRed.png";
      this.element.style.bottom = "95px";
      let nave = document.getElementById("ship");
      this.element.style.left = `${parseInt(nave.style.left) + 45}px`;
      space.element.appendChild(this.element);
    }
    move(){
      this.element.style.bottom = `${parseInt(this.element.style.bottom) + 5}px`;
      if(parseInt(this.element.style.bottom) >= 800){
        this.element.remove();
      }
    }
    hit(){ // CRIAR CLASSES OVNI, ASTEROIDE, ETC.
      let navesInimigas = document.getElementsByClassName("enemy-ship");
      // ovnis
      // asteroide grande
      // asteroide pequeno

      let xTiro = parseInt(this.element.style.left);
      let yTiro = parseInt(this.element.style.bottom);

      // array de naves inimigas
      Array.from(navesInimigas).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yTiro+17 >= yInimigo-25) && (yTiro+17 <= yInimigo+25)){
          if((xTiro >= xInimigo) && (xTiro <= xInimigo+99)){
            e.remove();
          }
        }
      });

      // array de ovnis

      // array de asteroide grande

      // array de asteroides pequenos
    }
  }

  class EnemyShip { // 98 x 50 px
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ship";
      this.element.src = "assets/enemyShip.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + 2}px`;
      if(parseInt(this.element.style.top) >= 800){
        this.element.remove();
      }
    }
  }

  function run() {
    const random_enemy_ship = Math.random() * 100;
    if (random_enemy_ship <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    enemies.forEach((e) => e.move());
    shots.forEach((e) => {
      e.move();
      e.hit();
    });
    ship.move();
    if(dmg == false) ship.collision();


  }
  
  init();
})();
