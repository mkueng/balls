class NumberBall extends Ball {

  #numberOfBounces;
  
  constructor({stageProperties}){
    super({stageProperties})
    this.#numberOfBounces = 0;
  }
  
  hit(){
    this.#numberOfBounces++;
    this.scorePoints = this.#numberOfBounces;
  }
  
  update(){
    super.update();
  }
  
  draw(){ 
    super.draw();
    fill(255);                    
    textSize(this.weight *0.6);
  
    push();
      translate(this.posX, this.posY);   // move to ball center (or near it)
      rotate(radians(this.posX)); // tilt
      textFont('Impact');
      text(this.#numberOfBounces, -this.weight/3, this.weight/4);
    pop();
  }

}
