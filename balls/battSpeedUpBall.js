class BattSpeedUpBall extends Ball {

  #time;
  
  constructor({stageProperties, playField}){
    super({
      stageProperties: stageProperties,
      playField: playField,
      weight: 40,
      color: [0,0,255]
    })
    
    this.#time = 0;
  }
  
   hit(){
     this.isActive=false;
    return {
      target: "BATT",
      type: "SPEED",
      props: null  
    };
  }
  
  update(){
    super.update();
  }
  
  draw(){
    push();
    noStroke();
    fill(this.color[0],this.color[1], this.color[2]);
    circle(this.posX,this.posY,this.weight);
    fill(255,255,0);
    textFont('Impact');
    textSize(25);
    textAlign(CENTER);
    text("S", this.posX, this.posY+this.weight/4);
    pop();
  }

}
