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

    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.top = `${Math.random() * 100}vh`;
    dot.style.animation = `${animationName} 2.5s infinite alternate`; // Apply animation
    dot.style.animationDelay = `${Math.random() * 5}s`;

    document.querySelector('.dots').appendChild(dot);
}

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
