'use strict';
class Controls{

  controlAssignments={
    1: {
      left: 65,
      right: 68
    },

    2: {
      left: 37,
      right: 39
    }

  }

  constructor(){
  }

  getControlsForPlayer(playerNumber){
    return this.controlAssignments[playerNumber];
  }


}