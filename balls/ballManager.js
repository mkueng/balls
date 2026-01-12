'use strict';
class BallManager {

  #stageProperties;
  #ballFactory;
  #balls;
  #bat;
  #onScore;
  #onEffect;
  #playerId;
  #playField;
  #scale;

  /**
   *
   * @param stageProperties
   * @param ballFactory
   * @param bat
   * @param onScore
   * @param onEffect
   * @param playerId
   * @param playField
   * @param scale
   */
  constructor({
    stageProperties,
    ballFactory,
    bat,
    onScore,
    onEffect,
    playerId,
    playField,
    scale
  }){
    this.#bat = bat;
    this.#onScore = onScore;
    this.#playerId = playerId;
    this.#onEffect = onEffect;
    this.#stageProperties = stageProperties;
    this.#ballFactory = ballFactory;
    this.#balls = [];
    this.#playField = playField;
    this.#scale = scale;
  }

  set scale(scale) {
    this.#scale = scale;
    for (let i = this.#balls.length - 1; i >= 0; i--) {
      this.#balls.splice(i, 1);
    }
  }

  init(){}

  /**
   *
   * @param randomBallTypeNumber
   * @param ballWeight
   * @param relativePosXPercentage
   * @param scale
   */
  createBall({
               randomBallTypeNumber,
               ballWeight,
               relativePosXPercentage,
               scale
  }){
    const ballType = this.#ballFactory.ballTypeMap[""+randomBallTypeNumber];
    this.#balls.push(
      this.#ballFactory.createBall({
        type: ballType,
        playField: this.#playField,
        weight:ballWeight,
        scale: scale,
        relativePosXPercentage: relativePosXPercentage
      })
    );
  }

  /**
   *
   */
  updateBalls() {
    const playFieldWidth  = this.#playField.bounds.width;
    const playFieldHeight = this.#playField.bounds.height;

    for (let i = this.#balls.length - 1; i >= 0; i--) {
      const ball = this.#balls[i];
      ball.update({scale: this.#scale});
  
      // Remove fully "dead" balls
      if (!ball.isActive) {
        if (ball.scaleWeight <= 0) {
          this.#balls.splice(i, 1);
        }
        continue; // skip rest of logic for inactive balls
      }

      // Only check bat collision when near the bottom
      const radius = (ball.scaleRadius);
      const playFieldTop = this.#playField.bounds.startY;
      const batZoneY = playFieldTop + playFieldHeight - 70 * this.#scale;

      if (ball.posY > batZoneY - radius) {
        const hitArea = this.checkBallBatCollision(ball);
  
        if (hitArea !== false && ball.velY > 3) {
          ball.direction = false;

          // Update score
          this.#onScore({
            playerId:this.#playerId,
            points:ball.getScorePoints()
          });

          // Apply effect
          let effect = ball.hit();
          if (effect) this.#onEffect({
            playerId:this.#playerId,
            effect:effect
          });

          // Calculate offset from bat center
          const hitAreaRounded = Math.floor(hitArea);
          const offset = hitAreaRounded - (this.#bat.width / 2 +1);
  
          // combine your two lines:
          ball.velX = ((ball.velX + offset) / 18)
          ball.velY -= 1 * this.#scale + (ball.scaleWeight / 100) // bat bounce factor !;
        } else {
          ball.isActive = false;
        }
      }

      // Bounce off left / right walls
      if (ball.posX <= this.#playField.bounds.startX+radius || ball.posX >= this.#playField.bounds.endX - radius) {
        ball.velX *= -1;
      }
    }
  }

  /**
   *
   * @param ball
   * @returns {number|boolean}
   */
  checkBallBatCollision(ball){
    const ballPosX = ball.posX;
    const ballPosY = ball.posY;
    const ballRadius = ball.scaleRadius;

    const batHeight = this.#bat.height;
    const batLeft = this.#bat.posX;
    const batRight = this.#bat.posX + this.#bat.width;
    const batTop = this.#bat.posY - ballRadius
    const batBottom = this.#bat.posY +this.#bat.height;
    
    const hitsHorizontally = ballPosX + ballRadius >= batLeft && ballPosX - ballRadius <= batRight;
    const hitsVertically   = ballPosY + ballRadius >= batTop && ballPosY - ballRadius <= batBottom;
    
    if (hitsHorizontally && hitsVertically) {
      return ballPosX - batLeft
    } else return false;
  }

  /**
   *
   */
  drawBalls(){
   this.#balls.forEach((ball) =>{
      ball.draw({speedFactor: this.#scale});
    }) 
  }
}