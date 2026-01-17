'use strict';

/**
 * @class View
 */
class View{

  #playFieldBounds;
  #windowManager;
  #scale;

  /**
   * @constructor
   * @param playFieldBounds
   * @param scale
   */
  constructor({
                playFieldBounds,
                windowManager,
                scale
  }){
    this.#playFieldBounds = playFieldBounds;
    this.#scale = scale;
    this.#windowManager = windowManager;
  }

  get playFieldBounds() {
    return this.#playFieldBounds;
  }

  get scale() {
    return this.#scale;
  }

  get windowManager() {
    return this.#windowManager;
  }

  /**
   * @function draw
   */
  draw(){}
}