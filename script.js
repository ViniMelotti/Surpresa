const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const photoArea = document.getElementById("photo-area");
const photo = document.getElementById("photo");
const message = document.getElementById("message");
const music = document.getElementById("music");

// Coloque aqui as suas imagens (mesmo nome dos arquivos que estão na pasta)
const fotos = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"];

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  photoArea.classList.remove("hidden");

  // Toca a música
  music.play().catch(() => console.log("Autoplay bloqueado, toque manual pode ser necessário."));

  let index = 0;

  // Mostra fotos uma a uma
  const mostrarFotos = setInterval(() => {
    photo.classList.remove("show"); // esconde a anterior

    setTimeout(() => {
      photo.src = fotos[index];
      photo.classList.add("show"); // mostra a próxima
      index++;

      if (index === fotos.length) {
        clearInterval(mostrarFotos);
        // Mostrar mensagem após a última imagem
        setTimeout(() => {
          photo.classList.remove("show");
          message.classList.add("show");
        }, 1500);
      }
    }, 600);
  }, 2500); // tempo entre as fotos
});