class Rival {
  constructor() {
    this.x = BOARD_WIDTH - BOARD_WIDTH / 5;
    this.y = BOARD_HEIGHT / 2;
    this.width = RIVAL_WIDTH;
    this.height = RIVAL_HEIGHT;
    // this.gravity = 0.2;
    this.velocity = 2;
    this.floor = BOARD_HEIGHT - RIVAL_HEIGHT;
    this.ceiling = 0;
    this.jumpCounts = 0;
  }

  //   jump(steps) {
  //     if (this.y <= 0 || this.jumpCounts > 1) {
  //       return;
  //     }
  //     this.y -= steps;
  //     this.velocity -= 3;
  //     this.jumpCounts += 1;
  //   }

  draw() {
    // this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= this.floor) {
      this.y = this.floor;
      this.velocity = -4;
      this.jumpCounts = 0;
    }
    if (this.y <= this.ceiling) {
      console.log("should move down");
      this.y = this.ceiling;
      this.velocity = 4;
      this.jumpCounts = 0;
    }
    image(RIVAL, this.x, this.y, this.width, this.height);
  }
}
