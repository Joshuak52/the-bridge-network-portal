function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();

    try {
        const successful = document.execCommand("copy");
        const msg = successful ? "Server IP copied to clipboard!" : "Copy failed. Please select the IP manually.";
        alert(msg);
    } catch (err) {
        console.error("Unable to copy to clipboard: ", err);
    }

    // Clear the selection
    window.getSelection().removeAllRanges();
}

for (let i = 0; i < 250; i++) {
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
    dot.style.animation = `${animationName} 2.5s infinite alternate`; // Halved the animation time to 2.5s
    dot.style.animationDelay = `${Math.random() * 5}s`;

    document.body.appendChild(dot);
}
