const canvas = document.querySelector('.background');

// Player Dot
const player = document.createElement('div');
player.className = 'player';
player.style.display = 'none'; // Hidden by default
player.style.left = `${window.innerWidth / 2}px`; // Start at the center
player.style.top = `${window.innerHeight / 2}px`; 
canvas.appendChild(player);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function randomPosition() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    };
}

// Create food cells
const foods = [];
for (let i = 0; i < 250; i++) {
    const food = document.createElement('div');
    food.className = 'food';
    const position = randomPosition();
    food.style.left = `${position.x}px`;
    food.style.top = `${position.y}px`;
    canvas.appendChild(food);
    foods.push(food);
}

// Mouse Movement
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate() {
    const currentX = parseFloat(player.style.left || 0);
    const currentY = parseFloat(player.style.top || 0);

    const deltaX = (mouseX - currentX) * 0.2; // 20% movement
    const deltaY = (mouseY - currentY) * 0.2;

    player.style.left = `${currentX + deltaX}px`;
    player.style.top = `${currentY + deltaY}px`;

    // Food collision and consumption
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        if (food) {
            const playerCenterX = parseFloat(player.style.left) + player.offsetWidth / 2;
            const playerCenterY = parseFloat(player.style.top) + player.offsetHeight / 2;

            const foodX = food.offsetLeft + food.offsetWidth / 2;
            const foodY = food.offsetTop + food.offsetHeight / 2;
            const distance = Math.sqrt(Math.pow(playerCenterX - foodX, 2) + Math.pow(playerCenterY - foodY, 2));

            if (distance < (player.offsetWidth / 2 + food.offsetWidth / 2)) {
                canvas.removeChild(food);
                foods[i] = null;

                const newSize = Math.min(player.offsetWidth + 1, window.innerWidth / 5);
                player.style.width = `${newSize}px`;
                player.style.height = `${newSize}px`;
            }
        }
    }

    requestAnimationFrame(animate);
}

const usernameModal = document.getElementById('usernameModal');
const playBtn = document.getElementById('playBtn');
const cancelBtn = document.getElementById('cancelBtn');

document.getElementById('startGame').addEventListener('click', function(event) {
    event.preventDefault();
    usernameModal.style.display = 'block';
});

playBtn.addEventListener('click', function() {
    const playerName = document.getElementById('username').value.trim();

    if (playerName) {
        usernameModal.style.display = 'none';
        player.style.display = 'block';
        document.querySelector('.container .server-logo').style.display = 'none';
        document.querySelector('.container .ip-box').style.display = 'none';
        document.querySelector('.container .instruction').style.display = 'none';
        document.getElementById('startGame').style.display = 'none';
        document.querySelector('.container .discord-button').style.display = 'none';

        requestAnimationFrame(animate);
    } else {
        alert('Please enter a valid username.');
    }
});

cancelBtn.addEventListener('click', function() {
    usernameModal.style.display = 'none';
});

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
