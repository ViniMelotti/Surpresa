document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const photoArea = document.getElementById("photo-area");
  const photo = document.getElementById("photo");
  const message = document.getElementById("message");
  const music = document.getElementById("music");

  // Coloque os nomes reais dos seus arquivos de imagem aqui:
  const fotos = ["foto1.jpg", "foto2.jpg", "foto3.jpg"];

  startBtn.addEventListener("click", async () => {
    startScreen.classList.add("hidden");
    photoArea.classList.remove("hidden");

    // tenta tocar música (alguns navegadores bloqueiam até interação)
    try {
      await music.play();
    } catch (err) {
      console.log("Música bloqueada, o navegador pode exigir interação manual.");
    }

    let index = 0;

    const mostrarFotos = setInterval(() => {
      photo.classList.remove("show");

      setTimeout(() => {
        photo.src = fotos[index];
        photo.classList.add("show");
        index++;

        if (index === fotos.length) {
          clearInterval(mostrarFotos);
          setTimeout(() => {
            photo.classList.remove("show");
            message.classList.add("show");
          }, 1500);
        }
      }, 500);
    }, 2500);
  });
});