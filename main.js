function preload() {
  BACK_GROUND_IMG = loadImage("/images/background.jpg");
  PLAYER = loadImage("/images/tonymanero.jpg");
  DISCO_BALL_PLAYER = loadImage("/images/discoball2.png");
  DISCO_BALL_RIVAL = loadImage("/images/discoball2.png");
  RIVAL = loadImage("/images/frog.png");
  BALL = loadImage("/images/pork.png");
  BOUNCE_SOUND = loadSound("/sounds/bounce2.mp3");
}

const game = new Game();

function setup() {
  createCanvas(BOARD_WIDTH, BOARD_HEIGHT);

  game.setup();
}

function draw() {
  clear();
  background("cyan");
  game.draw();
}

function keyPressed() {
  if (keyCode === 32) {
  }
}
