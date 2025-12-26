class PlayerFactory {

  #stageProperties;
  #windowManager;
  #numberOfTotalPlayers;
  #playerNumber;
  #playFieldFactory;
  #inputManager;


  constructor({
    stageProperties,
    windowManager,
    numberOfTotalPlayers,
    playFieldFactory,
    inputManager
              }){
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;
    this.#numberOfTotalPlayers = numberOfTotalPlayers;
    this.#playFieldFactory = playFieldFactory;
    this.#inputManager = inputManager;
    this.#playerNumber = 0;
  }

  setNumberOfTotalPlayers(numberOfTotalPlayers){
    this.#numberOfTotalPlayers = numberOfTotalPlayers;
  }

  createPlayer({
    controls,
    speedFactor
               }){
    this.#playerNumber++;
    return new Player({
      controls: controls,
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager,
      windowManager: this.#windowManager,
      playFieldFactory: this.#playFieldFactory,
      speedFactor: speedFactor
    })
  }

}