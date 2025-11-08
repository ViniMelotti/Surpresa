const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const slideshow = document.getElementById('slideshow');
const message = document.getElementById('message');
const photo = document.getElementById('photo');
const music = document.getElementById('music');

// Substitua pelos nomes reais das suas fotos
const images = [
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg"
];

let currentImage = 0;

startBtn.addEventListener('click', () => {
  // Toca a música
  music.play();

  // Esconde a tela inicial e mostra o slideshow
  startScreen.classList.add('hidden');
  slideshow.classList.remove('hidden');

  // Começa a troca de fotos
  changePhoto();

  // Mostra mensagem e ativa confete + digitação depois do slideshow
  setTimeout(() => {
    slideshow.classList.add('hidden');
    message.classList.remove('hidden');
    startConfetti(); // 🎉 confete começa aqui
    typeText(); // 📝 efeito de digitação
  }, images.length * 3000 + 1000);
});

function changePhoto() {
  photo.src = images[currentImage];
  currentImage++;

  if (currentImage < images.length) {
    setTimeout(changePhoto, 3000); // muda a cada 3s
  }
}

// Função de confete
function startConfetti() {
  const duration = 5 * 1000; // 5 segundos
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff69b4', '#ffffff', '#ffd700']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff69b4', '#ffffff', '#ffd700']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Função de digitação
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
      setTimeout(type, 35); // velocidade da digitação
    }
  }

  type();
}
