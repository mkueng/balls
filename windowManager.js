class WindowManager{

  #proportion;
  #subscribers = [];

  constructor({proportion}={}) {
    this.#proportion = proportion?? 1.6;
    this.resize();
  }

  resize() {
    canvasWidth = (windowHeight / this.#proportion) *2;
    canvasHeight = (windowHeight);
    resizeCanvas( canvasWidth, canvasHeight);
    const proportion = canvasWidth / canvasHeight;
    this.#updateSubscribers();
  }

  #updateSubscribers(){
    this.#subscribers.forEach(subscriber=>{
      subscriber();
    })
  }

  subscribe(subscriber){
    this.#subscribers.push(subscriber);
  }
}