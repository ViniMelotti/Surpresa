const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const message = document.getElementById('message');
const music = document.getElementById('music');
const secretContainer = document.getElementById('secret-container');
const secretInput = document.getElementById('secret-input');
const easterEgg = document.getElementById('easter-egg');
const heartsCanvas = document.getElementById('hearts');
const heartsCtx = heartsCanvas.getContext('2d');

startButton.addEventListener('click', () => {
  music.play().catch(() => {}); // evita erro no celular
  startButton.style.display = "none";
  startScreen.style.opacity = "0";

  setTimeout(() => {
    startScreen.classList.add('hidden');
    message.classList.remove('hidden');
    typeText();
    startConfetti(26000); // confete começa junto com a mensagem
  }, 600);
});

// Efeito de digitação
function typeText() {
  const textElement = document.getElementById('typed-text');
  const fullText = textElement.innerHTML.trim();
  textElement.innerHTML = '';
  let index = 0;

  function type() {
    if (index < fullText.length) {
      const char = fullText[index];
      textElement.innerHTML += char === '\n' ? '<br>' : char;
      index++;
      textElement.scrollTop = textElement.scrollHeight;
      setTimeout(type, 30);
    } else {
      secretContainer.classList.remove('hidden');
      // Foco só após aparecer (para funcionar no celular)
      setTimeout(() => secretInput.focus({ preventScroll: true }), 300);
    }
  }
  type();
}

// Easter Egg
secretInput.addEventListener('input', () => {
  if (secretInput.value.trim().toLowerCase() === "30/10/2025") {
    easterEgg.classList.remove('hidden');
    startHearts();
  }
});

// ❤️ Corações flutuando
function startHearts() {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
  heartsCanvas.style.pointerEvents = "none";
  let hearts = [];

  for (let i = 0; i < 60; i++) {
    hearts.push({
      x: Math.random() * heartsCanvas.width,
      y: Math.random() * heartsCanvas.height + heartsCanvas.height,
      size: Math.random() * 10 + 10,
      speed: Math.random() * 2 + 1,
      alpha: Math.random() * 0.8 + 0.2
    });
  }

  function drawHearts() {
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    hearts.forEach(h => {
      heartsCtx.globalAlpha = h.alpha;
      heartsCtx.fillStyle = "#ff80ab";
      heartsCtx.beginPath();
      heartsCtx.moveTo(h.x, h.y);
      heartsCtx.bezierCurveTo(h.x - h.size / 2, h.y - h.size / 2,
        h.x - h.size, h.y + h.size / 3,
        h.x, h.y + h.size);
      heartsCtx.bezierCurveTo(h.x + h.size, h.y + h.size / 3,
        h.x + h.size / 2, h.y - h.size / 2,
        h.x, h.y);
      heartsCtx.fill();
      h.y -= h.speed;
      if (h.y < -20) h.y = heartsCanvas.height + 20;
    });
    requestAnimationFrame(drawHearts);
  }
  drawHearts();
}

// 🎊 Confetes coloridos
function startConfetti(duration = 5000) {
  const confettiCanvas = document.createElement("canvas");
  const ctx = confettiCanvas.getContext("2d");

  confettiCanvas.style.position = "fixed";
  confettiCanvas.style.top = "0";
  confettiCanvas.style.left = "0";
  confettiCanvas.style.width = "100%";
  confettiCanvas.style.height = "100%";
  confettiCanvas.style.zIndex = "999";
  confettiCanvas.style.pointerEvents = "none";
  document.body.appendChild(confettiCanvas);

  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const confetti = [];
  const colors = ["#ff4081", "#ffeb3b", "#4caf50", "#2196f3", "#ff9800", "#e91e63"];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5
    });
  }

  let animationFrame;

  function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(c => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.angle * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();

      c.y += c.speed;
      c.angle += c.rotationSpeed;

      if (c.y > confettiCanvas.height) {
        c.y = -10;
        c.x = Math.random() * confettiCanvas.width;
      }
    });
    animationFrame = requestAnimationFrame(drawConfetti);
  }

  drawConfetti();

  // Para e remove o confete após o tempo definido
  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    confettiCanvas.remove();
  }, duration);
}
