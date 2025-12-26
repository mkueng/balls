class CurveBall extends Ball {

  
  #time;
  
  constructor({stageProperties}) {
    super({
      stageProperties,
      weight:  Math.floor(random(45,60))
    });
    this.#time = 0;
    this.scorePoints = 25;
  }
  
  hit(){
   
  }
  
  
  update() {
    this.#time += 0.1; // pulsing speed
    // Pulsation: value oscillates between -1 and +1
    let pulse = sin(this.#time);
    this.velX = this.velX + pulse*0.3;
    super.update();
  }
  
  draw(){
     
    noStroke();
     fill(this.color[0],this.color[1], this.color[2]);
    push();
      translate(this.posX, this.posY);   // move to ball center (or near it)
      rotate(radians(this.posX)); // tilt
      textSize(this.weight *0.6);
      textFont('Impact');
      text("C", -this.weight/1.5, this.weight/4);
    pop();
   
    circle(this.posX,this.posY,this.weight);
    fill(this.color[0]+20,this.color[1]+20, this.color[2]+20);
    circle(this.posX,this.posY,this.weight-20);
    
  }
}
