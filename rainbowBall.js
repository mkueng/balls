class RainbowBall extends Ball {
  
  constructor({stageProperties}){
    super({
    
      stageProperties: stageProperties,
      weight: 30
    })
  }
  hit(){
    this.isActive=false;
    return {
      target: "BATT",
      type: "RAINBOW",
      props: null
    };
  }
  
  update(){
    super.update();
  }
  
  draw(){  
    noStroke();
    fill(Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255)));
    circle(this.posX,this.posY,this.weight);
  }

}
