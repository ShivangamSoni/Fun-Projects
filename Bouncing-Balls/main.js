// Setup Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Random Number Generator
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Ball Type/Model
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// draw() Method to Draw the Ball on Canvas
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  // 2 * PI in Radian === 360 Degree
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// move() Method to Move the Ball across the Canvas
Ball.prototype.move = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }
  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }
  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// collisionDetect() Method to Change Color When Balls Hit Each Other
Ball.prototype.collisionDetect = function () {
  balls.forEach((ball) => {
    if (!(this === ball)) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dy + dy * dx);

      if (distance < this.size + ball.size) {
        ball.color = this.color = `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(30, 80)}%)`;
      }
    }
  });
};

// Storing & Creating Balls
const balls = [];

while (balls.length < 30) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(30, 80)}%)`,
    size,
  );

  balls.push(ball);
}

// Execution Loop
function loop() {
  ctx.fillStyle = "hsla(0, 0%, 0%, 0.25)";
  ctx.fillRect(0, 0, width, height);

  balls.forEach((ball) => {
    ball.draw();
    ball.move();
    ball.collisionDetect();
  });

  requestAnimationFrame(loop);
}

loop();
