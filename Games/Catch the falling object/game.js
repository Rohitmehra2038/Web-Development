const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 50,
    width: 100,
    height: 30,
    speed: 7,
    color: 'green'
};

const fallingObjects = [];
const objectFrequency = 50;  // Frames between object spawns
let score = 0;
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const startScreen = document.getElementById('startScreen');
const playButton = document.getElementById('playButton');

let keys = {
    left: false,
    right: false
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
});

playButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    gameLoop(); // Start the game loop
});

function updateBasket() {
    if (keys.left) basket.x -= basket.speed;
    if (keys.right) basket.x += basket.speed;

    // Keep basket within canvas boundaries
    basket.x = Math.max(0, Math.min(basket.x, canvas.width - basket.width));
}

function drawBasket() {
    ctx.fillStyle = basket.color;
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function updateFallingObjects() {
    if (frameCount % objectFrequency === 0) {
        const objectWidth = 30 + Math.random() * 30;
        const objectHeight = 30 + Math.random() * 30;
        const objectX = Math.random() * (canvas.width - objectWidth);
        fallingObjects.push({ x: objectX, y: 0, width: objectWidth, height: objectHeight, color: 'red' });
    }

    for (let i = 0; i < fallingObjects.length; i++) {
        fallingObjects[i].y += 5;
        ctx.fillStyle = fallingObjects[i].color;
        ctx.fillRect(fallingObjects[i].x, fallingObjects[i].y, fallingObjects[i].width, fallingObjects[i].height);

        if (fallingObjects[i].y + fallingObjects[i].height > basket.y &&
            fallingObjects[i].x < basket.x + basket.width &&
            fallingObjects[i].x + fallingObjects[i].width > basket.x) {
            score += 10;
            fallingObjects.splice(i, 1); // Remove caught object
            i--; // Adjust index after removal
        }

        if (fallingObjects[i] > canvas.height) {
            endGame();
        }
    }

    fallingObjects == fallingObjects.filter(object => object.y < canvas.height);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function endGame() {
    gameOverElement.style.display = 'block';
    canvas.style.display = 'none';
    cancelAnimationFrame(animationFrameId);
}

let frameCount = 0;
let animationFrameId;

function gameLoop() {
    frameCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateBasket();
    drawBasket();
    updateFallingObjects();
    updateScore();

    animationFrameId = requestAnimationFrame(gameLoop);
}
