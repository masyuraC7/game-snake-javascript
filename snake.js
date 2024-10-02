let game;

var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");
var snake_score = document.getElementById("score");
var snake_time = document.getElementById("time");

// ukuran box
const box = 30;

// membuat kepala ular
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// membuat makanan
let food = {
  x: Math.floor(Math.random() * 39 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// atur keyboard control
document.addEventListener("keydown", direction);
var alur;
var waktu = 60;
snake_time.innerHTML = waktu;

function direction(e) {
  var key = e.keyCode;

  if (key == 37 && alur != "RIGHT") alur = "LEFT";
  else if (key == 38 && alur != "DOWN") alur = "UP";
  else if (key == 39 && alur != "LEFT") alur = "RIGHT";
  else if (key == 40 && alur != "UP") alur = "DOWN";
}

// nilai awal
var nilai = 0;

// cek saat tabrakan dengan ekor
function tabrakan(head, body) {
  for (var i = 0; i < body.length; i++) {
    if (head.x == body[i].x && head.y == body[i].y) return true;
  }

  return false;
}

function draw() {
  // menggambar background
  const cellSize = 30;
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 16; j++) {
      const color = (i + j) % 2 === 0 ? "#36c2ce" : "white";
      ctx.fillStyle = color;
      ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }

  for (var i = 0; i < snake.length; i++) {
    // warna ular
    ctx.fillStyle = i == 0 ? "#478CCF" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    // warna garis ular
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // warna makanan
  ctx.fillStyle = "#ff9800";
  ctx.fillRect(food.x, food.y, box, box);
  ctx.strokeStyle = "black";
  ctx.strokeRect(food.x, food.y, box, box);

  // kepala ular lama
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // atur gerakan ular
  if (alur == "LEFT") snakeX -= box;
  else if (alur == "UP") snakeY -= box;
  else if (alur == "RIGHT") snakeX += box;
  else if (alur == "DOWN") snakeY += box;

  // saat menabrak makanan
  if (snakeX == food.x && snakeY == food.y) {
    // nilai bertambah
    nilai++;
    snake_score.innerHTML = nilai;

    // membuat makanan baru
    food = {
      x: Math.floor(Math.random() * 39 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // saat menabrak batas & ekor
  if (
    snakeX > 39 * box ||
    snakeX < 0 * box ||
    snakeY < 0 * box ||
    snakeY > 15 * box ||
    tabrakan(newHead, snake)
  ) {
    // menghentikan game
    clearInterval(game);

    setTimeout(notif, 100);
  }

  snake.unshift(newHead);

  // cek waktu habis
  if (waktu == 0) {
    clearInterval(game);

    setTimeout(notif, 100);
  }
}

// fungsi restart
function reload_game() {
  location.reload();

  document.getElementById("btn-start").style.display = "block";
}

const snake_timeout = setTimeout(time, 1000);

function start_game() {
  game = setInterval(draw, 100);

  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-restart").style.display = "block";
}

// fungsi hitung mundur
function time() {
  setTimeout(time, 1000);
  waktu--;
  snake_time.innerHTML = waktu;
  if (waktu < 0) {
    waktu = 0;
    clearTimeout(time);
  }
}

// pesan berakhir
function notif(val) {
  alert("Game over!!!\n" + "Nilai : " + nilai + "\nSisa waktu : " + waktu);
}
