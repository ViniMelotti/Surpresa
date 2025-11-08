document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const photoArea = document.getElementById("photo-area");
  const photo = document.getElementById("photo");
  const message = document.getElementById("message");
  const music = document.getElementById("music");

  // 🔹 coloque aqui as suas 4 imagens
  const fotos = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"];

  startBtn.addEventListener("click", async () => {
    startScreen.classList.add("hidden");
    photoArea.classList.remove("hidden");

    // tenta tocar música
    try {
      await music.play();
    } catch {
      console.log("Autoplay bloqueado — toque manual pode ser necessário.");
    }

    let index = 0;

    const mostrarProxima = () => {
      if (index < fotos.length) {
        // troca imagem
        photo.classList.remove("show");
        setTimeout(() => {
          photo.src = fotos[index];
          photo.classList.add("show");
          index++;
          // próxima imagem após 2.5s
          setTimeout(mostrarProxima, 2500);
        }, 500);
      } else {
        // acabou as fotos → mostra a mensagem
        setTimeout(() => {
          photo.classList.remove("show");
          photo.style.display = "none";
          message.classList.remove("hidden");
          setTimeout(() => {
            message.classList.add("show");
          }, 300);
        }, 1500);
      }
    };

    mostrarProxima();
  });
});