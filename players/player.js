class Player {

  #id;
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
  #endZoneFactory;
  #controls;
  #subscribers;
  #scaleFactor;
  #endZone;
  #scale;

  constructor({
                stageProperties,
                inputManager,
                name,
                id,
                personalHighScore,
                avatar,
                playerNumber,
                windowManager,
                playFieldFactory,
                endZoneFactory,
                controls,
                scale
  }){
    this.#stageProperties = stageProperties;
    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
    this.#playFieldFactory = playFieldFactory;
    this.#endZoneFactory = endZoneFactory;
    this.#name = name ?? "player";
    this.#id = id;
    this.#personalHighScore = personalHighScore ?? "0";
    this.#avatar = avatar ?? null;
    this.#currentScore = 0;
    this.#playerNumber = playerNumber;
    this.#controls = controls ?? [];
    this.#subscribers = [];
    this.#scale = scale;


  }

  set ballManager(ballManager){
    this.#ballManager = ballManager;
  }

  get name(){
    return this.#name;
  }

  get id(){
    return this.#id;
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

  get endZone(){
    return this.#endZone;
  }

  subscribe({callback}){
    this.#subscribers.push(callback);
  }

  #updateFromWindowManager = ()=>{
    this.#scale = canvasWidth / 1000;
    const playFieldBounds =  this.#playField.setBoundaries();
    this.#bat.setBounds({playFieldBounds});
    this.#bat.scale = this.#scale;
    this.#endZone.setBounds({playFieldBounds});
  }

  init() {

    this.#windowManager.subscribe(this.#updateFromWindowManager);

    this.#playField = this.#playFieldFactory.createPlayField({});
    this.#playField.init();
    const playFieldBounds =  this.#playField.setBoundaries();

    this.#endZone = this.#endZoneFactory.createEndZone({
      fieldNumber: this.#playField.fieldNumber,
      playFieldBounds: playFieldBounds
    });

    this.#endZone.init();

    this.#bat = new Bat({
      playFieldBounds: playFieldBounds,
      stageProperties: this.#stageProperties,
      inputManager: this.#inputManager,
      controls: this.#controls,
      scale: this.#scale,
      speed: 8,
      width: playFieldBounds.width / 4,
      height: playFieldBounds.height / 70,
    });


  }

  update(){

  }

  draw(){
    //this.#playField.draw();
    this.#bat.update();
    this.#bat.draw();
  }
  
  get name() {return this.#name;}
  get personalHighScore() {return this.#personalHighScore;}
  get currentScore() {return this.#currentScore;}
  
}
