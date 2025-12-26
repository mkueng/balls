class BallManager {

  #stageProperties;
  #ballFactory;
  #balls;
  #playFieldWidth;
  #playFieldHeight;
  #bat;
  #onScore;
  #onEffect;
  #playerId;
  
  constructor({
    stageProperties,
    ballFactory,
    bat,
    onScore,
    onEffect,
    playerId
  }){

    this.#bat = bat;
    this.#onScore = onScore;
    this.#playerId = playerId;
    this.#onEffect = onEffect;
    this.#stageProperties = stageProperties;
    this.#playFieldWidth = stageProperties.playFieldWidth;
    this.#playFieldHeight = stageProperties.playFieldHeight;
    this.#ballFactory = ballFactory;
    this.#balls = [];
  }

  init(){

  }




  /**
   * @param randomBallTypeNumber
   */
  createBall({
    randomBallTypeNumber
             }){

    const ballType = this.#ballFactory.ballTypeMap[""+randomBallTypeNumber];
    this.#balls.push(this.#ballFactory.createBall(ballType));
  }


  updateBalls() {
    const playFieldWidth  = this.#playFieldWidth;
    const playFieldHeight = this.#playFieldHeight;

    for (let i = this.#balls.length - 1; i >= 0; i--) {
      const ball = this.#balls[i];
      ball.update();
  
      // Remove fully "dead" balls
      if (!ball.isActive) {
        if (ball.weight <= 0) {
          this.#balls.splice(i, 1);
        }
        continue; // skip rest of logic for inactive balls
      }
  
      const radius = ball.weight / 2;
  
      // Only check batt collision when near the bottom
      const batZoneY = playFieldHeight - 50; // maybe make this a constant
  
      if (ball.posY > batZoneY - radius) {
        const hitArea = this.checkBallBatCollision(ball);
  
        if (hitArea !== false && ball.velY > 3) {
          ball.direction = false;
          this.#onScore({
            playerId:this.#playerId,
            points:ball.getScorePoints()
          });
          let effect = ball.hit();
          if (effect) this.#onEffect({
            playerId:this.#playerId,
            effect:effect
          });
  
          const hitAreaRounded = Math.floor(hitArea);
          const offset = hitAreaRounded - (battWidth / 2 +1);
  
          // combine your two lines:
          ball.velX = (ball.velX + offset) / 18;
          ball.velY -= 1;
        } else {
          ball.isActive = false;
        }
      }

      // Bounce off left / right walls
      if (ball.posX <= radius || ball.posX >= playFieldWidth - radius) {
        ball.velX *= -1;
      }
    }
  }

  
  checkBallBatCollision(ball){
    const ballPosX = ball.posX;
    const ballPosY = ball.posY;
    const ballRadius = ball.radius;
    
    const batLeft = this.#bat.posX;
    const batRight = this.#bat.posX + this.#bat.width;
    const batTop = this.#bat.posY;
    const batBottom = this.#bat.posY +this.#bat.height;
    
    const hitsHorizontally = ballPosX + ballRadius >= batLeft && ballPosX - ballRadius <= batRight;
    const hitsVertically   = ballPosY + ballRadius >= batTop && ballPosY - ballRadius <= batBottom;
    
    if (hitsHorizontally && hitsVertically) {
      return ballPosX - batLeft
    } else return false;
    
  }
  
  drawBalls(){
   this.#balls.forEach((ball) =>{
      ball.draw();
    }) 
  }
}
