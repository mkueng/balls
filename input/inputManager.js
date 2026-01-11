'use strict';
class InputManager {

  #subscribers = [];

  /**
   *
   * @param subscriber
   */
  subscribe(subscriber) {
    this.#subscribers.push(subscriber);
  }

  /**
   *
   * @param keyCode
   */
  keyPressed(keyCode) {
    this.#subscribers.forEach(sub => {
      if (typeof sub.keyPressedEvent === "function") {
        sub.keyPressedEvent(keyCode);
      }
    })
  }

  /**
   *
   * @param keyCode
   */
  keyReleased(keyCode) {
    this.#subscribers.forEach(sub => {
      if (typeof sub.keyReleasedEvent === "function") {
        sub.keyReleasedEvent(keyCode);
      }
    })
  }
}
