class Board {
  constructor() {
    // this.x = 0;
  }

  setup() {
    this.height = height;
    this.width = width;
  }

  draw() {
    // this.x -= 1;
    image(BACK_GROUND_IMG, 0, 0, this.width, this.height + 40);
    image(DISCO_BALL_PLAYER, BOARD_WIDTH / 10, 0, 100, 80);
    image(DISCO_BALL_RIVAL, BOARD_WIDTH - BOARD_WIDTH / 10, 0, 100, 80);
    // imag(DISCO_BALL_RIVAL, 0, 0, this.width, this.height);
    // image(bgImage, this.x + this.width, 0, this.width + 10, this.height + 20);

    // if (this.x <= -this.width - 10) {
    //   this.x = 0;
    // }
  }
}
