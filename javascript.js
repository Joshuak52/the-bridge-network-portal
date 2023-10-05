const canvas = document.querySelector('.background');

// Create the player dot and set its initial position to the center
const player = document.createElement('div');
player.className = 'player';
player.style.display = 'none'; // Hide the player dot initially
player.style.left = `${window.innerWidth / 2}px`;
player.style.top = `${window.innerHeight / 2}px`;
canvas.appendChild(player);


let mouseX = window.innerWidth / 2; // Initialize Mouse X coordinate to center
let mouseY = window.innerHeight / 2; // Initialize Mouse Y coordinate to center

// Generate random positions
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

// Create floating orbs
for (let i = 0; i < 250; i++) {
    const orb = document.createElement('div');
    orb.classList.add('orb');

    const xStart = (Math.random() - 0.5) * 100; // Random X start
    const yStart = (Math.random() - 0.5) * 100; // Random Y start
    const xEnd = (Math.random() - 0.5) * 100; // Random X end
    const yEnd = (Math.random() - 0.5) * 100; // Random Y end

    const animationName = `floatOrb${i}`;

    const keyframes = `
        @keyframes ${animationName} {
            from {
                transform: translate(${xStart}px, ${yStart}px);
            }
            to {
                transform: translate(${xEnd}px, ${yEnd}px);
            }
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);

    orb.style.left = `${Math.random() * 100}vw`;
    orb.style.top = `${Math.random() * 100}vh`;
    orb.style.animation = `${animationName} 5s infinite alternate`;
    orb.style.animationDelay = `${Math.random() * 5}s`;

    document.body.appendChild(orb);
}

// Mouse movement handler
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Player dot animation
function animate() {
    const currentX = parseFloat(player.style.left || 0);
    const currentY = parseFloat(player.style.top || 0);

    const deltaX = mouseX - currentX;
    const deltaY = mouseY - currentY;

    player.style.left = `${currentX + deltaX * 0.0025}px`;
    player.style.top = `${currentY + deltaY * 0.0025}px`;

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

// Start game button logic
document.getElementById('startGame').addEventListener('click', function(event) {
    event.preventDefault();

    document.querySelector('.container .server-logo').style.display = 'none';
    document.querySelector('.container .ip-box').style.display = 'none';
    document.querySelector('.container .instruction').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    document.querySelectorAll('.container .discord-button').forEach(btn => btn.style.display = 'none');

    player.style.display = 'block';  // Show the player dot when the game starts

    requestAnimationFrame(animate);  // Start the player dot animation when the game begins
});

function copyToClipboard() {
        const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
