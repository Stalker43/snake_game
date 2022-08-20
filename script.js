// загрузка холста
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
// загрузка поля
const ground = new Image();
ground.src = "img/ground.png";
// загрузка поля
const foodImg = new Image();
foodImg.src = "img/food.png";
// ячейки поля
let box = 32;
// очки
let score = 0;
// появления еды
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};
// появления еды
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
// управления змейки
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
}
// функция сьедания хвоста
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
  }
}
// отоброжение всей игры
function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "darkgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  // появления доп хвоста после поедания еды
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
  // перезапуск игры при столкновении с стенной
  if (snakeX < box || snakeX > box * 17 || snakeY < box || snakeY > 17 * box)
    clearInterval(game);

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;
  // появления нового хвоста
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}
// обновление картинки
let game = setInterval(drawGame, 160);
