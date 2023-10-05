for (let i = 0; i < 150; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    const xStart = (Math.random() - 0.5) * 100; // Random X start
    const yStart = (Math.random() - 0.5) * 100; // Random Y start
    const xEnd = (Math.random() - 0.5) * 100; // Random X end
    const yEnd = (Math.random() - 0.5) * 100; // Random Y end

    const animationName = `floatDot${i}`;

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

    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.top = `${Math.random() * 100}vh`;
    dot.style.animation = `${animationName} 5s infinite alternate`;
    dot.style.animationDelay = `${Math.random() * 5}s`;

    document.body.appendChild(dot);
}

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
