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
  #endZoneFactory;
  #controls;
  #subscribers;
  #scaleFactor;
  #endZone;

  constructor({
                stageProperties,
                inputManager,
                name,
                personalHighScore,
                avatar,
                playerNumber,
                windowManager,
                playFieldFactory,
                endZoneFactory,
                controls
  }){
    this.#stageProperties = stageProperties;
    this.#inputManager = inputManager;
    this.#windowManager = windowManager;
    this.#playFieldFactory = playFieldFactory;
    this.#endZoneFactory = endZoneFactory;
    this.#name = name ?? "player";
    this.#personalHighScore = personalHighScore ?? "0";
    this.#avatar = avatar ?? null;
    this.#currentScore = 0;
    this.#playerNumber = playerNumber;
    this.#controls = controls ?? [];
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

  get endZone(){
    return this.#endZone;
  }

  subscribe({callback}){
    this.#subscribers.push(callback);
  }

  #updateFromWindowManager = ()=>{
    const playFieldBounds =  this.#playField.setBoundaries();
    this.#bat.setBounds({playFieldBounds});
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
      controls: this.#controls
    });

    this.#bat.init();
    this.#bat.setBounds({playFieldBounds});
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
