class Score {

  #stageProperties;
  #currentScore;
  #highScore;
  #windowManager;
  
  constructor({
    stageProperties,
    windowManager
  }){
    this.#stageProperties = stageProperties;
    this.#currentScore = 0;
    this.#highScore = 0;
    this.#windowManager = windowManager;
  }

  init(){
    this.#windowManager.subscribe(this);
  }
  
  updateFromWindowManager(){

  }


  updateScore(points){
    this.#currentScore+=points;
  }
  readScores(){
  }
  
  saveScores(){
  }
  
  draw(){
    fill(100);
    textAlign(LEFT);
    textSize(40); // scale text relative to ball size
    text("SCORE: "+this.#currentScore, 15, 50);
    textSize(20);
    text("HIGH: "+this.#highScore, 15, 75);
  }
}
