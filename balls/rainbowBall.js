class RainbowBall extends Ball {
  #t;

  constructor({ stageProperties, playField, relativePosXPercentage, scale }) {
    super({
      stageProperties,
      playField,
      relativePosXPercentage,
      weight: 30,
      scale
    });
    this.#t = random(1000); // random phase so balls differ
  }

  hit(){
    this.isActive = false;
    return { target: "BATT", type: "RAINBOW", props: null };
  }

  update() {
    this.#t += 0.1;
    super.update();
  }

  draw(){
    // smooth rainbow via sin waves (works in default RGB mode)
    const r = 128 + 127 * sin(this.#t);
    const g = 128 + 127 * sin(this.#t + TWO_PI/3);
    const b = 128 + 127 * sin(this.#t + 2*TWO_PI/3);

    noStroke();
    fill(r, g, b);
    circle(this.posX, this.posY, this.scaleWeight);
  }
}
