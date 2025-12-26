class BattEnlargerBall extends Ball {
  
  
 
  
  draw(){
    this.time += 0.1; // pulsing speed
    // Pulsation: value oscillates between -1 and +1
    let pulse = sin(this.time);

    // Pulse strength → adjust 0.1 for how "big" the pulse is
    let pulseSize = this.weight * (1 + 0.3 * pulse)*2;
    
    noStroke();
    fill(this.color[0],this.color[1], this.color[2]);
    circle(this.posX,this.posY,pulseSize);
    
     // Draw text inside the ball
    fill(255);                     // or white if your ball is dark
    //textAlign(CENTER, CENTER);
    textSize(this.weight *1.2); // scale text relative to ball size
    text("E", this.posX, this.posY);
 
  }
  
}
