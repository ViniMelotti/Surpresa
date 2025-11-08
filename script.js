const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const slideshow = document.getElementById('slideshow');
const message = document.getElementById('message');
const music = document.getElementById('music');
const slide = document.getElementById('slide');
const confettiCanvas = document.getElementById('confetti');

const images = [
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg"
];

// 🟢 Corrigido: garante que o áudio inicie sem travar o código
startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  slideshow.classList.remove('hidden');

  // tenta tocar a música — se falhar, continua o site mesmo assim
  music.play().catch(() => {
    console.warn("Autoplay bloqueado — música iniciará após interação.");
  });

  startSlideshow();
});

function startSlideshow() {
  let i = 0;
  slide.src = images[i];
  const interval = setInterval(() => {
    i++;
    if (i >= images.length) {
      clearInterval(interval);
      slideshow.classList.add('hidden');
      message.classList.remove('hidden');
      startConfetti();
      typeText();
    } else {
      slide.src = images[i];
    }
  }, 3000);
}

// ✏️ Efeito de digitação
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
    }
  }

  type();
}

// 🎉 Confete animado
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

function randomColor() {
  const colors = ['#ff4081', '#ffeb3b', '#80deea', '#81c784'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      c: randomColor(),
      s: Math.random() * 3 + 2
    });
  }
  animateConfetti();
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((p) => {
    p.y += p.s;
    if (p.y > confettiCanvas.height) p.y = -10;
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    confettiCtx.fillStyle = p.c;
    confettiCtx.fill();
  });
  requestAnimationFrame(animateConfetti);
}
