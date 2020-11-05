function preload() {
  BACK_GROUND_IMG = loadImage("./images/background.jpg");
  PLAYER = loadImage("./images/tonymanero.jpg");
  DISCO_BALL_PLAYER = loadImage("./images/discoball2.png");
  DISCO_BALL_RIVAL = loadImage("./images/discoball2.png");
  RIVAL = loadImage("./images/frog.png");
  BALL = loadImage("./images/pork.png");
  BOUNCE_SOUND = loadSound("./sounds/pork.mp3");
  BALL_BREAK_SOUND = loadSound("./sounds/glass.mp3");
  COUNTDOWN_SOUND = loadSound("./sounds/countdown.mp3");
  FROG_SOUND = loadSound("./sounds/frog.mp3");
  BACKGROUND_MUSIC = loadSound("./sounds/5th.mp3");
  START_BACKGROUND_IMG = loadImage("./images/travolta.png");
  INTRO_MUSIC = loadSound("./sounds/shinydisco.mp3");
  YOU_WIN = loadSound("./sounds/you-win.mp3");
  YOU_LOOSE = loadSound("./sounds/you-loose.mp3");
  START_SOUND = loadSound("./sounds/start.mp3");
}

const game = new Game();
const startScreen = new StartScreen();
let screen = 0; //0 is starting page //1 is game //2 is end game
let music_on = true;
let pauseStatus = false;

function setup() {
  let canvas = createCanvas(BOARD_WIDTH, BOARD_HEIGHT);
  canvas.parent("canvas-holder");
  startScreen.setup();
  game.setup();
  SAVED_SCORE = getItem("bestScore");
  if (SAVED_SCORE == null) {
    SAVED_SCORE = 0;
    storeItem("bestScore", SAVED_SCORE);
  }
}

function draw() {
  clear();
  background("black");
  switch (screen) {
    case 0:
      // console.log(screen);
      startScreen.draw();
      return;
    case 1:
      clear();

      // console.log("am playing the game???");
      // console.log(screen);
      game.draw();
      return;
  }
}

const playAgainButton = document.getElementById("play-again");
const musicOnButton = document.getElementById("music");

playAgainButton.onclick = () => {
  if (screen == 1) {
    console.log("clicking");
    game.restart();
    loop();
  }
};

musicOnButton.onclick = () => {
  if (music_on) {
    BACKGROUND_MUSIC.stop();
    INTRO_MUSIC.stop();
    music_on = false;
    console.log("Value of music on should be false", music_on);
    return;
  }
  switch (screen) {
    case 0:
      INTRO_MUSIC.loop(1, 1, 0.3, 9, 240);
      music_on = true;
      console.log("Value of music on should be true", music_on);
      return;
    case 1:
      BACKGROUND_MUSIC.loop(1, 1, 0.3, 9, 240);
      music_on = true;
      console.log("Value of music on should be true", music_on);
  }
};

function keyPressed() {
  //If we press spacebar during the game (screen==1), we pause.
  if (keyCode === 32 && screen == 1) {
    if (pauseStatus) {
      // loop();
      pauseStatus = false;
      if (music_on) {
        //seems this is not working...
        BACKGROUND_MUSIC.loop(1, 1, 0.3, 9, 240);
      }
      return;
    }
    noLoop();
    BACKGROUND_MUSIC.stop();
    pauseStatus = true;
  }
}
