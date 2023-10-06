const canvas = document.querySelector('.background');
const player = document.createElement('div');
player.className = 'player';
canvas.appendChild(player);

let playerName = '';

// Position the player in the center initially
player.style.left = `${window.innerWidth / 2 - 10}px`;
player.style.top = `${window.innerHeight / 2 - 10}px`;

const foods = [];
const playerNameDiv = document.querySelector('.player-name');
const playerScoreDiv = document.querySelector('.player-score');
let score = 0;

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

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

canvas.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
});

function animate() {
    const currentX = parseFloat(player.style.left);
    const currentY = parseFloat(player.style.top);

    const dx = (targetX - currentX) * 0.2;
    const dy = (targetY - currentY) * 0.2;

    player.style.left = currentX + dx + 'px';
    player.style.top = currentY + dy + 'px';

    // Check for eating food
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        if (food) {
            const foodX = food.offsetLeft;
            const foodY = food.offsetTop;
            const distance = Math.sqrt(Math.pow((currentX + dx - foodX), 2) + Math.pow((currentY + dy - foodY), 2));

            // Check collision with food cells
            if (distance < (player.offsetWidth / 2 + food.offsetWidth / 2)) {
                canvas.removeChild(food);
                foods[i] = null;

                const newSize = Math.min(player.offsetWidth + 1, window.innerWidth / 5);
                player.style.width = `${newSize}px`;
                player.style.height = `${newSize}px`;

                score += 1;  // Update the score
                playerScoreDiv.textContent = score;  // Reflect the new score on the scoreboard
            }
        }
    }

    requestAnimationFrame(animate);
}

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}

document.getElementById('startGame').addEventListener('click', function(event) {
    event.preventDefault();
    
    const modal = document.getElementById('usernameModal');
    modal.style.display = "block";
    
    // When player clicks Play
    document.getElementById('playBtn').addEventListener('click', function() {
        playerName = document.getElementById('username').value || 'Player';
        playerNameDiv.textContent = playerName;

        modal.style.display = "none";
        document.querySelector('.server-logo').style.display = 'none';
        document.querySelector('.ip-box').style.display = 'none';
        document.querySelector('.start-button').style.display = 'none';
        document.querySelector('.discord-button').style.display = 'none';

        animate();
    });

    // When player clicks Cancel
    document.getElementById('cancelBtn').addEventListener('click', function() {
        modal.style.display = "none";
    });
});
