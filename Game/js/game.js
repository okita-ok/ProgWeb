(function () {
  const TAMX = 600;
  const TAMY = 800;
  const FPS = 120;

  const PROB_ENEMY_SHIP = 0.4;
  const PROB_OVNI = 0.1;
  const PROB_BIG_METEOR = 0.05;
  const PROB_SMALL_METEOR = 0.03;

  let space, ship;
  let enemies = [];
  let ovnis = [];
  let bigMeteors = [];
  let smallMeteors = [];
  let shots = [];
  let dmg = false;

  // flags do jogo
  let game_start = false;
  let game_pause = false;

  let global_speed = 2; // velocidade global do jogo
  let score = 0; // score do jogo
  let lives = [];

  let interval;
  let interval_speed;

  function init() {
    space = new Space();
    ship = new Ship();
    score_div = new Score();
    for(let i=0; i<3; i++){
      lives.push(new Life(i));
    }
  }

  function start(){
    interval = window.setInterval(run, 1000 / FPS);
    interval_speed = window.setInterval(speed, 60000);
    game_start = true;
  }

  window.addEventListener("keydown", (e) => {
    if(game_pause==false && game_start==true){
      if (e.key === "ArrowLeft") ship.mudaDirecao(-1);
      else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
      else if (e.key === " ") shots.push(new Shot());
    }
    if(game_start==true){
      if (e.key === "p") pause_resume_game();
    }
    else{
      if (e.key === " ") start();
    }
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

  class Score{
    constructor(){
      this.element = document.getElementById("score");
      this.element.style.top = "5px";
      this.element.style.right = "5px";
      this.element.innerHTML = "000000";
    }
    add_score(points){
      score += points;
      let score_str = score.toString();
      for(let x = score_str.length; x<6; x++){
        score_str = "0" + score_str;
      } 
      this.element.innerHTML = score_str;
    }
  }

  class Life{
    constructor(position){
      this.element = document.createElement("img");
      this.element.className = "life";
      this.element.src = "assets/life.png";
      this.element.style.top = "8px";
      this.element.style.left = `${(TAMX/2 + TAMX/4 + 3) - position*38}px`;
      space.element.appendChild(this.element);
    }
    remove(){
      this.element.remove();
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
    collision(){
      // naves inimigas
      let navesInimigas = document.getElementsByClassName("enemy-ship");
      // ovnis
      let ovnis = document.getElementsByClassName("enemyUfo");
      // asteroide grande
      let asteroidesG = document.getElementsByClassName("meteorBig");
      // asteroide pequeno
      let asteroidesP = document.getElementsByClassName("meteorSmall");

      let xNave = parseInt(this.element.style.left);
      let yNave = parseInt(this.element.style.bottom);

      // 1) a ponta direita da nave eh maior que a ponta esquerda do inimigo E
      //    a ponta direita da nave eh menor que a ponta direita do inimigo
      // 2) a ponta esquerda da nave eh maior que a ponta esquerda do inimigo E
      //    a ponta esquerda da nave eh menor que a ponta direita do inimigo

      // array de naves inimigas
      Array.from(navesInimigas).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yNave+75 >= yInimigo-25) && (yNave+75 <= yInimigo+25)){ // 1)
          if(((xNave+99 >= xInimigo) && (xNave+99 <= xInimigo+98)) || ((xNave <= xInimigo+98) && (xNave >= xInimigo))){ //2)
            this.damage();
          }
        }
      });

      // array de ovnis
      Array.from(ovnis).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yNave+75 >= yInimigo-45) && (yNave+75 <= yInimigo+45)){ // 1)
          if(((xNave+99 >= xInimigo) && (xNave+99 <= xInimigo+91)) || ((xNave <= xInimigo+91) && (xNave >= xInimigo))){ // 2)
            this.damage();
          }
        }
      });

      // array de asteroide grande
      Array.from(asteroidesG).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yNave+75 >= yInimigo-55) && (yNave+75 <= yInimigo+55)){ //1) 
          if(((xNave+99 >= xInimigo) && (xNave+99 <= xInimigo+136)) || ((xNave <= xInimigo+136) && (xNave >= xInimigo))){//2)
            this.damage();
          }
        }
      });

      // array de asteroides pequenos
      Array.from(asteroidesP).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yNave+75 >= yInimigo-21) && (yNave+75 <= yInimigo+21)){//1)
          if(((xNave+99 >= xInimigo) && (xNave+99 <= xInimigo+44)) || ((xNave <= xInimigo+44) && (xNave >= xInimigo))){//2)
            this.damage();
          }
        }
      });
    }
    damage(){
      dmg = true;
      this.element.src = "assets/playerDamaged.png";
      lives[lives.length-1].remove();
      lives.pop();
      setTimeout(this.damage_effect,4000);
    }
    damage_effect(){
      dmg = false;
      document.getElementById("ship").src = "assets/player.png";
    }
  }

  class Gameover{
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "gameover";
      this.element.id = "fimdejogo";
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.innerHTML = "Game Over!";
      space.element.appendChild(this.element);

      let botao = document.createElement("button");
      botao.className = "button";
      botao.innerHTML = "Restart";
      botao.style.left = `${TAMX/2 - 48}px`;
      botao.style.bottom = `${TAMY/2 - 60}px`;
      space.element.appendChild(botao);

      botao.addEventListener("click", function() {
        restart_game();
        botao.remove();
        space.element.removeChild(document.getElementById("fimdejogo"));
      });
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
    hit(){
      // naves inimigas
      let navesInimigas = document.getElementsByClassName("enemy-ship");
      // ovnis
      let ovnis = document.getElementsByClassName("enemyUfo");
      // asteroide grande
      let asteroidesG = document.getElementsByClassName("meteorBig");
      // asteroide pequeno
      let asteroidesP = document.getElementsByClassName("meteorSmall");

      let xTiro = parseInt(this.element.style.left);
      let yTiro = parseInt(this.element.style.bottom);

      // array de naves inimigas
      Array.from(navesInimigas).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yTiro+17 >= yInimigo-25) && (yTiro+17 <= yInimigo+25)){
          if((xTiro >= xInimigo) && (xTiro <= xInimigo+99)){
            e.remove();
            score_div.add_score(50);
          }
        }
      });

      // array de ovnis
      Array.from(ovnis).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yTiro+17 >= yInimigo-45) && (yTiro+17 <= yInimigo+45)){
          if((xTiro >= xInimigo) && (xTiro <= xInimigo+91)){
            e.remove();
            score_div.add_score(20);
          }
        }
      });
      // array de asteroide grande
      Array.from(asteroidesG).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yTiro+17 >= yInimigo-55) && (yTiro+17 <= yInimigo+55)){
          if((xTiro >= xInimigo) && (xTiro <= xInimigo+136)){
            e.remove();
            score_div.add_score(10);
          }
        }
      });

      // array de asteroides pequenos
      Array.from(asteroidesP).forEach((e) => {
        let xInimigo = parseInt(e.style.left);
        let yInimigo = 800 - parseInt(e.style.top);

        if((yTiro+17 >= yInimigo-21) && (yTiro+17 <= yInimigo+21)){
          if((xTiro >= xInimigo) && (xTiro <= xInimigo+44)){
            e.remove();
            score_div.add_score(50);
          }
        }
      });
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
      const random_speed = Math.floor(Math.random()*1.5);
      this.element.style.top = `${parseInt(this.element.style.top) + (global_speed + random_speed)}px`;
      if(parseInt(this.element.style.top) >= 800){
        this.element.remove();
      }
    }
  }

  class EnemyUfo { // 91 x 91 px
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemyUfo";
      this.element.src = "assets/enemyUFO.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      const random_speed = Math.floor(Math.random());
      this.element.style.top = `${parseInt(this.element.style.top) + (global_speed + random_speed)}px`;
      if(parseInt(this.element.style.top) >= 800){
        this.element.remove();
      }
    }
  }

  class MeteorBig { // 136 x 111 px
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "meteorBig";
      this.element.src = "assets/meteorBig.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      const random_speed = Math.floor(Math.random()*0.5);
      this.element.style.top = `${parseInt(this.element.style.top) + (global_speed + random_speed)}px`;
      if(parseInt(this.element.style.top) >= 800){
        this.element.remove();
      }
    }
  }

  class MeteorSmall { // 44 x 42 px
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "meteorSmall";
      this.element.src = "assets/meteorSmall.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
    }
    move() {
      const random_speed = Math.floor(Math.random()*2.5);
      this.element.style.top = `${parseInt(this.element.style.top) + (global_speed + random_speed)}px`;
      if(parseInt(this.element.style.top) >= 800){
        this.element.remove();
      }
    }
  }

  function pause_resume_game(){
    if(game_pause==false){
      window.clearInterval(interval);
      game_pause = true;
    }
    else if(game_pause==true){
      interval = window.setInterval(run, 1000 / FPS);
      game_pause = false;
    }
  }

  function end_game(){
    window.clearInterval(interval);
    fim = new Gameover();
  }

  function restart_game(){
    game_pause = false;
    global_speed = 2;
    score = 0;
    enemies = [];
    ovnis = [];
    bigMeteors = [];
    smallMeteors = [];
    shots = [];
    dmg = false;

    // naves inimigas
    let navesInimigas = document.getElementsByClassName("enemy-ship");
    // ovnis
    let ufos = document.getElementsByClassName("enemyUfo");
    // asteroide grande
    let asteroidesG = document.getElementsByClassName("meteorBig");
    // asteroide pequeno
    let asteroidesP = document.getElementsByClassName("meteorSmall");

    Array.from(navesInimigas).forEach((e) => {e.remove();});
    Array.from(ufos).forEach((e) => {e.remove();});
    Array.from(asteroidesG).forEach((e) => {e.remove();});
    Array.from(asteroidesP).forEach((e) => {e.remove();});

    init();
    start();
  }

  function speed(){
    global_speed += 1;
  }

  function run() {
    const random_enemy_ship = Math.random() * 100;
    const random_ovni = Math.random() * 100;
    const random_big_meteor = Math.random() * 100;
    const random_small_meteor = Math.random() * 100;

    if (random_enemy_ship <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    if (random_ovni <= PROB_OVNI) {
      ovnis.push(new EnemyUfo());
    }
    if (random_big_meteor <= PROB_BIG_METEOR) {
      bigMeteors.push(new MeteorBig());
    }
    if (random_small_meteor <= PROB_SMALL_METEOR) {
      smallMeteors.push(new MeteorSmall());
    }

    enemies.forEach((e) => e.move());
    ovnis.forEach((e) => e.move());
    bigMeteors.forEach((e) => e.move());
    smallMeteors.forEach((e) => e.move());
    shots.forEach((e) => {
      e.move();
      e.hit();
    });
    ship.move();
    if(dmg == false) ship.collision();

    if(lives.length==0){
      end_game();
    }
  }
  
  init();
})();
