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
      plain: (playField)=> new Ball({
        stageProperties: this.#stageProperties,
        playField: playField
      }),
      
      number: (playField)=> new NumberBall({
        stageProperties: this.#stageProperties,
        playField: playField
      }),
      
      extender: (playField)=> new ExtenderBall({
        stageProperties: this.#stageProperties,
        playField: playField
      }),
      
      rainbow: (playField)=> new RainbowBall({
        stageProperties: this.#stageProperties,
        playField: playField
      }),
      
      speed: (playField)=> new BattSpeedUpBall({
        stageProperties: this.#stageProperties,
        playField: playField
      }),
      curve: (playField)=> new CurveBall({
        stageProperties: this.#stageProperties,
        playField: playField
      })
    }
  }
  
  createBall({type,playField}){
    return this.#ballTypes[type](playField);
  }
}
