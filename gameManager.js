class GameManager {
  
  #stageManager;
  #game;
  #stageProperties;
  #stageNumber;
  #timer;
  #score;
  #inputManager;
  #windowManager;
  #ballManager;

  
  constructor({
    inputManager,
    windowManager
  }){

    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
  }
  
  timerUpdate(time){
    if (time === 0) {
      this.endGame();
    }
  }

  init(){
    this.#stageNumber = 1;
    this.#stageManager = new StageManager();
    this.#stageProperties =  this.#stageManager.getStageProperties({stage:"stage"+this.#stageNumber});
    this.#timer = new Timer({stageProperties: this.#stageProperties});
    this.#score = new Score({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager
    });
    this.#timer.subscribe(this);
  }

  setupGame(){


    this.#game = new Game({
      windowManager: this.#windowManager,
      inputManager: this.#inputManager,
      stageProperties: this.#stageProperties,
      timer: this.#timer,
      score: this.#score
    })
  }
  
  getGame(){
    return this.#game;
  }
  
  setupMatch(){
    this.#game.setupMatch();
  }
  
  pauseGame(){};
  endGame(){
    this.#game.endMatch();
  };
}
