'use strict';
class GamePausedView{

  #windowManager;

  /**
   * @constructor
   * @param windowManager
   */
  constructor({
                windowManager
  }){
    this.#windowManager = windowManager;
  }

  /**
   * @function draw
   */
  draw(){
    push();
    pop();
  }
}