class BallFactory {
  #stageProperties;
  #ballTypeDistribution;
  #ballTypeMap = {};
  #ballClasses;

  constructor({ stageProperties }) {
    this.#stageProperties = stageProperties;

    this.#ballTypeDistribution = {
      extender: 7,
      plain: 50,
      number: 30,
      rainbow: 3,
      curve: 10,
    };

    /*
    this.#ballTypeDistribution = {
      extender: 100
    };
*/
    this.#ballClasses = {
      plain: Ball,
      number: NumberBall,
      extender: ExtenderBall,
      rainbow: RainbowBall,
      speed: BattSpeedUpBall,
      curve: CurveBall,
    };

    this.#buildBallTypeMap();
  }

  get ballTypeMap() {
    return this.#ballTypeMap;
  }

  #buildBallTypeMap() {
    let index = 1;
    for (const type in this.#ballTypeDistribution) {
      for (let i = 0; i < this.#ballTypeDistribution[type]; i++) {
        this.#ballTypeMap[index++] = type;
      }
    }
  }

  createBall({ type, playField, weight, relativePosXPercentage, scale }) {
    const BallCtor = this.#ballClasses[type];
    if (!BallCtor) throw new Error(`Unknown ball type: ${type}`);

    return new BallCtor({
      stageProperties: this.#stageProperties,
      playField,
      weight,
      scale,
      relativePosXPercentage,
    });
  }
}
