document.addEventListener("DOMContentLoaded", function() {
  generateParticles(50);

  const commandInput = document.getElementById("commandInput");
  commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      executeCommand(this.value);
      this.value = ""; // Clear input after command execution
    }
  });
});

function generateParticles(num) {
  const container = document.getElementById("particle-container");
  for (let i = 0; i < num; i++) {
    let particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    container.appendChild(particle);
  }
}

function executeCommand(command) {
  const output = document.getElementById("output");
  // For now, just print the command. Later, you can add actual command handling here.
  output.textContent += `> ${command}\n`;
}
