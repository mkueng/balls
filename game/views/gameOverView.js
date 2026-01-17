'use strict'

/**
 * @class GameOverView
 */
class GameOverView extends View{

  /**
   * @constructor
   * @param windowManager
   */
  constructor({
                playFieldBounds,
                scale,
                windowManager
              }){
    super({
      playFieldBounds,
      scale,
      windowManager
    });
  }

  /**
   * @function draw
   */
  draw(){
    push();
    textAlign(CENTER);
    noStroke();
    textSize(50);
    fill(100, 100, 200);
    text("Game Over", width / 2, height-height*0.8);
    text("Press Space", width / 2, height-height*0.1);
    pop();
  }

}