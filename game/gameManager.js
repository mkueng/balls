class GameManager {
  
  #stageManager;
  #game;
  #stageProperties;
  #stageNumber;
  #inputManager;
  #windowManager;
  #assetManager;
  #controls;
  #factoryRegistry;
  #viewRegistry;

  constructor({
    assetManager,
    inputManager,
    windowManager
  }){
    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
    this.#assetManager = assetManager;
  }

  /**
   *
   */
  init(){
    this.#stageNumber = 1;
    this.#stageManager = new StageManager();
    this.#controls = new Controls();
    this.#factoryRegistry = new FactoryRegistry({
      stageProperties: this.#stageManager.getStageProperties({stage:"stage"+this.#stageNumber}),
      windowManager: this.#windowManager,
      inputManager: this.#inputManager
    });
    this.#viewRegistry = new ViewRegistry({
      windowManager: this.#windowManager
    })

    this.#stageProperties =  this.#stageManager.getStageProperties({stage:"stage"+this.#stageNumber});
  }

  /**
   *
   * @returns {*}
   */
  initGame(){

    this.#game = new Game({
      assetManager: this.#assetManager,
      windowManager: this.#windowManager,
      inputManager: this.#inputManager,
      stageProperties: this.#stageProperties,
      controls: this.#controls,
      factoryRegistry: this.#factoryRegistry,
      viewRegistry: this.#viewRegistry
    })

    return this.#game;
  }

  /**
   * @function getGame
   * @returns {*}
   */
  getGame(){
    return this.#game;
  }

}
