class StageManager {
  
  #stageProperties = {
  
    stage1: {
      backgroundColor: [210,238,245],
      playFieldWidth: 600,
      playFieldHeight: windowHeight,
      battWidth: 100,
      battHeight: 10,
      timer: 120
    },
    
    stage2: {
    }
  }

  constructor(){
  }
  
  getStageProperties({stage}){
    return this.#stageProperties[stage]
  }
  
}
