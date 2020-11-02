class Rival {
  constructor() {
    this.x = BOARD_WIDTH - BOARD_WIDTH / 5;
    this.y = BOARD_HEIGHT / 2;
    this.width = RIVAL_WIDTH;
    this.height = RIVAL_HEIGHT;
    this.score = 0;
    this.velocity = 2;
    this.floor = BOARD_HEIGHT - RIVAL_HEIGHT;
    this.ceiling = 0;
  }

  draw() {
    this.y += this.velocity;

    if (this.y >= this.floor) {
      this.y = this.floor;
      this.velocity = -4;
    }
    if (this.y <= this.ceiling) {
      // console.log("should move down");
      this.y = this.ceiling;
      this.velocity = 4;
    }
    image(RIVAL, this.x, this.y, this.width, this.height);
  }
}
