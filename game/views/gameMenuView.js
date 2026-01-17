'use strict';

/**
 * @class GameMenuView
 */
class GameMenuView extends View{

  #selectedOptions;
  #options;
  #backgroundColor;

  /**
   * @constructor
   * @param windowManager
   */
  constructor(
    {
      playFieldBounds,
      scale,
      windowManager
    }){
    super({
      playFieldBounds,
      scale,
      windowManager
    });
    this.windowManager.subscribe(this.updateFromWindowManager);
    this.#backgroundColor = [210,238,245];

    this.#selectedOptions = {
      "1player": true,
      "2player": false,
      "easy": true,
      "modest": false,
      "hard": false,
      "insane": false
    }

    this.#initOptions();
  }

  /**
   * @function #initOptions
   */
  #initOptions(){
    this.#options = {
      player1: {
        label: "(1) PLAYER",
        posY:  canvasHeight- canvasHeight*0.6,
        selected: true
      },
      player2: {
        label: "(2) PLAYER",
        posY:  canvasHeight- canvasHeight*0.55,
        selected: false
      },
      easy: {
        label: "(E)ASY",
        posY:  canvasHeight- canvasHeight*0.45,
        selected: true
      },
      modest: {
        label: "(M)ODEST",
        posY:  canvasHeight- canvasHeight*0.40,
        selected: false
      },
      hard: {
        label: "(H)ARD",
        posY:  canvasHeight- canvasHeight*0.35,
        selected: false
      },
      insane: {
        label: "(A)RE YOU INSANE?",
        posY:  canvasHeight- canvasHeight*0.30,
        selected: false
      }
    }
  }

  /**
   * @function updateFromWindowManager
   */
  updateFromWindowManager = ()=>{
    this.#initOptions();
  };

  /**
   * @function draw
   */
  draw(){
    background(this.#backgroundColor[0], this.#backgroundColor[1], this.#backgroundColor[2]);
    textAlign(CENTER);
    noStroke();
    textSize(canvasHeight / 8);
    text("BALLS",canvasWidth/2, canvasHeight-canvasHeight*0.8);;
    textSize(canvasHeight / 22);

    for (const option in this.#options){
      this.#options[option].selected ? fill(100,200,100) : fill (100,100,100);
      text(this.#options[option].label,canvasWidth / 2, this.#options[option].posY);
    }

    textSize(canvasHeight / 16);
    fill(100, 100, 200);
    text("Press Space To Start", canvasWidth / 2, canvasHeight-canvasHeight*0.1);
  }
}