class RainbowBall extends Ball {
  
  constructor({stageProperties, playField, relativePosXPercentage}){
    super({
    
      stageProperties: stageProperties,
      playField: playField,
      relativePosXPercentage,
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
  
  update({speedFactor}) {
    super.update();
  }
  
  draw({speedFactor}){
    noStroke();
    fill(Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255)));
    circle(this.posX,this.posY,this.weight);
  }

}
