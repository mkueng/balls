class Timer {
  
  #counter;
  #intervalId;
  #subscribers;
  #stageProperties;

  constructor({stageProperties}){
    this.#stageProperties = stageProperties;
    this.#subscribers = [];
  }
  
  init(){
   
  }
  
  subscribe(subscriber){
    this.#subscribers.push(subscriber);
  }
  
  start(){
    this.#counter = this.#stageProperties.timer;
    this.#intervalId = setInterval(()=>{
      if (this.#counter <= 0) {
        this.#counter = 0;
        console.log("counter: ", this.#counter);
        clearInterval(this.#intervalId);
       
      } else {
        this.#counter--;
        this.#subscribers.forEach((subscriber)=>{
        subscriber.timerUpdate(this.#counter);
        })
      }
    }, 1000)
  }
  
  draw(){
    fill(100);
    textAlign(LEFT);
    textSize(40); // scale text relative to ball size
    text("TIME: "+this.#counter, 430, 50);
  }

  
}
