class Game {
  constructor() {
    this.player = new Player();
    this.board = new Board();
    this.rival = new Rival();
    this.ball = new Ball();
    this.musicPlayed = false;
    this.player_wins = false;
    this.rival_wins = false;

    //   this.obstacles = [];
  }

  setup() {
    this.board.setup();
    // this.ball.stop();
  }

  draw() {
    this.musicPlay();
    this.board.draw();
    this.player.draw();
    this.rival.draw();
    this.ball.draw();
    this.hitRival(this.ball, this.rival);
    this.hitPlayer(this.ball, this.player);
    ///here we will check if the ball touches the player's discoball
    if (this.targetCheckPlayer(this.ball, this.board)) {
      BALL_BREAK_SOUND.play(0, 1, 1, 0, 1.2);
      this.rival.score += 1;

      this.checkGameOver();
    }
    ///here we will check if the ball touches the rival's discoball
    if (this.targetCheckRival(this.ball, this.board)) {
      BALL_BREAK_SOUND.play(0, 1, 1, 0, 1.2);
      this.player.score += 1;
      //inside checkGameOver, we stop and relanuch the ball if next round and we stoop looping if score reached the BEST_OF value.
      this.checkGameOver();
    }
    // this.checkGameOver();
    // this.gameOver();
    this.drawScore();
    this.gameOver();
    //IF ball is stopped, we wait until 5 seconds with framecount until ball is relaunched again with a certain velocity.
    if (!this.player_wins && !this.rival_wins) {
      this.ball.relaunchBall();
    }
  }

  ///////////////////////
  ///HERE ALL METHODS///
  //////////////////////
  musicPlay() {
    if (music_on && !pauseStatus && !this.musicPlayed) {
      BACKGROUND_MUSIC.loop(1, 1, 0.3, 9, 240);
      this.musicPlayed = true;
    }
  }

  restart() {
    this.player.restart();
    this.rival.restart();
    this.ball.restart();
  }

  gameOver() {
    if (this.player_wins) {
      fill(255);
      textSize(50);
      this.ball.y_velocity = 0;
      this.ball.x_velocity = 0;
      this.ball.x = BOARD_WIDTH - BOARD_WIDTH / 2;
      this.ball.y = BOARD_HEIGHT / 2;

      text("YOU WIN!", BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);
      if (frameCount % 600 == 0) {
        console.log("im getting here");

        screen = 0;
      }
    }
    if (this.rival_wins) {
      fill(255);
      textSize(50);
      this.ball.y_velocity = 0;
      this.ball.x_velocity = 0;
      this.ball.x = BOARD_WIDTH - BOARD_WIDTH / 2;
      this.ball.y = BOARD_HEIGHT / 2;
      text("YOU LOOSE!", BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);
      if (frameCount % 600 == 0) {
        console.log("im getting here");

        screen = 0;
      }
    }
  }

  checkGameOver() {
    if (this.player.score === BEST_OF) {
      fill(255);
      textSize(50);
      text("YOU WIN!", BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);
      BACKGROUND_MUSIC.stop();
      this.player_wins = true;
      return true;
    }
    if (this.rival.score === BEST_OF) {
      fill(255);
      textSize(50);
      text("YOU LOOSE!", BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);
      BACKGROUND_MUSIC.stop();
      this.rival_wins = true;
      // noLoop();
      return true;
    }
    this.ball.stop();
    this.ball.relaunchBall();
  }

  drawScore() {
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
      FROG_SOUND.play(0, 1, 1, 0, 0.8);
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
