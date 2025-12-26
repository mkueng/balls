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
  #numberOfBounces;
  #scorePoints;
  
  constructor({
    time,
    type,
    image,
    stageProperties,
    weight,
    posX,
    posY,
    velX,
    velY,
    color,
    scorePoints
  
  }){
    this.#stageProperties = stageProperties;
    this.#direction = true;
    this.#isActive = true;
    this.#time = time;
    this.#type = type;
    this.#image = image;
   
    this.#weight =
      weight ?? Math.floor(random(25,60));

    this.#posX =
      posX ?? random(
        this.#weight,
        this.#stageProperties.playFieldWidth - this.#weight
      );

    this.#posY =
      posY ?? -this.#weight;

    this.#velX = velX ?? 0;
    this.#velY = velY ?? 0;

    this.#color =
      color ?? [
        Math.floor(random(50,230)),
        Math.floor(random(50,230)),
        Math.floor(random(50,230))
      ];
      
    this.#scorePoints = scorePoints ?? 1;
  }
  
  get posX() {return this.#posX};
  get posY() {return this.#posY};
  get radius() {return this.#weight / 2};
  get velX() {return this.#velX};
  get velY() {return this.#velY};
  get weight() {return this.#weight};
  get isActive() {return this.#isActive};
  get color() {return this.#color};
  get scorePoints() {return this.#scorePoints};
  
  set isActive(isActive){this.#isActive = isActive};
  set direction(direction){this.#direction = direction};
  set velX(vel){this.#velX = vel};
  set velY(vel){this.#velY = vel};
  set scorePoints(points){this.#scorePoints = points};
   
  getScorePoints(){
    return this.#scorePoints
  }
  
  hit(){
    return null;
  }
  
  
  update(){
    if (this.#isActive) {
      
      if (this.#direction === true) {
      this.#velY = this.#velY + this.#weight / 200;
      this.#posY = this.#posY + this.#velY;
      this.#posX = this.#posX + this.#velX;
    }
    
    if (this.#direction === false) {
      this.#velY = this.#velY - this.#weight / 200
      this.#posY = this.#posY - this.#velY;
      this.#posX = this.#posX + this.#velX;
    }
    
      if (this.#direction === false && this.#velY <= 0) {
        this.#direction = true;
      }
    } else {
      this.#weight = this.#weight-1;
      this.#posY = this.#posY + 3;
    }
    
  }

  draw(){
    noStroke();
    fill(this.#color[0],this.#color[1], this.#color[2]);
    circle(this.#posX,this.#posY,this.#weight);
  }
}
