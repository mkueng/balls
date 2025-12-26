class BallFactory {
  
  #ballTypes;
  #ballTypeMap;
  #stageProperties;
  #ballTypeDistribution;
  
  constructor({
    stageProperties
  }){
    this.#stageProperties = stageProperties;
    this.#ballTypeDistribution = {

      "extender": 7,
      "plain": 45,
      "number": 30,
      "rainbow": 3,
      "speed" : 5,
      "curve": 10


    } 
    this.#ballTypeMap = {};
  }
  
  get ballTypeMap(){return this.#ballTypeMap};

  init = ()=>{
    
    let index = 1;
    for (const ballType in this.#ballTypeDistribution) {
      for (let i=0; i< this.#ballTypeDistribution[ballType]; i++){
        this.#ballTypeMap[index] = ballType;
        index++;
      }
    }
    
    this.#ballTypes = {
      plain: ()=> new Ball({
        stageProperties: this.#stageProperties
      }),
      
      number: ()=> new NumberBall({
        stageProperties: this.#stageProperties
      }),
      
      extender: ()=> new ExtenderBall({
        stageProperties: this.#stageProperties
      }),
      
      rainbow: ()=> new RainbowBall({
        stageProperties: this.#stageProperties
      }),
      
      speed: ()=> new BattSpeedUpBall({
        stageProperties: this.#stageProperties
      }),
      curve: ()=> new CurveBall({
         stageProperties: this.#stageProperties
      })
    }
  }
  
  createBall(type){
    return this.#ballTypes[type]();
  }
}
