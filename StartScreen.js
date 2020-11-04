class StartScreen {
  constructor() {
    this.musicPlayed = false;
  }
  musicPlay() {
    console.log(this.musicPlayed);
    if (music_on && !pauseStatus && !this.musicPlayed) {
      INTRO_MUSIC.loop(0, 1, 0.3, 20);
      this.musicPlayed = true;
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
    screen = 1;
    playButton.hide();
    console.log("playbutton should be hidden");
    INTRO_MUSIC.stop();
  }

  draw() {
    this.musicPlay();
    image(START_BACKGROUND_IMG, 0, 0, 500, 730);
    playButton.show();
  }
}
