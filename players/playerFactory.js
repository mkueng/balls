'use strict'
class PlayerFactory {

  #stageProperties;
  #windowManager;
  #numberOfTotalPlayers;
  #playerNumber;
  #playFieldFactory;
  #inputManager;
  #endZoneFactory;
  #scale;

  /**
   *
   * @param stageProperties
   * @param windowManager
   * @param numberOfTotalPlayers
   * @param playFieldFactory
   * @param endZoneFactory
   * @param inputManager
   * @param scale
   */
  constructor({
    stageProperties,
    windowManager,
    numberOfTotalPlayers,
    playFieldFactory,
    endZoneFactory,
    inputManager,
    scale
              }){
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;
    this.#numberOfTotalPlayers = numberOfTotalPlayers;
    this.#playFieldFactory = playFieldFactory;
    this.#endZoneFactory = endZoneFactory;
    this.#inputManager = inputManager;
    this.#playerNumber = 0;
    this.#scale = scale;
  }


  /**
   *
   * @param controls
   * @param speedFactor
   * @param id
   * @returns {Player}
   */
  createPlayer({
                 controls,
                 speedFactor,
                 scale
  }){
    this.#playerNumber++;
    return new Player({
      controls: controls,
      id: crypto.randomUUID(),
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager,
      windowManager: this.#windowManager,
      playFieldFactory: this.#playFieldFactory,
      endZoneFactory: this.#endZoneFactory,
      scale: this.#scale
    })
  }

}