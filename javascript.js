const canvas = document.querySelector('.background');
const player = document.createElement('div');
player.className = 'player';
canvas.appendChild(player);

const foods = [];
let mouseX = 0; // Mouse X coordinate
let mouseY = 0; // Mouse Y coordinate

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

    // Adding random delay factor for food animation
    food.style.setProperty('--animation-delay-factor', Math.random());
}

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate() {
    const currentX = parseFloat(player.style.left || 0);
    const currentY = parseFloat(player.style.top || 0);

    const deltaX = mouseX - currentX;
    const deltaY = mouseY - currentY;

    player.style.left = `${currentX + deltaX * 0.02}px`; // Adjusted for 80% slower movement
    player.style.top = `${currentY + deltaY * 0.02}px`;

    // Check for eating food
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        if (food) {
            const foodX = food.offsetLeft + food.offsetWidth / 2;
            const foodY = food.offsetTop + food.offsetHeight / 2;
            const distance = Math.sqrt(Math.pow(mouseX - foodX, 2) + Math.pow(mouseY - foodY, 2));

            // Check collision with food cells
            if (distance < (player.offsetWidth / 2 + food.offsetWidth / 2)) {
                canvas.removeChild(food);
                foods[i] = null;

                // Increase player size after eating food
                const newSize = Math.min(player.offsetWidth + 1, window.innerWidth / 5);
                player.style.width = `${newSize}px`;
                player.style.height = `${newSize}px`;
            }
        }
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}

document.getElementById('startGame').addEventListener('click', function(event) {
    event.preventDefault();

    document.querySelector('.container .server-logo').style.display = 'none';
    document.querySelector('.container .ip-box').style.display = 'none';
    document.querySelector('.container .instruction').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    document.querySelectorAll('.container .discord-button').forEach(btn => btn.style.display = 'none');
});
