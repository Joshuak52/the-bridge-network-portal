for (let i = 0; i < 250; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.setProperty('--delay', Math.random() * 5); // Add animation delay

    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.top = `${Math.random() * 100}vh`;

    document.querySelector('.dots').appendChild(dot);
}

function copyToClipboard() {
    const ipBox = document.getElementById("serverIp");
    ipBox.select();
    document.execCommand("copy");
    alert("Server IP copied to clipboard!");
}
