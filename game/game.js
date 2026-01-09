'use strict'
class Game {

  #timer;
  #score;
  #playField;
  #numberOfTotalPlayFields;
  #stageProperties;
  #inputManager;
  #windowManager;
  #ballManager;
  #setupScreen;
  #matchState;
  #gameOverScreen;
  #players =[];
  #playFieldFactory;
  #endZoneFactory;
  #playerFactory;
  #scale;
  #ballController;

  constructor({
    stageProperties,
    timer,
    score,
    inputManager,
    windowManager
  }){
    this.#stageProperties = stageProperties;  
    this.#timer = timer;
    this.#score = score;
    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
    this.#scale = canvasWidth / 1000;
    this.#numberOfTotalPlayFields = 2;

    this.#playFieldFactory = new PlayFieldFactory({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      numberOfTotalPlayFields: this.#numberOfTotalPlayFields
    })

    this.#endZoneFactory = new EndZoneFactory({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      numberOfTotalPlayFields :this.#numberOfTotalPlayFields
    })

    this.#playerFactory = new PlayerFactory({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      playFieldFactory: this.#playFieldFactory,
      endZoneFactory: this.#endZoneFactory,
      inputManager: this.#inputManager
    })


    this.#players[0] = this.#playerFactory.createPlayer({
      scale: this.#scale,
      controls: {
        left: 37,
        right: 39
      }
    });

    this.#players[1] = this.#playerFactory.createPlayer({
      controls: {
        left: 65,
        right: 68
      }
    });

    this.#players.forEach(player => {
      player.init();
    })

    this.#ballController = new BallController({
      stageProperties: this.#stageProperties,
      players: this.#players,
      gameMode: "duo",
      game: this,
      scale: this.#scale
    })

    this.#ballController.init();

    this.#gameOverScreen = new GameOverScreen();
    
    this.#setupScreen = new SetupScreen({
      windowManager: this.#windowManager
    });
    
    this.#matchState = "menu";

    this.#inputManager.subscribe(this);
    this.#windowManager.subscribe(this.#updateFromWindowManager);

  }

  init(){
    console.log("game init");
  }

  #updateFromWindowManager = ()=> {
    this.#scale = canvasWidth / 1000;
    this.#ballController.scale = this.#scale;
  }

  #drawRunning(){
    background(100);
    this.#players.forEach(player=>{
      player.playField.draw();
      player.ballManager.updateBalls();
      player.ballManager.drawBalls();
      player.update();
      player.draw();
      player.endZone.draw();
    })

    /*
     this.#ballManager.updateBalls();
     this.#ballManager.drawBalls();
     this.#bat.update();
     this.#bat.draw();
     this.#endZone.draw();
     this.#timer.draw();
     this.#score.draw();

     */
  }
  
  keyPressedEvent(keyCode) {
    if (key === ' ') {
      switch (this.#matchState) {
        case "menu" : {this.startMatch(); break;}
        case "running" : {this.pauseMatch(); break;}
        case "paused" : {this.resumeMatch(); break;} 
        case "gameOver": {this.resumeGame(); break;}
      }
    }
  }
  
  setupMatch(){
    /*
    this.#playField.draw();
    this.#score.draw();
    this.#timer.draw();
    this.#setupScreen.draw();
    */
  }
  
  applyEffect({
                playerId,
                effect}){
    /*
    switch (effect.target) {
      case "BATT": {this.#bat.applyEffect(effect); break}
    }*/
  }
  
  updateScore(points){
    this.#score.updateScore(points);
  }
  
  resumeGame(){
    this.#matchState = "menu";
  }
  
  startMatch(){
    console.log("startMatch");
    this.#timer.start();
    this.#ballController.start();
    this.#matchState = "running";
  }
  

  pauseMatch(){
    console.log("pause match");
    this.#matchState = "paused"
  }
  
  resumeMatch(){
    console.log("match resumed");
    this.#matchState = "running";
  }
  
  endMatch(){
    console.log("match ended");
    this.#matchState = "gameOver";
    this.#ballManager.stopCreatingBalls();
  }    
  
  update(){
  }
  
  #drawGameOver(){
    this.#playField.draw();
    this.#timer.draw();
    this.#score.draw();
    this.#gameOverScreen.draw();
  }
  
  #drawMenu(){
    //this.#playField.draw();
    this.#setupScreen.draw();

  }
  
  #drawPaused(){
    
  }



  #drawStates = {
    running: () => this.#drawRunning(),
    paused: () => this.#drawPaused(),
    menu: () => this.#drawMenu(),
    gameOver: () => this.#drawGameOver()
  };
   
  draw(){
    this.#drawStates[this.#matchState]?.();
  }
}
