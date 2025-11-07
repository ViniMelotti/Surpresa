const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gallery = document.getElementById("gallery");
const photos = document.querySelectorAll(".photos img");
const message = document.querySelector(".message");
const music = document.getElementById("music");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gallery.classList.remove("hidden");

  // Tocar música
  music.play().catch(() => {
    console.log("Autoplay bloqueado, o usuário precisa interagir com a página.");
  });

  // Mostrar fotos com intervalo
  photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.classList.add("show");
    }, 800 * index);
  });

  // Mostrar mensagem depois das fotos
  setTimeout(() => {
    message.classList.add("show");
  }, photos.length * 800 + 1000);
});