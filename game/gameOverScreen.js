class GameOverScreen {
  
  constructor(){
    
  }
  
  draw(){
    push();
    textAlign(CENTER);
    noStroke();
    textSize(50);
    fill(100, 100, 200);
    text("Game Over", width / 2, height-height*0.8);
    text("Press Space", width / 2, height-height*0.05);
    pop(); 
  }
 

}
