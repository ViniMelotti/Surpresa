// elementos
const botaoComecar = document.getElementById("botaoComecar");
const inicio = document.getElementById("inicio");
const mensagem = document.getElementById("mensagem");
const texto = document.getElementById("texto");
const musica = document.getElementById("musica");
const easterEgg = document.getElementById("easterEgg");
const senhaInput = document.getElementById("senha");
const verificar = document.getElementById("verificar");
const resultado = document.getElementById("resultado");

// contêiner de dicas fixas
const dicasContainer = document.createElement("div");
dicasContainer.id = "dicasContainer";
dicasContainer.style.marginTop = "20px";
dicasContainer.style.fontSize = "1.1em";
dicasContainer.style.lineHeight = "1.6em";
dicasContainer.style.color = "#c2185b";
easterEgg.appendChild(dicasContainer);

// texto principal
const mensagemParagrafos = [
  "Hoje é o seu dia — o dia de se tornar mais velha né, 19 aninhos. 🎉",
  "Sério, você é uma amiga simplesmente incrível: engraçada, parceira pra qualquer ideia maluca, e com um coração gigante que vive distribuindo amor, caos e memes em doses equilibradas. 💖",
  "Você espalha risada, amor e umas boas doses de bagunça. E é por isso que estar do seu lado é tipo ouvir uma boa música: a gente se sente bem sem nem saber o motivo. 🎶",
  "Obrigado por ser essa pessoa que transforma dias normais em histórias que a gente vai rir pra sempre. Você merece o mundo inteiro — e se o mundo não couber, pelo menos um pedaço de bolo e essa linda surpresa já ajudam. 🍰",
  "Aproveita cada segundo, dança, ri e lembra: tem gente que te admira pra caramba.",
  "Parabéns Pâmela, vulgo Pampam! 💕",
  "(psst... tem um segredinho escondido 👀)"
];

// controle de tentativas e dicas
let tentativas = 0;
let dicasLiberadas = [];

// iniciar site
botaoComecar.addEventListener("click", () => {
  inicio.style.opacity = "0";
  setTimeout(() => (inicio.style.display = "none"), 800);
  mensagem.style.display = "block";
  mensagem.classList.add("fade-in");
  musica.play();
  escreverParagrafos(mensagemParagrafos, texto, 40);
  iniciarConfete(30);
});

// função para escrever texto com digitação
function escreverParagrafos(paragrafos, container, velocidade) {
  let pIndex = 0;
  let charIndex = 0;
  let atual = document.createElement("p");
  container.appendChild(atual);

  const intervalo = setInterval(() => {
    if (charIndex < paragrafos[pIndex].length) {
      atual.textContent += paragrafos[pIndex].charAt(charIndex);
      charIndex++;
    } else {
      pIndex++;
      if (pIndex < paragrafos.length) {
        atual = document.createElement("p");
        container.appendChild(atual);
        charIndex = 0;
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      } else {
        clearInterval(intervalo);
        setTimeout(() => {
          easterEgg.style.display = "block";
          easterEgg.classList.add("fade-in");
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 1500);
      }
    }
  }, velocidade);
}

// confetes e corações laterais
function iniciarConfete(duracao) {
  const end = Date.now() + duracao * 1000;
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: ["#ff69b4", "#ffd700", "#00cfff", "#adff2f", "#ff4500"]
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: ["#ff69b4", "#ffd700", "#00cfff", "#adff2f", "#ff4500"]
    });
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 80,
      startVelocity: 20,
      origin: { x: Math.random() > 0.5 ? 0 : 1, y: 0 },
      colors: ["#ff1493", "#ff69b4", "#ffc0cb", "#fff0f5"],
      scalar: 1.4,
      shapes: ["heart"]
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Easter Egg com dicas e contador
verificar.addEventListener("click", () => {
  const senha = senhaInput.value.trim();
  if (senha === "30/10/2025") {
    resultado.innerHTML = `🎉 Achou o Easter Egg! 🎉<br>
      Se você descobriu isso saiba que você é muito, MUITO especial, pode me ligar a qualquer momento que quiser 💖`;
    easterEgg.classList.add("fade-in");
    iniciarCoracoes(15);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } else {
    tentativas++;
    resultado.innerHTML = "❌ Senha incorreta!";

    // mostrar quantas tentativas até próxima dica
    let proxima = 3 - (tentativas % 3);
    if (tentativas >= 9) proxima = 0;

    if (proxima > 0) {
      resultado.innerHTML += `<br><small>Faltam ${proxima} tentativa${proxima > 1 ? 's' : ''} para a próxima dica 💭</small>`;
    }

    // liberar dicas
    if (tentativas === 3 && !dicasLiberadas.includes(1)) {
      liberarDica(1, "📅 Dica 1: é uma data");
    } else if (tentativas === 6 && !dicasLiberadas.includes(2)) {
      liberarDica(2, "🌊 Dica 2: você deságua em mim, e eu, oceano");
    } else if (tentativas === 9 && !dicasLiberadas.includes(3)) {
      liberarDica(3, "✨ Dica 3: termina com 2025");
    }
  }
});

// função para mostrar dica fixa na tela
function liberarDica(numero, texto) {
  dicasLiberadas.push(numero);
  const dica = document.createElement("p");
  dica.innerHTML = `<strong>${texto}</strong>`;
  dica.style.opacity = "0";
  dica.style.transition = "opacity 1s";
  dicasContainer.appendChild(dica);
  setTimeout(() => (dica.style.opacity = "1"), 100);
}

// chuva de corações (Easter Egg)
function iniciarCoracoes(duracao) {
  const end = Date.now() + duracao * 1000;
  (function frame() {
    confetti({
      particleCount: 8,
      spread: 70,
      startVelocity: 25,
      colors: ["#ff1493", "#ff69b4", "#ffc0cb", "#fff0f5"],
      origin: { x: Math.random(), y: 0 },
      gravity: 0.6,
      scalar: 1.3,
      shapes: ["heart"]
    });
    // também pelos lados
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: ["#ff1493", "#ff69b4", "#ffc0cb"]
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: ["#ff1493", "#ff69b4", "#ffc0cb"]
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// biblioteca de confete
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
document.head.appendChild(script);
