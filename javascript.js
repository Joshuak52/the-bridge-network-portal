const canvas = document.querySelector('.background');
const player = document.createElement('div');
player.className = 'player';
canvas.appendChild(player);

const foods = [];

// Generate random positions
function randomPosition() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    };
}

// Create food cells
for (let i = 0; i < 250; i++) {
    const food = document.createElement('div');
    food.className = 'food';
    const position = randomPosition();
    food.style.left = `${position.x}px`;
    food.style.top = `${position.y}px`;
    canvas.appendChild(food);
    foods.push(food);
}

// Move the player cell to follow the mouse
canvas.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    player.style.left = x + 'px';
    player.style.top = y + 'px';

    // Check for eating food
    for (let i = 0; i < foods.length; i++) {
        const food =
