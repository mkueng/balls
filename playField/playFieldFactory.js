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
      this.#numberOfTotalPlayFields = 0;
      this.#fieldNumber = 0;
}

setNumberOfTotalPlayFields({numberOfTotalPlayFields}) {
    this.#numberOfTotalPlayFields = numberOfTotalPlayFields;
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