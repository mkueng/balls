class BusterBall extends Ball {

  #phase = random(1000);
  #anchorX = null; // the vertical “drop line”
  #sway = 0;
  #swayVel = 0;

  // for drawing the chute tilt
  #tilt = 0;
  #tiltVel = 0;

  constructor({stageProperties, playField, weight, relativePosXPercentage, scale}) {
    super({
      stageProperties,
      playField : playField,
      weight: 30,
      color: [1, 1, 1],
      relativePosXPercentage,
      scale
    })

    this.#phase = random(1000); // random phase so balls differ
  }

  hit() {
    this.isActive=false;
    return {
      target: "PLAYER",
      type: "BUST",
      props: null
    };
  }

  update() {
    super.update(0.01);

    if (!this.isActive) return;

    if (this.#anchorX === null) this.#anchorX = this.posX;

    // --- SWAY TARGET (how wide/fast it swings) ---
    this.#phase += 0.04;

    const amp = this.scaleWeight * 0.6 * this.scale;  // tune 0.25..0.7
    const targetSway = sin(this.#phase) * amp;

    // --- damped spring towards target sway (smooth pendulum) ---
    const stiffness = 0.06; // 0.04..0.12
    const damping = 0.88;   // 0.78..0.93

    this.#swayVel = (this.#swayVel + (targetSway - this.#sway) * stiffness) * damping;
    this.#sway += this.#swayVel;

    // let anchor slowly follow base motion so it doesn't fight velX
    this.#anchorX += (this.posX - this.#anchorX) * 0.05;

    // apply sway to payload
    this.posX = this.#anchorX + this.#sway;

    // --- CHUTE TILT: canopy lags behind the payload ---
    // tilt target is proportional to sway velocity (like “wind”)
    const tiltTarget = constrain(-this.#swayVel * 0.12, -0.6, 0.6);

    const tiltStiff = 0.08;
    const tiltDamp = 0.82;

    this.#tiltVel = (this.#tiltVel + (tiltTarget - this.#tilt) * tiltStiff) * tiltDamp;
    this.#tilt += this.#tiltVel;
  }

  // helper for draw()
  get chuteTilt() { return this.#tilt; }
  get sway() { return this.#sway; }

  draw() {

    // rotate point (x,y) around pivot (px,py) by angle a
    const rotateAround = (x, y, px, py, a) => {
      const dx = x - px;
      const dy = y - py;
      const ca = cos(a);
      const sa = sin(a);
      return {
        x: px + dx * ca - dy * sa,
        y: py + dx * sa + dy * ca
      };
    };

    push();

    const r = this.scaleWeight / 2;
    const canopyW = r * 4.5;
    const canopyH = r * 3.2;
    const canopyY = this.posY - r * 1.9;

    const pivotX = this.posX;
    const pivotY = canopyY - canopyH * 0.15;

    const a = this.chuteTilt;

    // rope end position *in the unrotated frame*
    // (this is where the ball should hang)
    const ropeEndLocalX = this.posX;
    const ropeEndLocalY = this.posY - r * 0.9;

    // rotate that rope end around the pivot -> world position
    const ropeEnd = rotateAround(ropeEndLocalX, ropeEndLocalY, pivotX, pivotY, a);

    // ---- draw chute + strings (rotated) ----
    push();
    translate(pivotX, pivotY);
    rotate(a);
    translate(-pivotX, -pivotY);

    // canopy fill
    noStroke();
    fill(0);
    arc(this.posX, canopyY, canopyW, canopyH, PI, TWO_PI);

    // canopy outline
    stroke(100);
    strokeWeight(max(1, this.scaleWeight * 0.03));
    noFill();
    arc(this.posX, canopyY, canopyW, canopyH, PI, TWO_PI);

    // scallops
    const scallops = 5;
    const step = canopyW / scallops;
    for (let i = 0; i < scallops; i++) {
      const x = this.posX - canopyW / 2 + step * (i + 0.5);
      arc(x, canopyY, step * 0.9, canopyH * 0.35, PI, TWO_PI);
    }

    // strings in rotated frame (rope end is "local" here)
    const attachLeftX  = this.posX - canopyW * 0.35;
    const attachRightX = this.posX + canopyW * 0.35;
    const attachY = canopyY;

    line(attachLeftX, attachY, ropeEndLocalX, ropeEndLocalY);
    line(attachRightX, attachY, ropeEndLocalX, ropeEndLocalY);

    pop();

    // ---- draw ball at the rope end WORLD position ----
    noStroke();
    fill(1);
    circle(ropeEnd.x, ropeEnd.y + r * 0.9, this.scaleWeight);

    pop();

  }

}