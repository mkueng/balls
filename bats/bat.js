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
  #scale;

  constructor({
                inputManager,
                playFieldBounds,
                controls,
                scale,
                width,
    height,
                speed
              }) {

    this.#posY = canvasHeight - canvasHeight / 15;
    this.#playFieldWidth = canvasWidth / 2;
    this.#inputManager = inputManager;
    this.#moveLeft = false;
    this.#moveRight = false;
    this.#speed = speed;
    this.#isInSpecialState = false;
    this.#playFieldBounds = playFieldBounds;
    this.#controls = controls;
    this.#scale = scale;
    this.#width = width;
    this.#height = height;
    this.#posX = (this.#playFieldBounds.startX + this.#playFieldBounds.endX) / 2 - (this.#width/2);
    this.#inputManager.subscribe(this);
    this.#playFieldBounds = playFieldBounds;




    this.#states = {

      normal: {
        transition: () => {
          if (this.#width > canvasWidth / 8) {
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
          arc(
            this.#posX + this.#width / 2,// center x
            this.#posY,                  // top of rectangle
            this.#width,                 // arc width
            this.#width * 0.2,           // arc height (circle)
            PI,                          // start angle
            TWO_PI                       // end angle
          );
        }
      },

      extended: {
        transition: () => {
          if (this.#width < canvasWidth /6) {
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
          arc(
            this.#posX + this.#width / 2,// center x
            this.#posY,                  // top of rectangle
            this.#width,                 // arc width
            this.#width * 0.2,           // arc height (circle)
            PI,                          // start angle
            TWO_PI                       // end angle
          );
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
          this.#speed = 15 * this.#scale;
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

  set scale(scale){
    this.#scale = scale;
  };

  setBounds({playFieldBounds}) {
    this.#playFieldBounds = playFieldBounds;
    this.#posX = (playFieldBounds.startX + playFieldBounds.endX) / 2 - (this.#width/2);
    this.#posY = canvasHeight - canvasHeight / 15;
    this.#width = canvasWidth / 8;
    this.#height = canvasHeight / 70;

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
      this.#posX -=this.#speed * this.#scale;
    }
    
    if (this.#moveRight && this.#posX < this.#playFieldBounds.endX-this.#width-canvasWidth/100) {
      this.#posX +=this.#speed * this.#scale;
    }
  }

  draw() {
    this.#currentState.draw();

  }
}