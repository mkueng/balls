class ExtenderBall extends Ball {

  #time;
  
  constructor({stageProperties, playField}){
    super({
    
      stageProperties: stageProperties,
      playField: playField,
      weight: 30,
      color: [255,0,0]
    })
    
    this.#time = 0;
  }
  
   hit(){
     this.isActive=false;
    return {
      target: "BATT",
      type: "EXTEND",
      props: null  
    };
  }
  
  update(){
    super.update();
  }
  
  draw(){ 
    this.#time += 0.1; // pulsing speed
    // Pulsation: value oscillates between -1 and +1
    let pulse = sin(this.#time);

    // Pulse strength → adjust 0.1 for how "big" the pulse is
    let pulseSize = this.weight * (1 + 0.3 * pulse)*1.5;
    push();
    noStroke();
    fill(this.color[0],this.color[1], this.color[2]);
    circle(this.posX,this.posY,pulseSize);
    fill(255,255,0);                    
    textSize(20);
    textFont('Impact');
    textAlign(CENTER);
    text("E", this.posX, this.posY+this.weight/4);
    pop();
  }

}
