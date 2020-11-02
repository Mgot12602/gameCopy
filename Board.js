class Board {
  constructor() {
    // this.x = 0;
    this.player_target_start_x = BOARD_WIDTH / 10 - 50;
    this.player_target_start_y = 0;
    this.player_target_height = 80;
    this.player_target_width = 100;
    this.rival_target_start_x = BOARD_WIDTH - BOARD_WIDTH / 10 - 50;
    this.rival_target_start_y = 0;
    this.rival_target_height = 80;
    this.rival_target_width = 100;
  }

  setup() {
    this.height = height;
    this.width = width;
  }

  draw() {
    // this.x -= 1;
    image(BACK_GROUND_IMG, 0, 0, BOARD_WIDTH, BOARD_HEIGHT + 40);
    image(
      DISCO_BALL_PLAYER,
      this.player_target_start_x,
      this.player_target_start_y,
      this.player_target_width,
      this.player_target_height
    );
    image(
      DISCO_BALL_RIVAL,
      this.rival_target_start_x,
      this.rival_target_start_y,
      this.rival_target_width,
      this.rival_target_height
    );
    // imag(DISCO_BALL_RIVAL, 0, 0, this.width, this.height);
    // image(bgImage, this.x + this.width, 0, this.width + 10, this.height + 20);

    // if (this.x <= -this.width - 10) {
    //   this.x = 0;
    // }
  }
}
