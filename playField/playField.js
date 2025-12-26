'use strict'
class PlayField {
  #stageProperties = null;
  #mode = null;
  #windowManager = null;
  #numberOfTotalPlayFields = 0;
  #fieldNumber = 0;
  #strokeWeight = 0;
  #backgroundColor = [];

  #bounds = {
    width: 0,
    height: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };

  constructor({
                stageProperties,
                windowManager,
                mode = null,
                numberOfTotalPlayFields = 1,
                fieldNumber = 1,
                strokeWeight = 4,
              }) {
    this.#stageProperties = stageProperties;
    this.#mode = mode;
    this.#windowManager = windowManager;
    this.#numberOfTotalPlayFields = numberOfTotalPlayFields;
    this.#fieldNumber = fieldNumber;
    this.#strokeWeight = strokeWeight;
    this.#backgroundColor = this.#stageProperties.backgroundColor;
  }

  get bounds (){
    return this.#bounds;
  }

  init() {
    this.setBoundaries();
  }

  setBoundaries() {
    const halfCanvas = Math.floor(canvasWidth / 2);
    const offset =
      (this.#fieldNumber - this.#numberOfTotalPlayFields / 2)
      * halfCanvas
      + this.#strokeWeight / 2;

    this.#bounds = {
      width: halfCanvas - this.#strokeWeight,
      height: canvasHeight - this.#strokeWeight,
      startX: offset,
      startY: this.#strokeWeight,
      endX: offset+halfCanvas - this.#strokeWeight,
      endY: canvasHeight - this.#strokeWeight,
      strokeWeight: this.#strokeWeight
    };
    return this.#bounds;
  }


  draw() {
    const {
      startX,
      startY,
      width,
      height
    } = this.#bounds;
    fill(200,200,200);
    rect(startX, startY, width, height);
    noFill();
    stroke(255, 100*this.#fieldNumber, 0);
    strokeWeight(this.#strokeWeight);
    rect(startX, startY, width, height);
  }
}
