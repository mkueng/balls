class BallController {
  
  #stageProperties;
  #gameMode;
  #players;
  #game;
  #intervalId;
  #ballFactory

  constructor({
    stageProperties,
    gameMode,
    players,
    game
  }){
    this.#stageProperties = stageProperties;
    this.#gameMode = gameMode;
    this.#game = game;
    this.#players = players;

  };


  init(){
    this.#ballFactory = new BallFactory({
      stageProperties: this.#stageProperties
    });

    this.#ballFactory.init();

    this.#players.forEach(player => {
      console.log("player", player);
      player.ballManager = new BallManager({
        stageProperties: this.#stageProperties,
        ballFactory: this.#ballFactory,
        bat: player.bat,
        playField: player.playField,
        playerId: player.playerId,
        onEffect: (e) => this.handleEffect(e),
        onScore:(e) => this.handleScoreUpdate(e)
      })
    })
  }

  handleEffect({playerId, effect}){
    // Apply effect to player
    this.#game.applyEffect({
      playerId:playerId,
      effect: effect
    });
  }

  handleScoreUpdate({playerId, points}){
    // @TODO: Update score in game score manager
    /*
    this.#game.score.updateScore({
      playerId: playerId,
      points: points
    })
*/
  }

  createBalls(){
    const randomBallTypeNumber = Math.floor(random(1,100));
    console.log(randomBallTypeNumber);
    this.#players.forEach(player => {
      player.ballManager.createBall({
        randomBallTypeNumber: randomBallTypeNumber
      })
    })
  }

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
