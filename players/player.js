'use strict';

/**
 * @class Player
 */
class Player {

  #id;
  #name;
  #avatar;
  #currentScore;
  #stageProperties;
  #playField;
  #bat;
  #windowManager;
  #ballManager;
  #subscribers;
  #endZone;
  #scale;
  #score;
  #personalHighScore;
  #scoreView;
  #timerView;
  #timer;

  /**
   * @constructor
   * @param stageProperties
   * @param inputManager
   * @param name
   * @param id
   * @param personalHighScore
   * @param avatar
   * @param playerNumber
   * @param windowManager
   * @param playFieldFactory
   * @param endZoneFactory
   * @param controls
   * @param scale
   * @param scoreView
   */
  constructor({
                id,
                name,
                stageProperties,
                personalHighScore,
                avatar,
                windowManager,
                playField,
                bat,
                endZone,
                scale,
  }){
    this.#stageProperties = stageProperties;
    this.#windowManager = windowManager;

    this.#name = name ?? "player";
    this.#id = id;
    this.#personalHighScore = personalHighScore ?? "0";
    this.#avatar = avatar ?? null;
    this.#currentScore = 0;
    this.#playField = playField;
    this.#bat = bat;
    this.#endZone = endZone;
    this.#subscribers = [];
    this.#scale = scale;
    this.#personalHighScore = personalHighScore ?? "0";
    this.#score = 0;
    this.#timer = null;
  }

  set ballManager(ballManager){
    this.#ballManager = ballManager;
  }
  get score(){
    return this.#score;
  }
  get scoreView(){
    return this.#scoreView;
  }
  get name(){
    return this.#name;
  }
  get id(){
    return this.#id;
  }
  get ballManager(){
    return this.#ballManager;
  }
  get bat(){
    return this.#bat;
  }
  get playField(){
    return this.#playField;
  }
  get name() {
    return this.#name;
  }
  get currentScore() {
    return this.#currentScore;
  }
  set score(score){
    this.#score = score;
  }
  set timer(timer){
    this.#timer = timer;
  }

  get timer(){
    return this.#timer;
  }

  /**
   * @function subscribe
   * @param callback
   */
  subscribe({callback}){
    this.#subscribers.push(callback);
  }

  /**
   * @function #updateFromWindowManager
   */
  #updateFromWindowManager = ()=>{
    this.#scale = canvasWidth / 1000;
    const playFieldBounds =  this.#playField.setBoundaries();
    this.#bat.setBounds({playFieldBounds});
    this.#bat.scale = this.#scale;
    this.#endZone.setBounds({playFieldBounds});
  }

  /**
   * @function init
   */
  init() {

    this.#windowManager.subscribe(this.#updateFromWindowManager);

    this.#timerView = new TimerView({
      playFieldBounds: this.#playField.bounds,
      scale: this.#scale,
      getTimer: () => this.#timer
    })

    this.#scoreView = new ScoreView({
      playFieldBounds: this.#playField.bounds,
      scale: this.#scale
    })
  }

  /**
   * @function update
   */
  update(){
    this.#bat.update();
    this.#ballManager.updateBalls();
  }

  /**
   * @function draw
   */
  draw(){
    this.#playField.draw();
    this.#ballManager.drawBalls();
    this.#bat.draw();
    this.#endZone.draw();
    this.#scoreView.draw();
    this.#timerView.draw();
  }
}
