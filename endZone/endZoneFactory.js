class EndZoneFactory{
  #stageProperties;
  #windowManager;
  #numberOfTotalPlayFields;

  constructor({
    stageProperties,
    windowManager,
    numberOfTotalPlayFields
              }) {
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;
    this.#numberOfTotalPlayFields = numberOfTotalPlayFields;
  }

  createEndZone({fieldNumber, playFieldBounds}) {
    return new EndZone({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      fieldNumber: 1,
      numberOfTotalPlayFields: 2,
      playFieldBounds: playFieldBounds
    })
  }

}