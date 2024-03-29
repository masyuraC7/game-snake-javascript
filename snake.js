var cvs = document.getElementById('snake');
var ctx = cvs.getContext('2d');

// ukuran box
const box = 30;

// memuat background
let bg = new Image();
bg.src = "bg-snake.png";

// membuat kepala ular
let snake = [];
snake[0] = {
	x:9 * box,
	y:10 * box
};

// membuat makanan
let food = {
	x: Math.floor(Math.random()*18+1) * box,
	y: Math.floor(Math.random()*16+3) * box
};

// atur keyboard control
document.addEventListener("keydown", direction);
var alur;
var waktu = 60;

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
	ctx.drawImage(bg,0,0);

	for (var i = 0; i < snake.length; i++) {
		// warna ular
		ctx.fillStyle = (i == 0) ? "#087716" : "white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		// warna garis ular
		ctx.strokeStyle = "black";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}

	// warna makanan
	ctx.fillStyle = "#ff9800";
	ctx.fillRect(food.x,food.y,box,box);
	ctx.strokeStyle = "black";
	ctx.strokeRect(food.x,food.y,box,box);

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

		// membuat makanan baru
		food = {
			x: Math.floor(Math.random()*18+1) * box,
			y: Math.floor(Math.random()*16+3) * box
		};
	}else {
		snake.pop();
	}

	let newHead = {
		x : snakeX,
		y : snakeY
	};

	// saat menabrak batas & ekor
	if (snakeX > 18*box || snakeX < 1*box || snakeY < 3*box || snakeY > 18*box || tabrakan(newHead,snake)) {
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

	// membuat tulisan nilai
	ctx.fillStyle = "white";
	ctx.fillText("Nilai : "+nilai, 1*box, 1*box+10);
	ctx.font = "30px Arial white";

	// membuat tulisan waktu
	ctx.fillStyle = "white";
	ctx.fillText("Waktu : "+waktu, 8*box-10, 1*box+10);
	ctx.font = "30px Arial white";

	// membuat tulisan game snake
	ctx.fillStyle = "white";
	ctx.fillText("Game Snake", 14*box, 1*box+10);
	ctx.font = "30px Arial white";
}

// fungsi restart
function reload_game() {
	location.reload();
}

// hitung mundur
setTimeout(time, 1000);

// fungsi hitung mundur
function time() {
	setTimeout(time, 1000);
	waktu--;
	if (waktu < 0) {
		waktu = 0;
		clearTimeout(time);
	}
}

// pesan berakhir
function notif(val) {
	alert("Game over!!!\n"+"Nilai : "+nilai+"\nSisa waktu : "+waktu);
}

let game = setInterval(draw, 100);