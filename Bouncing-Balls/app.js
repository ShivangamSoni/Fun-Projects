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

// Shape Type
class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

// Ball Type
class Ball extends Shape {
  constructor(x, y, velX, velY, exists, size, color) {
    super(x, y, velX, velY, exists);
    this.size = size;
    this.color = color;
  }

  draw() {
    if (this.exists) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      // 2 * PI in Radian === 360 Degree
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  move() {
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
  }

  collisionDetect() {
    balls.forEach((ball) => {
      if (!(this === ball && ball.exists)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(30, 80)}%)`;
        }
      }
    });
  }
}

// Evil Type
class Evil extends Shape {
  color = "hsl(0, 0%, 100%)";
  size = 10;

  constructor(x, y, exists) {
    super(x, y, 20, 20, exists);
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }
    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    if (this.y + this.size >= height) {
      this.y -= this.size;
    }
    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }

  setControls() {
    let _this = this;

    window.addEventListener("keydown", function (e) {
      if (e.key === "a" || e.key === "ArrowLeft") {
        _this.x -= _this.velX;
      }
      if (e.key === "d" || e.key === "ArrowRight") {
        _this.x += _this.velX;
      }
      if (e.key === "w" || e.key === "ArrowUp") {
        _this.y -= _this.velY;
      }
      if (e.key === "s" || e.key === "ArrowDown") {
        _this.y += _this.velY;
      }
    });
  }

  collisionDetect() {
    balls.forEach((ball) => {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.exists = false;
      }
    });
  }
}

// Ball Count
const counterSpan = document.querySelector("#count");

// Storing & Creating Balls
const balls = [];

// while (balls.length < 50) {
//   const size = random(10, 20);
//   const ball = new Ball(
//     random(0 + size, width - size),
//     random(0 + size, height - size),
//     random(-7, 7),
//     random(-7, 7),
//     `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(30, 80)}%)`,
//     size,
//   );

//   balls.push(ball);
//   counterSpan.textContent = balls.length;
// }

let interval = setInterval(() => {
  if (balls.length == 50) {
    clearInterval(interval);
  }
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
  counterSpan.textContent = balls.length;
}, 250);

const evilCircle = new Evil(100, 100, true);
evilCircle.setControls();

// Execution Loop
function loop() {
  ctx.fillStyle = "hsla(0, 0%, 0%, .2)";
  ctx.fillRect(0, 0, width, height);

  balls.forEach((ball) => {
    ball.draw();
    ball.move();
    ball.collisionDetect();
  });

  counterSpan.textContent = balls.filter((ball) => ball.exists).length;

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  requestAnimationFrame(loop);
}

loop();
