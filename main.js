
// настройки для canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// для настройки шаров

var rangSize = document.querySelector('.size-ball');
var rangNum = document.querySelector('.num-ball');
var speedNum = document.querySelector('.speed-ball');
var colorNum = document.querySelector('.color-ball');

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


//  конструктор для мячей

/**
 * 
 * @param {int} x           координата x
 * @param {int} y           координата  y
 * @param {int} velX        горизонтальная скорость мяча
 * @param {int} velY        верттикальная скорость мяча
 * @param {string} color    цвет мяча
 * @param {int} size        размер мяча - радиус в px
 */

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

// функция для рисования мячей

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

// функчия для перемещения шара, здезь же граничные условия

  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }


  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        if (balls[j]) {
          var dx = this.x - balls[j].x;
          var dy = this.y - balls[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + balls[j].size) {
            balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
          }
        }
        
      }
    }
  }
// анимация мяча

var balls = [];
var num = 10; // начальное количество шаров

function loop() {
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
   
    while (balls.length < num) {
      var ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
      );
      balls.push(ball);
    }
  
    for (let i = 0; i < balls.length; i++) {
      if (balls[i]) {
        balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      }
      
    }
  
    requestAnimationFrame(loop);
    
  }

  // Меняем размер шаров в зависимости от range.value
  rangSize.addEventListener('change', function(event){
    console.log(event.target.value)
    let maxSize = event.target.value;
    
    balls.forEach(function(ball) {
      ball.size = random(10,maxSize);
    })
  })

// Удаляем и добавляем шары в зависимости от range.value
rangNum.addEventListener('change', function(event){
   num = event.target.value;
  if (balls.length > num) {
    let dnum = balls.length - num;
    console.log(dnum)
    for (let i = 0; i<=dnum; i++) {
      balls.splice(i);
    }
  } else if (balls.length < num) {
    let dnum = num - balls.length;
    console.log(num)
    for (let i = 0; i<=dnum; i++) {
      let ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
      );
      balls.push(ball);
    }

  }
})
// Меняем скорость в зависимости от range.value
speedNum.addEventListener('change', function(event){
  let maxSize = event.target.value;
  balls.forEach(function(ball) {
    ball.velX = random(-maxSize, maxSize);
    ball.velY = random(-maxSize, maxSize);
  })
})
// Меняем цвет в зависимости от range.value
colorNum.addEventListener('change', function(event){
  let maxSize = event.target.value;
  balls.forEach(function(ball) {
    ball.color = 'rgb(' + random(0,maxSize) + ',' + random(0,maxSize) + ',' + random(0,maxSize) +')'
  })
})

// запуск шаров
  loop();

// для кномок меню
const close = document.querySelector('.cls-btn');
const inputWrp = document.querySelector('.input-wrp');
const showtWrp = document.querySelector('.show-btn');

showtWrp.addEventListener("click", function () {
  inputWrp.classList.toggle("active")
  showtWrp.classList.toggle("active")

})

close.addEventListener("click", function () {
  inputWrp.classList.toggle("active")
  showtWrp.classList.toggle("active")

})
