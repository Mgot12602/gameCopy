class StartScreen {
  constructor() {}
  musicPlay() {
    // console.log(this.musicPlayed);
    if (music_on && !pauseStatus && !INTRO_MUSIC_PLAYED) {
      INTRO_MUSIC.loop(0, 1, 0.3, 20);
      INTRO_MUSIC_PLAYED = true;
    }
  }
  // musicStop() {
  //   BACKGROUND_MUSIC.stop();
  // }

  setup() {
    this.height = height;
    this.width = width;
    playButton = createButton("PLAY!");
    playButton.mouseClicked(this.play);
    playButton.size(200, 100);
    playButton.position(BOARD_WIDTH - 170, BOARD_HEIGHT / 2 - 100);
    playButton.style("font-family", "Bodoni");
    playButton.style("font-size", "48px");
  }
  play() {
    INTRO_MUSIC_PLAYED = false;

    screen = 1;
    playButton.hide();

    INTRO_MUSIC.stop();
  }

  draw() {
    this.musicPlay();

    image(START_BACKGROUND_IMG, 0, 0, 500, 730);
    playButton.show();
    this.bestScore();
  }

  bestScore() {
    fill(255);
    textSize(40);
    text(
      `Your best score is ${getItem("bestScore")}`,
      BOARD_WIDTH / 2 + 50,
      BOARD_HEIGHT / 2 + 100
    );
  }
}
