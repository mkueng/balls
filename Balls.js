let gameManager;
let inputManager;
let windowManager;
let game;
let gameFont;
let canvasHeight;
let canvasWidth;
let assetManager = new AssetManager();

function preload() {
  gameFont = loadFont('/assets/fonts/Barriecito-Regular.ttf');
  assetManager.loadImage('clouds');

}

function setup() {
  textFont(gameFont);
  windowManager = new WindowManager();
  inputManager = new InputManager();
  gameManager = new GameManager({
    assetManager,
    inputManager,
    windowManager
  });
  gameManager.init();
  game = gameManager.initGame();
}

function draw() {
  game.draw();
}

function keyPressed() {
  inputManager.keyPressed(keyCode);
}

function keyReleased(){
  inputManager.keyReleased(keyCode);
}

function windowResized() {
  windowManager.resize();
}

