class PlayerFactory {

  #stageProperties;
  #windowManager;
  #numberOfTotalPlayers;
  #playerNumber;
  #playFieldFactory;
  #inputManager;
  #endZoneFactory;


  constructor({
    stageProperties,
    windowManager,
    numberOfTotalPlayers,
    playFieldFactory,
    endZoneFactory,
    inputManager
              }){
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;
    this.#numberOfTotalPlayers = numberOfTotalPlayers;
    this.#playFieldFactory = playFieldFactory;
    this.#endZoneFactory = endZoneFactory;
    this.#inputManager = inputManager;
    this.#playerNumber = 0;
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
      endZoneFactory: this.#endZoneFactory,
      speedFactor: speedFactor
    })
  }

}