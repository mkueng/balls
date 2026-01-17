class FactoryRegistry {
  #stageProperties;
  #windowManager;
  #inputManager;

  constructor({ stageProperties, windowManager, inputManager}) {
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;
    this.#inputManager = inputManager;
  }

  createFactories({ numberOfTotalPlayFields, scale }) {

    const playFieldFactory = new PlayFieldFactory({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      numberOfTotalPlayFields
    });

    const endZoneFactory = new EndZoneFactory({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      numberOfTotalPlayFields
    });

    const playerFactory = new PlayerFactory({
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      playFieldFactory,
      endZoneFactory,
      inputManager: this.#inputManager,
      scale
    });

    return { playFieldFactory, endZoneFactory,playerFactory};
  }


}