// Texto de la carta
const message = `
Mi amor:

Hoy quiero abrir mi corazón por completo...
`; // (Tu mensaje completo)

// Referencias a los elementos del DOM
const card = document.getElementById("card");
const letter = document.getElementById("letter");
const closeBtn = document.getElementById("close-btn");
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");
const surpriseBtn = document.getElementById("surprise-btn");
const coupon = document.getElementById("coupon");

let isPlaying = false;

// 1. ABRIR SOBRE Y REPRODUCIR MÚSICA
if (card) {
  card.addEventListener("click", (e) => {
    // Si hace click en la X o en el botón de sorpresa, no hace la animación de abrir de nuevo
    if (e.target.id === "close-btn" || e.target.closest("#surprise-btn")) return;

    card.classList.add("open");

    // Intento de reproducción de música
    if (music && !isPlaying) {
      music.play().then(() => {
        isPlaying = true;
        if (musicBtn) musicBtn.classList.add("playing");
        if (musicIcon) musicIcon.textContent = "🔊";
      }).catch((err) => {
        console.log("El navegador bloqueó la reproducción automática:", err);
      });
    }
  });
}

// 2. EVITAR QUE HACER CLICK DENTRO DE LA CARTA INTERFIERA
if (letter) {
  letter.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// 3. BOTÓN CERRAR CARTA
if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    card.classList.remove("open");
  });
}

// 4. BOTÓN REPRODUCTOR DE MÚSICA (PLAY / PAUSE)
if (musicBtn && music) {
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isPlaying) {
      music.pause();
      musicBtn.classList.remove("playing");
      if (musicIcon) musicIcon.textContent = "🔇";
      isPlaying = false;
    } else {
      music.play();
      musicBtn.classList.add("playing");
      if (musicIcon) musicIcon.textContent = "🔊";
      isPlaying = true;
    }
  });
}

// 5. MOSTRAR / OCULTAR CUPÓN SORPRESA
if (surpriseBtn && coupon) {
  surpriseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (coupon.style.display === "block") {
      coupon.style.display = "none";
    } else {
      coupon.style.display = "block";
    }
  });
}
