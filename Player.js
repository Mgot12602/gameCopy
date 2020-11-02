class Player {
  constructor() {
    this.x = BOARD_WIDTH / 5;
    this.y = BOARD_HEIGHT / 2;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.gravity = 0.2;
    this.velocity = 2;
    this.floor = 210;
    this.score = 0;
    this.floor = BOARD_HEIGHT - PLAYER_HEIGHT;
    this.ceiling = 0;
    this.y_velocity = 0;
  }

  draw() {
    this.y_velocity = ((mouseY - this.y) / 60) * 5;
    // console.log(this.y_velocity);
    this.y = mouseY;

    if (this.y >= this.floor) {
      this.y = this.floor;
    }

    image(PLAYER, this.x, this.y, this.width, this.height);
  }

  restart() {
    this.score = 0;
  }
}
