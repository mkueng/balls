'use strict';
class ExtenderBall extends Ball {

  #time;
  
  constructor({stageProperties, playField, relativePosXPercentage, scale}){
    super({
    
      stageProperties: stageProperties,
      playField: playField,
      weight: 20,
      color: [255,100,100],
      relativePosXPercentage,
      scale
    })
    
    this.#time = 0;
  }
  
   hit(){
     this.isActive=false;
      return {
        target: "BAT",
        type: "EXTEND",
        props: null
      };
    }
  
  update() {
    super.update();
  }

  draw(){
    this.#time += 0.1;
    const pulse = sin(this.#time);

    const base = this.scaleWeight;   // diameter in px
    const amp = 0.5;                 // 30% pulse
    const glow = 1.5;                // overall size multiplier (optional)
    const pulseSize = base * glow * (1 + amp * pulse);

    push();
    noStroke();
    fill(this.color[0], this.color[1], this.color[2]);
    circle(this.posX, this.posY, pulseSize);
/*
    fill(1,1,1);
    textSize(20 * this.scale);               // use this.scale, not `scale`
    textFont('Arial');
    textAlign(CENTER, CENTER);
    text("E", this.posX, this.posY);

 */
    pop();
  }


}
