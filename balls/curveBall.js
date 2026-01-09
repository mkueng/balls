class CurveBall extends Ball {
  #time;

  constructor({ stageProperties, playField, weight, relativePosXPercentage, scale }) {
    super({
      stageProperties,
      playField,
      weight,
      relativePosXPercentage,
      scale
    });

    this.#time = 0;
    this.scorePoints = 25;
  }

  hit() {
    // define behavior if needed
  }

  update() {
    this.#time += 0.1;

    // curve acceleration (oscillates)
    const pulse = sin(this.#time);

    // amount of sideways acceleration scales with size so it "feels" consistent
    const ax = 0.55 * this.scale; // tune this

    this.velX = this.velX + pulse * ax;

    // prevent runaway horizontal speed
    const maxVX = 10 * this.scale; // tune this
    if (this.velX >  maxVX) this.velX =  maxVX;
    if (this.velX < -maxVX) this.velX = -maxVX;

    super.update();
  }

  draw() {
    const d = this.scaleWeight;                 // diameter (scaled)
    const innerD = Math.max(2, d - d * 0.35);   // inner circle, never negative

    push();
    noStroke();

    // outer
    fill(this.color[0], this.color[1], this.color[2]);
    circle(this.posX, this.posY, d);

    // inner highlight
    fill(
      Math.min(255, this.color[0] + 20),
      Math.min(255, this.color[1] + 20),
      Math.min(255, this.color[2] + 20)
    );
    circle(this.posX, this.posY, innerD);

    // letter
    translate(this.posX, this.posY);
    rotate(radians(this.posX * 0.2)); // subtle tilt (optional)
    textAlign(CENTER, CENTER);
    textFont('Impact');
    fill(255);
    textSize(d * 0.6);
    text("C", 0, 0);

    pop();
  }
}
