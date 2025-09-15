// Obtener el ID del video desde la URL (ej: tuweb.com/video1)
const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1); // Ej: "/video1" → "video1"

const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');

const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamtape = document.getElementById('btn-streamtape');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');

// Enlaces Linkvertise (¡CADA UNO ES DIFERENTE!)
const linkvertiseLinks = {
  filemoon: "https://linkvertise.com/123456789",     // Reemplaza por tu link real
  streamtape: "https://linkvertise.com/987654321",   // Reemplaza por tu link real
  streamhg: "https://linkvertise.com/1122334455",    // Reemplaza por tu link real
  terabox: "https://linkvertise.com/6677889900"      // Reemplaza por tu link real
};

// Cargar datos
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    if (!data[videoId]) {
      loading.textContent = "❌ Video no encontrado.";
      return;
    }

    const video = data[videoId];
    videoTitle.textContent = video.title;

    // Asignar enlaces Linkvertise a los botones
    btnFilemoon.href = linkvertiseLinks.filemoon;
    btnStreamtape.href = linkvertiseLinks.streamtape;
    btnStreamhg.href = linkvertiseLinks.streamhg;
    btnTerabox.href = linkvertiseLinks.terabox;

    loading.style.display = 'none';
  })
  .catch(() => {
    loading.textContent = "⚠️ Error cargando enlaces. Intenta más tarde.";
  });