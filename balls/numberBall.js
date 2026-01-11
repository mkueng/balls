'use strict';
class NumberBall extends Ball {

  #numberOfBounces;
  
  constructor({stageProperties, playField, weight, relativePosXPercentage, scale}){
    super({
      stageProperties,
      playField,
      weight,
      relativePosXPercentage,
      scale
    })
    this.#numberOfBounces = 0;
  }
  
  hit(){
    this.#numberOfBounces++;
    this.scorePoints = this.#numberOfBounces;
  }
  
  update() {
    super.update();
  }

  draw(){
    super.draw();

    push();
    translate(this.posX, this.posY);

    // subtle rotation (optional)
    rotate(radians(this.posX * 0.2));

    textAlign(CENTER, CENTER);
    textFont('Impact');

    // scale text with the ball
    const textSizePx = this.scaleWeight * 0.6;
    textSize(textSizePx);

    // high contrast
    fill(255);

    text(this.#numberOfBounces, 0, 0);
    pop();
  }

}
