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
  }
  // colisionCheck(obstacle, player) {
  //   if (player.x + player.width < obstacle.x) {
  //     return false;
  //   }
  //   if (player.x > obstacle.x + obstacle.width) {
  //     return false;
  //   }
  //   if (player.y > obstacle.y + obstacle.height) {
  //     return false;
  //   }
  //   if (obstacle.y > player.y + player.height) {
  //     return false;
  //   }
  //   return true;
  // }
  hitRival(ball, rival) {
    if (
      ball.x + BALL_WIDTH >= rival.x &&
      ball.x + BALL_WIDTH < rival.x + RIVAL_WIDTH &&
      ball.y >= rival.y &&
      ball.y <= rival.y + RIVAL_HEIGHT
    ) {
      ball.x = rival.x - BALL_WIDTH;
      ball.x_velocity = -ball.x_velocity;
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
      ball.x_velocity = -ball.x_velocity;
      ball.y_velocity += player.y_velocity;
    }
  }
}
