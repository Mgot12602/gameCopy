function preload() {
  BACK_GROUND_IMG = loadImage("/images/background.jpg");
  PLAYER = loadImage("/images/tonymanero.jpg");
  DISCO_BALL_PLAYER = loadImage("/images/discoball2.png");
  DISCO_BALL_RIVAL = loadImage("/images/discoball2.png");
  RIVAL = loadImage("/images/frog.png");
  BALL = loadImage("/images/pork.png");
  BOUNCE_SOUND = loadSound("/sounds/pork.mp3");
  BALL_BREAK_SOUND = loadSound("/sounds/glass.mp3");
  COUNTDOWN_SOUND = loadSound("/sounds/countdown.mp3");
  FROG_SOUND = loadSound("/sounds/frog.mp3");
  BACKGROUND_MUSIC = loadSound("/sounds/5th.mp3");
}

const game = new Game();

function setup() {
  createCanvas(BOARD_WIDTH, BOARD_HEIGHT);
  game.setup();
  BACKGROUND_MUSIC.loop(1, 1, 0.3, 9, 240);
}

function draw() {
  clear();
  background("cyan");
  game.draw();
}

const button = document.querySelector("button");

button.onclick = () => {
  console.log("clicking");
  game.restart();
  loop();
};

function keyPressed() {
  if (keyCode === 32) {
  }
}
