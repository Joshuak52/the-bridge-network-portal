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
        const food = foods[i];
        if (food) {
            const foodX = food.offsetLeft;
            const foodY = food.offsetTop;
            const distance = Math.sqrt(Math.pow(x - foodX, 2) + Math.pow(y - foodY, 2));

            // Check collision with food cells
            if (distance < 20) {
                canvas.removeChild(food);
                foods[i] = null;

                // Increase player size after eating food
                const newSize = Math.min(player.offsetWidth + 1, window.innerWidth / 5);
                player.style.width = `${newSize}px`;
                player.style.height = `${newSize}px`;
            }
        }
    }
});

// Keeping the existing copyToClipboard function
function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
