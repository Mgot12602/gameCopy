class Game {
  constructor() {
    this.player = new Player();
    this.board = new Board();
    this.rival = new Rival();
    this.ball = new Ball();

    //   this.obstacles = [];
  }

  setup() {
    this.board.setup();
  }

  draw() {
    this.board.draw();
    this.player.draw();
    this.rival.draw();
    this.ball.draw();
    this.hitRival(this.ball, this.rival);
    this.hitPlayer(this.ball, this.player);
    ///here we will check if the ball touches the player's discoball
    if (this.targetCheckPlayer(this.ball, this.board)) {
      // noLoop();
      this.rival.score += 1;
      this.updateScore();
      this.checkGameOver();
      this.ball.stop();
      console.log(`Rival got ${this.rival.score} point`);
    }
    ///here we will check if the ball touches the rival's discoball
    if (this.targetCheckRival(this.ball, this.board)) {
      // noLoop();
      this.player.score += 1;
      this.updateScore();
      this.checkGameOver();
      this.ball.stop();

      console.log(`Player got ${this.player.score} point`);
    }

    // this.UpdateScore();

    //   if (frameCount % 120 === 0) {
    //     this.obstacles.push(new Obstacle());
    //   }
    //   this.obstacles.forEach((obstacle, index) => {
    //     obstacle.draw();
    //     if (obstacle.x + obstacle.width < 0) {
    //       this.obstacles.splice(index, 1);
    //     }
    //     if (this.colisionCheck(obstacle, this.player)) {
    //       noLoop();
    //       console.log("ohu");
    //     }
    //   });
    this.updateScore();
    this.ball.relaunch();
  }

  checkGameOver() {
    if (this.player.score === BEST_OF) {
      fill(255);
      textSize(50);
      text("YOU WIN!", BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);

      noLoop();
    }
    if (this.rival.score === BEST_OF) {
      fill(255);
      textSize(50);
      text("YOU LOOSE!", BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);

      noLoop();
    }
  }

  updateScore() {
    fill(255);
    textSize(25);
    text(`YOU: ${this.player.score}`, BOARD_WIDTH / 2 - 200, 25);
    fill(255);
    textSize(25);
    text(`FROGGY:  ${this.rival.score}`, BOARD_WIDTH / 2 + 100, 25);
  }
  targetCheckPlayer(ball, board) {
    if (
      ball.x <=
        board.player_target_start_x +
          board.player_target_width -
          TARGET_OFFSET &&
      ball.x > board.player_target_start_x &&
      ball.y >= board.player_target_start_y &&
      ball.y <= board.player_target_start_y + board.player_target_height
    ) {
      return true;
    }
  }
  targetCheckRival(ball, board) {
    if (
      ball.x + BALL_WIDTH >= board.rival_target_start_x + TARGET_OFFSET &&
      ball.x + BALL_WIDTH <
        board.rival_target_start_x + board.rival_target_width &&
      ball.y >= board.rival_target_start_y &&
      ball.y <= board.rival_target_start_y + board.rival_target_height
    ) {
      console.log("Player win");
      return true;
    }
  }
  hitRival(ball, rival) {
    if (
      ball.x + BALL_WIDTH >= rival.x &&
      ball.x + BALL_WIDTH < rival.x + RIVAL_WIDTH &&
      ball.y >= rival.y &&
      ball.y <= rival.y + RIVAL_HEIGHT
    ) {
      ball.x = rival.x - BALL_WIDTH;
      ball.x_velocity = -ball.x_velocity - 1 / 10;
      ball.y_velocity += rival.velocity;
    }
  }
  hitPlayer(ball, player) {
    if (
      ball.x <= player.x + PLAYER_WIDTH &&
      ball.x > player.x &&
      ball.y >= player.y &&
      ball.y <= player.y + PLAYER_HEIGHT
    ) {
      ball.x = player.x + PLAYER_WIDTH;
      ball.x_velocity = -ball.x_velocity + 1 / 10;
      ball.y_velocity += player.y_velocity;
    }
  }
}
