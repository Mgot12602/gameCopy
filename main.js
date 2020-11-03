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
let screen = 0; //0 is starting page //1 is game //2 is end game
let music_on = true;

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

const playAgainButton = document.getElementById("play-again");
const musicOnButton = document.getElementById("music");

playAgainButton.onclick = () => {
  console.log("clicking");
  game.restart();
  loop();
};

musicOnButton.onclick = () => {
  if (music_on === true) {
    BACKGROUND_MUSIC.stop();
    music_on = false;

    return;
  }
  console.log("Value of music on should be false", music_on);
  BACKGROUND_MUSIC.loop(1, 1, 0.3, 9, 240);
  music_on = true;
  console.log("Value of music on should be true", music_on);
};

function keyPressed() {
  if (keyCode === 32) {
  }
}
