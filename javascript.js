// JavaScript code for creating floating dots
for (let i = 0; i < 250; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;
    
    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    
    document.querySelector('.dots').appendChild(dot);
}
