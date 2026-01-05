class NumberBall extends Ball {

  #numberOfBounces;
  
  constructor({stageProperties, playField, weight, relativePosXPercentage}){
    super({
      stageProperties,
      playField,
      weight,
      relativePosXPercentage
    })
    this.#numberOfBounces = 0;
  }
  
  hit(){
    this.#numberOfBounces++;
    this.scorePoints = this.#numberOfBounces;
  }
  
  update({speedFactor}) {
    super.update({speedFactor});
  }
  
  draw({speedFactor}){
    super.draw({speedFactor})
    textSize(this.weight *0.6);
  
    push();
      translate(this.posX, this.posY);   // move to ball center (or near it)
      rotate(radians(this.posX)); // tilt
      textFont('Impact');
      text(this.#numberOfBounces, -this.weight/3, this.weight/4);
    pop();
  }

}
