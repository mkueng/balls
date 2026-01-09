class EndZone {

  #stageProperties;
  #backgroundColor;
  #width;
  #height;
  #mode;
  #windowManager;
  #numberOfTotalPlayFields;
  #fieldNumber;
  #strokeWeight;
  #bounds;
  #scale;
  #playFieldBounds;

  /**
   *
   * @param stageProperties
   * @param windowManager
   * @param mode
   * @param numberOfTotalPlayFields
   * @param fieldNumber
   * @param strokeWeight
   */
  constructor({
                stageProperties,
                windowManager,
                numberOfTotalPlayFields,
                fieldNumber,
    playFieldBounds

  }){
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;
    this.#numberOfTotalPlayFields = numberOfTotalPlayFields;
    this.#fieldNumber = fieldNumber;
    this.#strokeWeight = 4;
    this.#playFieldBounds = playFieldBounds;
  }

  set scale (scale) {
    this.#scale = scale;
  }

  init() {
    this.setBounds({playFieldBounds: this.#playFieldBounds});
  }

  /**
   *
   * @returns {{width: number, height: number, startX: number, startY: number, endX: number, endY: number}}
   */
  setBounds({playFieldBounds}) {
    this.#playFieldBounds = playFieldBounds;
    this.#bounds = {
      width: this.#playFieldBounds.width,
      height: this.#playFieldBounds.height * 1.5 + this.#strokeWeight,
      startX: this.#playFieldBounds.startX,
      startY: this.#playFieldBounds.height - (this.#playFieldBounds.height * 0.065 ) + this.#strokeWeight,
      endX: this.#playFieldBounds.endX,
      endY: this.#playFieldBounds.endY,
      strokeWeight: this.#strokeWeight
    };
    return this.#bounds;
  }

  /**
   *
   */
  draw(){
    const {
      startX,
      startY,
      width,
      height
    } = this.#bounds;


    fill(100, 100, 200);
    rect(startX, startY, width, height);
  }
}
