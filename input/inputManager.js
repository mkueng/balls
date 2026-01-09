class InputManager {

  #subscribers = [];

  subscribe(subscriber) {
    this.#subscribers.push(subscriber);
  }

  keyPressed(keyCode) {
    this.#subscribers.forEach(sub => {
      if (typeof sub.keyPressedEvent === "function") {
        sub.keyPressedEvent(keyCode);
      }
    });
  }
  
  
   keyReleased(keyCode) {
    this.#subscribers.forEach(sub => {
      if (typeof sub.keyReleasedEvent === "function") {
        sub.keyReleasedEvent(keyCode);
      }
    });
  }
}
