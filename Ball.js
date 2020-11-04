class Ball {
  constructor() {
    this.x = BOARD_WIDTH - BOARD_WIDTH / 2;
    this.y = BOARD_HEIGHT / 2;
    this.width = BALL_HEIGHT;
    this.height = BALL_HEIGHT;

    this.y_velocity = 6;
    this.x_velocity = 6;

    this.floor = BOARD_HEIGHT - BALL_HEIGHT;
    this.ceiling = 0;

    this.left_wall = 0;
    this.right_wall = BOARD_WIDTH - BALL_WIDTH;
    this.stop_state = false;
    this.isFirstLoopOfStop = true;
  }

  restart() {
    this.stop();
    this.relaunchBall();
  }

  stop() {
    if (this.isFirstLoopOfStop) {
      this.x = BOARD_WIDTH - BOARD_WIDTH / 2;
      this.y = BOARD_HEIGHT / 2;
      this.y_velocity = 0;
      this.x_velocity = 0;

      this.stop_state = true;
      COUNTDOWN_SOUND.play(0.5, 1, 0.5, 0, 3);

      this.isFirstLoopOfStop = false;
      return this.stop_state;
    }
  }
  relaunchBall() {
    //use this function to set the ball in the middle and wait for 5 seconds until relaunch the ball with a velocity.

    if (frameCount % 300 == 0) {
      this.stop_state = false;
      this.x_velocity = -6;
      this.y_velocity = 6;
      SET_FOR_NEW_ROUND = false;
      this.isFirstLoopOfStop = true;
      BOUNCE_SOUND.play(0, 1, 1, 0, 1.2);
    }
  }

  draw() {
    this.x += this.x_velocity;
    this.y += this.y_velocity;

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
