class PlayFieldFactory {

  #stageProperties;
  #windowManager;
  #playerId;
  #fieldNumber;
  #numberOfTotalPlayFields;

  constructor({
    stageProperties,
    windowManager,
    numberOfTotalPlayFields
              }){
      this.#stageProperties = stageProperties;
      this.#windowManager = windowManager;
      this.#numberOfTotalPlayFields = numberOfTotalPlayFields;
      this.#fieldNumber = 0;
}


createPlayField({}){
    this.#fieldNumber++;
    return new PlayField({
      stageProperties:this.#stageProperties,
      windowManager:this.#windowManager,
      fieldNumber:this.#fieldNumber,
      numberOfTotalPlayFields: this.#numberOfTotalPlayFields
    })
  }
}