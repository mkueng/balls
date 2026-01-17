'use strict'
class Game {

  #timer;
  #numberOfTotalPlayFields;
  #numberOfTotalPlayers;
  #stageProperties;
  #inputManager;
  #windowManager;
  #gameState;
  #players = {};
  #playFieldFactory;
  #endZoneFactory;
  #playerFactory;
  #scale;
  #ballController;
  #gameRunningView;
  #gameOverView;
  #gameMenuView;
  #gamePausedView;
  #controls;
  #assetManager;
  #background;
  #intervalId;
  #factoryRegistry;
  #factories = {};

  /**
   * @constructor
   * @param stageProperties
   * @param timer
   * @param score
   * @param inputManager
   * @param windowManager
   */
  constructor({
    stageProperties,
    inputManager,
    windowManager,
    assetManager,
    controls,
    factoryRegistry
  }){
    this.#stageProperties = stageProperties;
    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
    this.#assetManager = assetManager;
    this.#scale = canvasWidth / 1000;
    this.#numberOfTotalPlayFields = 2;
    this.#numberOfTotalPlayers = 2;
    this.#players = {};
    this.#timer = 120;
    this.#intervalId = null;
    this.#controls = controls;
    this.#factoryRegistry = factoryRegistry;
    this.#factories = this.#factoryRegistry.createFactories({
      numberOfTotalPlayFields: this.#numberOfTotalPlayFields,
      scale: this.#scale
    });

    for (let i = 0; i < this.#numberOfTotalPlayers; i++) {
      const controls = this.#controls.getControlsForPlayer(i+1);
      const player = this.#factories.playerFactory.createPlayer({controls, scale: this.#scale});
      player.init();
      this.#players[player.id] = player;
    }

    this.#ballController = new BallController({
      stageProperties: this.#stageProperties,
      players: this.#players,
      gameMode: "duo",
      game: this,
      scale: this.#scale
    })

    this.#ballController.init();

    this.#background = new Background({
      image: this.#assetManager.getImage("clouds"),
      posX: 0,
      posY: 0,
      scale: this.#scale
    })


    this.#gameMenuView = new GameMenuView({
      windowManager: this.#windowManager,
      scale: this.#scale
    });

    this.#gameOverView = new GameOverView({
      windowManager: this.#windowManager,
      scale: this.#scale
    });

    this.#gameRunningView = new GameRunningView({
      windowManager: this.#windowManager,
      players: this.#players,
      background: this.#background,
    });

    this.#gamePausedView = new GamePausedView({
      windowManager: this.#windowManager
    })

    this.#gameState = "menu";
    this.#inputManager.subscribe(this);
    this.#windowManager.subscribe(this.#updateFromWindowManager);


  }

  /**
   * @function init
   */
  init(){
    console.log("game init");
  }

  /**
   * @function #updateFromWindowManager
   */
  #updateFromWindowManager = ()=> {
    this.#scale = canvasWidth / 1000;
    this.#ballController.scale = this.#scale;
    for (const id in this.#players) {
      const player = this.#players[id];
      player.scale = this.#scale;
    }
  }

  /**
   *
   * @param keyCode
   */
  keyPressedEvent(keyCode) {
    if (key === ' ') {
      switch (this.#gameState) {
        case "menu" : {this.startMatch(); break;}
        case "running" : {this.pauseMatch(); break;}
        case "paused" : {this.resumeMatch(); break;}
        case "gameOver": {this.resumeGame(); break;}
      }
    }
  }

  /**
   *
   * @param playerId
   * @param effect
   */
  applyEffect({
                playerId,
                effect
  }){
    const player = this.#players[playerId];

    switch (effect.target) {
      case "BAT": {
        player.bat.applyEffect(effect);
        break;
      }

      case "PLAYER": {
        player.applyEffect(effect);
        break
      }
    }
  }

  /**
   *
   * @param playerId
   * @param points
   */
  updateScore({playerId, points}){
    this.#players[playerId].score += points;
    this.#players[playerId].scoreView.currentScore=this.#players[playerId].score;
  }

  /**
   * @function resumeGame
   */
  resumeGame(){
    this.#gameState = "menu";
  }

  /**
   * @function startMatch
   */
  startMatch(){
    console.log("startMatch");

    for (const player in this.#players) {
      this.#players[player].score = 0;
      this.#players[player].timer = this.#timer;
    }

    this.#intervalId = setInterval(() => {
      if (this.#timer > 0){
        this.#timer--
        for (const player in this.#players) {
          this.#players[player].timer = this.#timer;
        }
      } else {
        clearInterval(this.#intervalId);
        this.endMatch();
      }

    }, 1000)

    this.#ballController.start();
    this.#gameState = "running";
  }

  /**
   * @function pauseMatch
   */
  pauseMatch(){
    console.log("pause match");
    this.#gameState = "paused"
  }

  /**
   * @function resumeMatch
   */
  resumeMatch(){
    console.log("match resumed");
    this.#gameState = "running";
  }

  /**
   * @function endMatch
   */
  endMatch(){
    console.log("match ended");
    this.#gameState = "gameOver";
  }

  /**
   * @function #running
   */
  #gameRunning(){
    this.#gameRunningView.draw();
  }


  /**
   * @function #gameOver
   */
  #gameOver(){
    this.#gameOverView.draw();
  }

  /**
   * @function #gameMenu
   */
  #gameMenu(){
    this.#gameMenuView.draw();
  }

  /**
   * @function #gamePaused
   */
  #gamePaused(){
    this.#gamePausedView.draw();
  }

  /**
   *
   * @type {{running: function(): void, paused: function(): void, menu: function(): void, gameOver: function(): void}}
   */
  #gameStates = {
    running: () => this.#gameRunning(),
    paused: () => this.#gamePaused(),
    menu: () => this.#gameMenu(),
    gameOver: () => this.#gameOver()
  };

  /**
   * @function draw
   */
  draw(){
    this.#gameStates[this.#gameState]?.();
  }
}
