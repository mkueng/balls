'use strict';
/**
 * @class ScoreView
 */
class ScoreView extends View{

  #currentScore;

  /**
   *
   * @param playFieldBounds
   * @param scale
   */
  constructor({
    playFieldBounds,
    scale,
    windowManager,
    currentScore
              }) {
    super({
      playFieldBounds,
      scale,
      windowManager,
    })

    this.#currentScore = currentScore ?? 0;
  }

  /**
   * @function currentScore
   * @param score
   */
  set currentScore(score){
    this.#currentScore = score;
  }

  /**
   * @function draw
   */
  draw(){
    push();
    const textSizePx = this.scale * 40;
    textSize(textSizePx);

    fill(64, 64, 64);
    textAlign(LEFT);
    text("SCORE: "+this.#currentScore, this.playFieldBounds.startX+(20*this.scale), this.playFieldBounds.startY+(50*this.scale));
    pop();
  }


}