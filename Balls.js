let gameManager;
let inputManager;
let windowManager;
let game;
let gameFont;
let canvasHeight;
let canvasWidth;

function preload() {
  gameFont = loadFont('/assets/fonts/Barriecito-Regular.ttf');
}

function setup() {
  textFont(gameFont);
  windowManager = new WindowManager();
  inputManager = new InputManager();
  gameManager = new GameManager({
    inputManager,
    windowManager
  });
  gameManager.init();
  gameManager.setupGame();
  game = gameManager.getGame();
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

