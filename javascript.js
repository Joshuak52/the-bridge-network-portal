// JavaScript code for creating floating dots
for (let i = 0; i < 250; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    const animationName = `floatDot${i}`;
    const keyframes = `
        @keyframes ${animationName} {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(50px, 50px);
            }
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);

    // Adjust the random position to stay within the visible area
    const left = Math.random() * (window.innerWidth - 10) + 5;
    const top = Math.random() * (window.innerHeight - 10) + 5;

    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    dot.style.animation = `${animationName} 2.5s infinite alternate`;

    document.querySelector('.dots').appendChild(dot);
}

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
