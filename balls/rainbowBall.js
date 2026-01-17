'use strict'
class RainbowBall extends Ball {
  #phase;

  constructor({ stageProperties, playField, relativePosXPercentage, scale }) {
    super( {
      stageProperties,
      playField,
      relativePosXPercentage,
      weight: 40,
      scale
    });

    this.#phase = random(1000); // random phase so balls differ
  }

  hit(){
    this.isActive = false;
    return {
      target: "BAT",
      type: "RAINBOW",
      props: null
    };
  }

  update() {
    this.#phase += 0.1;
    super.update();
  }

  draw(){
    // smooth rainbow via sin waves (works in default RGB mode)
    const r = 128 + 127 * sin(this.#phase);
    const g = 128 + 127 * sin(this.#phase + TWO_PI/3);
    const b = 128 + 127 * sin(this.#phase + 2*TWO_PI/3);

    noStroke();
    fill(r, g, b);
    circle(this.posX, this.posY, this.scaleWeight);
  }
}
