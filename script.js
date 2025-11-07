const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const container = document.getElementById("container");
const cards = document.querySelectorAll(".card");
const musica = document.getElementById("musica");

let current = 0;

// Quando o usuário toca para começar
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  container.classList.remove("hidden");

  // Toca a música da Xuxa
  musica.play().catch(() => {
    alert("Ative o som para ouvir a música da Xuxa! 🎶");
  });
});

// Passar as fotos pro lado
cards.forEach((card, index) => {
  card.style.zIndex = cards.length - index;
  card.addEventListener("click", () => nextCard(card));
});

function nextCard(card) {
  card.style.transform = "translateX(600px) rotate(20deg)";
  card.style.opacity = 0;
  setTimeout(() => {
    card.classList.add("hidden");
    current++;
    if (current === cards.length) showMessage();
  }, 500);
}

// Mostrar mensagem final
function showMessage() {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerHTML = `
    <h2>🎉 Parabéns, Pâmela (Pampam)! 🎂</h2>
    <p>
      Hoje é teu dia, e eu só quero dizer que tu é uma das pessoas mais
      incríveis, engraçadas e caóticas que já cruzaram meu caminho 😂💙<br><br>
      Que nunca te falte risada, meme e motivo pra me aturar!<br>
      Parabéns, sua linda — te desejo tudo de bom (e um pedaço generoso de bolo 🍰).
    </p>
  `;
  container.innerHTML = "";
  container.appendChild(msg);
}