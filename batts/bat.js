'use strict'
class Bat {

  #width;
  #height;
  #posX;
  #posY;
  #inputManager;
  #moveLeft;
  #moveRight;
  #playFieldWidth;
  #states;
  #currentState;
  #stateInTransition;
  #stateTransition;
  #speed;
  #isInSpecialState;
  #playFieldBounds;
  #controls;

  constructor({
                stageProperties,
                inputManager,
                playFieldBounds,
                controls,
                speedFactor
              }) {
    this.#width = stageProperties.battWidth;
    this.#height = stageProperties.battHeight;
    this.#posX = playFieldBounds.startX + (playFieldBounds.width / 2) - (this.#width / 2);
    this.#posY = canvasHeight - 50;
    this.#playFieldWidth = canvasWidth / 2;
    this.#inputManager = inputManager;
    this.#moveLeft = false;
    this.#moveRight = false;
    this.#speed = 8;
    this.#isInSpecialState = false;
    this.#playFieldBounds = playFieldBounds;
    this.#controls = controls;


    this.#states = {

      normal: {
        transition: () => {
          if (this.#width > 100) {
            this.#width -= 2;
            this.#posX += 1;
          } else {
            this.#stateInTransition = false;
            this.#currentState = this.#states.normal;
            this.#speed = 8;
          }
        },
        draw: () => {
          fill(100, 100, 100);
          noStroke();
          rect(this.#posX, this.#posY, this.#width, this.#height);
        }
      },

      extended: {
        transition: () => {
          if (this.#width < 200) {
            this.#width += 2;
            this.#posX -= 1;
          } else {
            this.#stateInTransition = false;
            this.#currentState = this.#states.extended;
            setTimeout(() => {
              this.#stateInTransition = true;
              this.#stateTransition = this.#states.normal.transition;
              this.#isInSpecialState = false;
            }, 7000)

          }
        },
        draw: () => {
          fill(200, 100, 100);
          noStroke();
          rect(this.#posX, this.#posY, this.#width, this.#height);
        }

      },

      rainbow: {
        transition: () => {
          if (this.#width < this.#playFieldWidth) {
            this.#width += 6;
          }
          if (this.#posX > 0) {
            this.#posX -= 2;
          }

          if (this.#width >= this.#playFieldWidth && this.#posX <= 0) {
            this.#stateInTransition = false;
            this.#currentState = this.#states.rainbow;
            setTimeout(() => {
              this.#stateInTransition = true;
              this.#stateTransition = this.#states.normal.transition;
              this.#isInSpecialState = false;
            }, 7000)
          }
        },
        draw: () => {
          fill(Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255)));
          noStroke();
          rect(this.#posX, this.#posY, this.#width, this.#height);
        }

      },
      speedUp: {
        transition: () => {
          this.#stateInTransition = false;
          this.#currentState = this.#states.speedUp;
          this.#speed = 15;
          setTimeout(() => {
            this.#stateInTransition = true;
            this.#stateTransition = this.#states.normal.transition;
            this.#isInSpecialState = false;
          }, 15000)
        },
        draw: () => {
          fill(0, 0, 255);
          noStroke();
          rect(this.#posX, this.#posY, this.#width, this.#height);
        }
      }
    }
    this.#currentState = this.#states.normal;
    this.#stateInTransition = false;
  }

  get posX() {
    return this.#posX
  }

  get posY() {
    return this.#posY
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }

  init() {
    this.#inputManager.subscribe(this);
  }

  setBounds({playFieldBounds}) {
    this.#playFieldBounds = playFieldBounds;
    this.#posX = playFieldBounds.startX + (playFieldBounds.width / 2) - (this.#width / 2);
    this.#posY = canvasHeight - canvasHeight / 15;
    this.#width = canvasWidth / 6;
    this.#height = canvasHeight / 30;
    this.#speed = canvasHeight / 100;
  }

  applyEffect(effect) {
    
    if (!this.#isInSpecialState) {
    
      switch(effect.type){
        case "EXTEND": {
          this.#stateInTransition = true; 
          this.#stateTransition = this.#states.extended.transition;
          this.#isInSpecialState = true;
          break;
        }
        case "RAINBOW": {
          this.#stateInTransition = true;
          this.#stateTransition = this.#states.rainbow.transition;
          this.#isInSpecialState = true;
          break;
        }
         case "SPEED": {
          this.#stateInTransition = true;
          this.#stateTransition = this.#states.speedUp.transition;
          this.#isInSpecialState = true;
          break;
        }
      }
    }
  }

  keyPressedEvent(keyCode){
    if (keyCode === this.#controls.left) {
       this.#moveLeft = true;
    }
    
    if (keyCode === this.#controls.right ) {
      this.#moveRight = true;
    }  
  }
  
  keyReleasedEvent(keyCode){
    if (keyCode === this.#controls.left) {
      this.#moveLeft = false;
    }
    
    if (keyCode === this.#controls.right) {
      this.#moveRight = false;
    }
  }
  
  update(){
    if (this.#stateInTransition) {
      this.#stateTransition();
    }
    
    if (this.#moveLeft && this.#posX > this.#playFieldBounds.startX+canvasWidth/100) {
      this.#posX -=this.#speed;
    }
    
    if (this.#moveRight && this.#posX < this.#playFieldBounds.endX-this.#width-canvasWidth/100) {
      this.#posX +=this.#speed;
    }
  }

  draw() {
    this.#currentState.draw();
  }
}