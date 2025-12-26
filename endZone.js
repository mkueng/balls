class EndZone {

  #stageProperties;
  #backgroundColor;
  #width;
  #height;
  
  constructor({
    stageProperties
  }){
    this.#stageProperties = stageProperties;
    this.#width = this.#stageProperties.playFieldWidth;
    this.#height = this.#stageProperties.playFieldHeight;
    
  }
  
  
  draw(){
    fill(67, 115, 180);
    rect(0, this.#height - 40, this.#width, 40);
  }
}
