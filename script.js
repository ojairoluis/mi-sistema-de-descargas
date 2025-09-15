const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1);

const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');

const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamtape = document.getElementById('btn-streamtape');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    if (!data[videoId]) {
      loading.textContent = "❌ Video no encontrado.";
      return;
    }

    const video = data[videoId];
    videoTitle.textContent = video.title;

    // ✅ Aquí es donde se asignan los enlaces a los botones
    btnFilemoon.href = video.filemoon;
    btnStreamtape.href = video.streamtape;
    btnStreamhg.href = video.streamhg;
    btnTerabox.href = video.terabox;

    loading.style.display = 'none';
  })
  .catch(() => {
    loading.textContent = "⚠️ Error cargando enlaces. Intenta más tarde.";
  });
