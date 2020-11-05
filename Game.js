class Game {
  constructor() {
    this.player = new Player();
    this.board = new Board();
    this.rival = new Rival();
    this.ball = new Ball();
    this.musicPlayed = false;
    this.player_wins = false;
    this.rival_wins = false;
    this.isGameOver = false;
    this.levelUp = false;
    this.isFirstLoopOfNewGame = true;
  }

  setup() {
    this.board.setup();
  }

  draw() {
    this.setGame();
    this.board.draw();
    this.player.draw();
    this.rival.draw();
    this.ball.draw();
    this.hitTheBall();
    this.targetCheck(); ///here we will check if the ball touches the player's discoball
    this.drawScore();
    this.restartBall();
    //IF ball is stopped, we wait until 5 seconds with framecount until ball is relaunched again with a certain velocity.

    this.gameOver();
  }

  ///////////////////////
  ///HERE ALL METHODS///
  //////////////////////

  restartBall() {
    if (SET_FOR_NEW_ROUND) {
      this.ball.stop();
      this.ball.relaunchBall();
      if (SHOW_LEVEL_UP === true) {
        this.drawLevelUp();
      }
    }
  }

  setGame() {
    if (this.isFirstLoopOfNewGame) {
      this.isGameOver = false;
      this.player.restart();
      this.rival.restart();
      this.player_wins = false;
      this.rival_wins = false;
      this.musicPlayed = false;
      SET_FOR_NEW_ROUND = true;
      this.musicPlay();
      this.isFirstLoopOfNewGame = false;
      ROUND = 1;
      CURRENT_SCORE = 0;
      DIFFICULTY = 1;
    }
  }
  hitTheBall() {
    this.hitRival(this.ball, this.rival);
    this.hitPlayer(this.ball, this.player);
  }

  targetCheck() {
    if (!SET_FOR_NEW_ROUND) {
      if (this.targetCheckPlayer(this.ball, this.board)) {
        BALL_BREAK_SOUND.play(0, 1, 1, 0, 1.2);
        this.rival.score += 1;
        // this.hasTouchedTarget = true;

        this.checkGameOver();
      }

      ///here we will check if the ball touches the rival's discoball
      if (this.targetCheckRival(this.ball, this.board)) {
        BALL_BREAK_SOUND.play(0, 1, 1, 0, 1.2);
        this.player.score += 1;
        SHOW_LEVEL_UP = true;
        CURRENT_SCORE += 10 * DIFFICULTY;
        DIFFICULTY++;
        console.log(CURRENT_SCORE);
        //inside checkGameOver, we stop and relanuch the ball if next round and we stoop looping if score reached the BEST_OF value.
        this.checkGameOver();
      }
    }
  }

  checkGameOver() {
    if (this.player.score === BEST_OF) {
      this.player_wins = true;
      this.isGameOver = true;
      YOU_WIN.play();
      START_SOUND.play(0, 1, 0.2, 1);
      BACKGROUND_MUSIC.stop();
      return;
    }
    if (this.rival.score === BEST_OF) {
      this.rival_wins = true;
      this.isGameOver = true;
      YOU_LOOSE.play();
      return;
    }

    ROUND++;
    console.log(ROUND);
    SET_FOR_NEW_ROUND = true;
  }

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
    if (this.isGameOver) {
      this.ball.y_velocity = 0;
      this.ball.x_velocity = 0;
      this.ball.x = BOARD_WIDTH - BOARD_WIDTH / 2;
      this.ball.y = BOARD_HEIGHT / 2;

      if (this.player_wins) {
        this.winnerLooserMsg("YOU WIN !");
      }
      if (this.rival_wins) {
        this.winnerLooserMsg("YOU LOOSE !");
      }
      if (frameCount % 600 == 0) {
        this.setToDefaultBeforeLeaving();
        if (CURRENT_SCORE > SAVED_SCORE) {
          storeItem("bestScore", CURRENT_SCORE);
          alert("NEW BEST SCORE!");
        }
        screen = 0; //back to main menu
        INTRO_MUSIC_PLAYED = false;
      }
    }
  }
  setToDefaultBeforeLeaving() {
    this.isFirstLoopOfNewGame = true;
    BACKGROUND_MUSIC.stop();
  }

  winnerLooserMsg(message) {
    fill(255);
    textSize(50);
    text(message, BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2);
  }

  newRound() {
    if (this.hasTouchedTarget && !this.isGameOver) {
    }
  }

  drawLevelUp() {
    fill(255);
    textSize(50);
    text(`LEVEL UP!`, BOARD_WIDTH / 2 - 100, BOARD_HEIGHT / 2 - 100);
  }

  drawScore() {
    fill(255);
    textSize(25);
    text(`YOU: ${this.player.score} / ${BEST_OF}`, BOARD_WIDTH / 2 - 200, 25);
    fill(255);
    textSize(25);
    text(
      `FROGGY:  ${this.rival.score} / ${BEST_OF}`,
      BOARD_WIDTH / 2 + 100,
      25
    );
    fill(255);
    textSize(25);
    text(`SCORE:  ${CURRENT_SCORE}`, 50, BOARD_HEIGHT - 20);
    fill(255);
    textSize(25);
    text(`LEVEL:  ${DIFFICULTY}`, BOARD_WIDTH - 200, BOARD_HEIGHT - 20);
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
    return false;
  }
  targetCheckRival(ball, board) {
    if (
      ball.x + BALL_WIDTH >= board.rival_target_start_x + TARGET_OFFSET &&
      ball.x + BALL_WIDTH <
        board.rival_target_start_x + board.rival_target_width &&
      ball.y >= board.rival_target_start_y &&
      ball.y <= board.rival_target_start_y + board.rival_target_height
    ) {
      return true;
    }
    return false;
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
