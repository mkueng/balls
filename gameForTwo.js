class GameForTwo {
  
  #batt1;
  #batt2;
  #score1;
  #score2;
  #playField1;
  #playField2;
  #endZone1;
  #endZone2;
  
  #timer;
  #score;
  #stageProperties;
  #inputManager; 
  #ballManager;
  #endZone;
  #setupScreen;
  #matchState;
  #gameOverScreen;
  
  constructor({
    stageProperties,
    timer,
    score,
    inputManager
  }){
    this.#stageProperties = stageProperties;  
    this.#timer = timer;
    this.#score = score;
    this.#inputManager = inputManager;
    
    this.#playField1 = new PlayField({
      stageProperties: this.#stageProperties
    })
    
    this.#playField2 = new PlayField({
      stageProperties: this.#stageProperties
    })
    this.#playField1.init();
    this.#playField2.init();
    
    this.#endZone1 = new EndZone({
      stageProperties: this.#stageProperties
    })
    
    this.#endZone2 = new EndZone({
      stageProperties: this.#stageProperties
    })
    
    this.#batt1 = new Batt({ 
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager
    });
    
    this.#batt2 = new Batt({ 
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager
    });
    
     this.#ballManager = new BallManager({
      stageProperties: this.#stageProperties,
      batt: this.#batt,
      game: this
    })
    
    this.#gameOverScreen = new GameOverScreen();
    
    this.#setupScreen = new SetupScreen();
    
    this.#batt1.init();
    this.#batt2.init();
    this.#matchState = "menu";
    this.#inputManager.subscribe(this);
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
  
  applyEffect(effect){
    switch (effect.target) {
      case "BATT": {this.#batt.applyEffect(effect); break}
    }
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
    this.#ballManager.startCreatingBalls();
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
    this.#playField.draw();
    this.#setupScreen.draw();
    this.#score.draw();
    //this.#timer.draw();
  }
  
  #drawPaused(){
    
  }
  
  #drawRunning(){
    this.#playField.draw();
    
    this.#ballManager.updateBalls();
    this.#ballManager.drawBalls();
    this.#batt.update();
    this.#batt.draw();
    this.#endZone.draw();
    this.#timer.draw();
    this.#score.draw();
    
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
