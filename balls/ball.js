class Ball{

  #type;
  #posX;
  #posY;
  #velX;
  #velY;
  #weight;
  #color;
  #time;
  #image;
  #direction;
  #isActive;
  #stageProperties;
  #playField;
  #numberOfBounces;
  #scorePoints;
  #relativePosXPercentage;
  #scale;
  #scaleWeight;

  constructor({
                time,
                type,
                image,
                stageProperties,
                playField,
                weight,
                posX,
                posY,
                velX,
                velY,
                color,
                scorePoints,
                relativePosXPercentage,
                scale
  }){
    this.#stageProperties = stageProperties;
    this.#playField = playField;
    this.#direction = true;
    this.#isActive = true;
    this.#time = time;
    this.#type = type;
    this.#image = image;
    this.#relativePosXPercentage = relativePosXPercentage;
    this.#velX = velX ?? 0;
    this.#velY = velY ?? 0;
    this.#scale = scale ?? 1;
    this.#weight = weight;
    this.#scaleWeight = this.#weight * this.#scale;
    this.#posY = posY ?? 0 - this.#scaleWeight;
    this.#color =
      color ?? [
        Math.floor(random(50,230)),
        Math.floor(random(50,230)),
        Math.floor(random(50,230))
      ];

    this.#scorePoints = scorePoints ?? 1;

    let range = this.#playField.bounds.endX - this.#scaleWeight - this.#playField.bounds.startX;
    // range / 100 * this.#relativePosXPercentage
    this.#posX = posX ??
      this.#playField.bounds.startX+this.#scaleWeight/2 + (range / 100 * this.#relativePosXPercentage);
  }

  get posX() {return this.#posX};
  get posY() {return this.#posY};
  get radius() {return this.#weight / 2};
  get velX() {return this.#velX};
  get velY() {return this.#velY};
  get weight() {return this.#weight};
  get scaleWeight() {return this.#scaleWeight};
  get isActive() {return this.#isActive};
  get color() {return this.#color};
  get scorePoints() {return this.#scorePoints};

  set isActive(isActive){this.#isActive = isActive};
  set direction(direction){this.#direction = direction};
  set velX(vel){this.#velX = vel};
  set velY(vel){this.#velY = vel};
  set scorePoints(points){this.#scorePoints = points};

  set scale(scale){
    this.#scale = scale
    this.#scaleWeight = this.#weight * this.#scale;
  };

  getScorePoints(){
    return this.#scorePoints
  }
  
  hit(){
    return null;
  }

  /**
   * Update the ball position
   * @param scale
   */
  update(){
    if (this.#isActive) {
      
      if (this.#direction === true) {
      this.#velY = this.#velY + (this.#scaleWeight / 200);
      this.#posY = this.#posY + this.#velY;
      this.#posX = this.#posX + this.#velX;
    }
    
    if (this.#direction === false) {
      this.#velY = this.#velY - (this.#scaleWeight / 200) ;
      this.#posY = this.#posY - this.#velY;
      this.#posX = this.#posX + this.#velX;
    }
    
      if (this.#direction === false && this.#velY <= 0) {
        this.#direction = true;
      }
    } else {
      console.log("inactive ball shrinking");
      this.#scaleWeight = this.#scaleWeight-1;
      this.#posY = this.#posY + 3;
    }
    
  }

  /**
   * Draw the ball
   * @param scale
   */
  draw({scale}){
    noStroke();
    fill(this.#color[0],this.#color[1], this.#color[2]);
    circle(this.#posX,this.#posY,this.#scaleWeight);
  }
}
