class Player {
  
  #name;
  #personalHighScore;
  #avatar;
  #currentScore;
  #stageProperties;
  #inputManager;
  #playField;
  #bat;
  #playerNumber;
  #windowManager;
  #ballManager;
  #playFieldFactory;
  #controls;
  #speedFactor;
  #subscribers;
  #scaleFactor;

  constructor({
                stageProperties,
                inputManager,
                name,
                personalHighScore,
                avatar,
                playerNumber,
                windowManager,
                playFieldFactory,
                speedFactor,
                controls
  }){
    this.#stageProperties = stageProperties;
    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
    this.#playFieldFactory = playFieldFactory;
    this.#name = name ?? "player";
    this.#personalHighScore = personalHighScore ?? "0";
    this.#avatar = avatar ?? null;
    this.#currentScore = 0;
    this.#playerNumber = playerNumber;
    this.#controls = controls ?? [];
    this.#speedFactor = speedFactor;
    this.#subscribers = [];
  }

  set ballManager(ballManager){
    this.#ballManager = ballManager;
  }

  get ballManager(){
    return this.#ballManager;
  }

  get bat(){
    return this.#bat;
  }

  get playField(){
    return this.#playField;
  }

  subscribe({callback}){
    this.#subscribers.push(callback);
  }

  #updateFromWindowManager = ()=>{
    const playFieldBounds =  this.#playField.setBoundaries();
    this.#bat.setBounds({playFieldBounds});
    this.#ballManager.speedFactor = canvasWidth / 1000;
    //this.#speedFactor = canvasWidth / 1000;
    //this.#bat.speedFactor = this.#speedFactor;
  }

  init() {

    this.#windowManager.subscribe(this.#updateFromWindowManager);

    this.#playField = this.#playFieldFactory.createPlayField({});
    this.#playField.init();


    const playFieldBounds =  this.#playField.setBoundaries();
    this.#bat = new Bat({
      playFieldBounds: playFieldBounds,
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager,
      controls: this.#controls,
      speedFactor: this.#speedFactor
    });

    this.#bat.init();

    this.#bat.setBounds({playFieldBounds});
  }

  update(){

  }

  draw(){
    this.#playField.draw();
    this.#bat.update();
    this.#bat.draw();
  }
  
  get name() {return this.#name;}
  get personalHighScore() {return this.#personalHighScore;}
  get currentScore() {return this.#currentScore;}
  
}
