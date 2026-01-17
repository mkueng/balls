'use strict';

/**
 * @class GameRunningView
 */
class GameRunningView extends View{

  #players;
  #background;

  /**
   * @constructor
   * @param windowManager
   */
  constructor({
                windowManager,
                playFieldBounds,
                scale,
                players,
                background
              }){
    super({
      playFieldBounds,
      windowManager,
      scale
    })

    this.#players = players;
    this.#background = background;
  }

  /**
   * @function draw
   */
  draw(){
    background(100);
    this.#background.draw();
    for (const id in this.#players) {
      const player = this.#players[id];
      //player.playField.draw();
      //player.ballManager.updateBalls();
      //player.ballManager.drawBalls();
      player.update();
      player.draw();
      //player.endZone.draw();
      //player.scoreView.draw();
    }
  }

}