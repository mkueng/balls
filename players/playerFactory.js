'use strict'

/**
 * @class PlayerFactory
 */
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
   * @function createPlayField
   * @returns {*|PlayField}
   */
  createPlayField(){
    const playField = this.#playFieldFactory.createPlayField({});
    playField.init();
    return playField;
  }

  /**
   * @function createBat
   * @param controls
   * @param playFieldBounds
   * @param speed
   * @returns {Bat}
   */
  createBat(controls, playFieldBounds, speed){
    const bat = new Bat({
      playFieldBounds: playFieldBounds,
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager,
      controls: controls,
      scale: this.#scale,
      speed: speed,
      width: playFieldBounds.width / 4,
      height: playFieldBounds.height / 70,
    })
    return bat;
  }

  /**
   * @function createEndZone
   * @param fieldNumber
   * @param playFieldBounds
   * @returns {*|EndZone}
   */
  createEndZone(fieldNumber, playFieldBounds){
    const endZone = this.#endZoneFactory.createEndZone({
      fieldNumber: fieldNumber,
      playFieldBounds: playFieldBounds
    });
    endZone.init();
    return endZone;
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
                 scale,
                 name
  }){
    this.#playerNumber++;

    const playField = this.createPlayField();
    const playFieldBounds =  playField.setBoundaries();
    const endZone = this.createEndZone(playField.fieldNumber, playFieldBounds);
    const bat = this.createBat(controls, playFieldBounds, 8);

    return new Player({
      id: crypto.randomUUID(),
      name: name,
      stageProperties: this.#stageProperties,
      windowManager: this.#windowManager,
      playField: playField,
      bat: bat,
      endZone: endZone,
      scale: scale
    })
  }
}