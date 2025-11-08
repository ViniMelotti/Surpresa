document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const photoArea = document.getElementById("photo-area");
  const photo = document.getElementById("photo");
  const message = document.getElementById("message");
  const music = document.getElementById("music");

  // 👉 Troque pelos nomes exatos das suas fotos
  const fotos = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"];

  startBtn.addEventListener("click", async () => {
    startScreen.classList.add("hidden");
    photoArea.classList.remove("hidden");

    try {
      await music.play();
    } catch {
      console.log("Autoplay bloqueado — toque manual pode ser necessário.");
    }

    let index = 0;

    const mostrarProxima = () => {
      if (index < fotos.length) {
        // troca a imagem
        photo.classList.remove("show");
        setTimeout(() => {
          photo.src = fotos[index];
          photo.classList.add("show");
          index++;
          setTimeout(mostrarProxima, 2500); // próxima depois de 2,5s
        }, 500);
      } else {
        // fim das fotos → mostra a mensagem
        setTimeout(() => {
          photo.classList.remove("show");
          message.classList.remove("hidden");
          message.classList.add("show");
        }, 1000);
      }
    };

    mostrarProxima();
  });
});