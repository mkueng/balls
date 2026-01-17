'use strict';

/**
 * @class TimerView
 */
class TimerView extends View{

  #getTimer;

  /**
   * @constructor
   * @param playFieldBounds
   * @param scale
   * @param windowManager
   * @param getTimer
   */
  constructor({
    playFieldBounds,
    scale,
    windowManager,
    getTimer
              }) {
    super({
      playFieldBounds,
      scale,
      windowManager,
    });

    console.log("bounds:", playFieldBounds);
    this.#getTimer = getTimer;
  }

  /**
   * @function draw
   */
  draw(){
    push();
    const textSizePx = this.scale * 40;
    textSize(textSizePx);
    fill(64, 64, 64);
    textAlign(LEFT);
    text("TIME: "+this.#getTimer(), this.playFieldBounds.startX+(300*this.scale), this.playFieldBounds.startY+(50*this.scale));
    pop();
  }

}