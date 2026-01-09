class BallController {
  
  #stageProperties;
  #gameMode;
  #players;
  #game;
  #intervalId;
  #ballFactory;
  #scale;

  /**
   *
   * @param stageProperties
   * @param gameMode
   * @param players
   * @param game
   * @param scale
   */
  constructor({
    stageProperties,
    gameMode,
    players,
    game,
    scale
  }){
    this.#stageProperties = stageProperties;
    this.#gameMode = gameMode;
    this.#game = game;
    this.#players = players;
    this.#scale = scale;
  };

  set scale(scale) {
    this.#scale = scale;
    this.#players.forEach(player => {
      player.ballManager.scale = scale;
    })
  }

  /**
   *
   */
  init(){
    this.#ballFactory = new BallFactory({
      stageProperties: this.#stageProperties
    });

    this.#players.forEach(player => {
      player.ballManager = new BallManager({
        stageProperties: this.#stageProperties,
        ballFactory: this.#ballFactory,
        bat: player.bat,
        playField: player.playField,
        playerId: player.playerId,
        scale: this.#scale,
        onEffect: (e) => this.handleEffect(e),
        onScore:(e) => this.handleScoreUpdate(e)
      })
    })
  }

  /**
   *
   * @param playerId
   * @param effect
   */
  handleEffect({playerId, effect}){
    // Apply effect to player
    this.#game.applyEffect({
      playerId:playerId,
      effect: effect
    });
  }

  /**
   *
   * @param playerId
   * @param points
   */
  handleScoreUpdate({playerId, points}){
    // @TODO: Update score in game score manager
    /*
    this.#game.score.updateScore({
      playerId: playerId,
      points: points
    })
*/
  }

  /**
   *
   */
  createBalls(){
    const randomBallTypeNumber = Math.floor(random(1,100));
    const ballWeight = Math.floor(random(25,60));
    //const ballWeight =  30;
    const relativePosXPercentage = Math.floor(random(10,90));
    //const relativePosXPercentage = 50;
    this.#players.forEach(player => {
      player.ballManager.createBall({
        randomBallTypeNumber: randomBallTypeNumber,
        ballWeight: ballWeight,
        relativePosXPercentage: relativePosXPercentage,
        scale: this.#scale

      })
    })
  }

  /**
   *
   */
  start(){
    this.#intervalId = setInterval(()=> {
      this.createBalls();
    }, random(2000,4000))
  }

  stop(){
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }
  pause(){
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }


}
