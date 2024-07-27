// If you don't want the particles, change the following to false:
const doParticles = true;

// Do not mess with the rest of this file unless you know what you're doing :P

function getWidth() { // credit to travis on stack overflow
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

if (doParticles) {
  if (getWidth() < 400) $.firefly({minPixel: 1, maxPixel: 2, total: 20});
  else $.firefly({minPixel: 1, maxPixel: 3, total: 40});
}

// This is for the click to copy
$(document).ready(() => {
  const originalText = $(".ip").html();
  
  $(document).on("click", ".ip", () => {
    const ip = $(".ip").text();
    const tempInput = document.createElement("input");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-99999px";
    tempInput.value = ip;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    $(".ip").html("<span class='extrapad'>IP copied!</span>");
    setTimeout(() => {
      $(".ip").html(originalText);
    }, 800);
  });
});

// This is to fetch the player count
$(document).ready(() => {
  const ip = $(".sip").attr("data-ip");
  const port = $(".sip").attr("data-port");

  $.get(`https://mcapi.us/server/status?ip=${ip}&port=${port}`, (result) => {
    if (result.online) {
      $(".sip").html(result.players.now);
    } else {
      $(".playercount").html("Server isn't online!");
    }
  });

  setInterval(() => {
    $.get(`https://mcapi.us/server/status?ip=${ip}&port=${port}`, (result) => {
      if (result.online) {
        $(".sip").html(result.players.now);
      } else {
        $(".playercount").html("Server isn't online!");
      }
    });
  }, 3000);
});
