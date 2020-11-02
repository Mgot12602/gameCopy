class Ball {
  constructor() {
    this.x = BOARD_WIDTH - BOARD_WIDTH / 2;
    this.y = BOARD_HEIGHT / 2;
    this.width = BALL_HEIGHT;
    this.height = BALL_HEIGHT;
    // this.gravity = 0.2;
    // this.ball_speed = 5;
    this.y_velocity = 6;
    this.x_velocity = 6;

    this.floor = BOARD_HEIGHT - BALL_HEIGHT;
    this.ceiling = 0;

    this.left_wall = 0;
    this.right_wall = BOARD_WIDTH - BALL_WIDTH;
    this.stop_state = false;
  }

  //   jump(steps) {
  //     if (this.y <= 0 || this.jumpCounts > 1) {
  //       return;
  //     }
  //     this.y -= steps;
  //     this.velocity -= 3;
  //     this.jumpCounts += 1;
  //   }
  stop() {
    this.x = BOARD_WIDTH - BOARD_WIDTH / 2;
    this.y = BOARD_HEIGHT / 2;
    // this.ball_speed = 5;
    this.y_velocity = 0;
    this.x_velocity = 0;
    // if(frameCount %300===0){
    // this.y_velocity = 6;
    // this.x_velocity = 6;
    // }
    this.stop_state = true;
    return this.stop_state;
  }
  relaunch() {
    if (this.stop_state && frameCount % 300 == 0) {
      console.log(frameCount);
      this.stop_state = false;
      this.x_velocity = -6;
      this.y_velocity = 6;
    }
  }

  draw() {
    // this.velocity += this.gravity;
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    // console.log("this.x = ", this.x);
    if (this.y >= this.floor) {
      this.y = this.floor;
      this.y_velocity = -this.y_velocity;
      this.jumpCounts = 0;
    }
    if (this.y <= this.ceiling) {
      this.y = this.ceiling;
      this.y_velocity = -this.y_velocity;
      this.jumpCounts = 0;
    }
    if (this.x <= this.left_wall) {
      this.x = this.left_wall;
      this.x_velocity = -this.x_velocity;
      this.jumpCounts = 0;
    }
    if (this.x >= this.right_wall) {
      this.x = this.right_wall;
      this.x_velocity = -this.x_velocity;
      this.jumpCounts = 0;
    }
    image(BALL, this.x, this.y, this.width, this.height);
  }
}
