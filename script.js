const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1);

const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');

const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamtape = document.getElementById('btn-streamtape');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');

// ✅ REEMPLAZA ESTOS ENLACES POR LOS TUYOS (¡YA LO HICISTE!)
const socialLinks = {
  x: "https://x.com/patuconsumoxd",           // ❌ Cambia esto por tu X
  facebook: "https://facebook.com/patuconsumoxd", // ❌ Cambia esto por tu FB
  instagram: "https://instagram.com/patuconsumoxd", // ❌ Cambia esto por tu IG
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u", // ✅ ¡TU CANAL YA ESTÁ AQUÍ!
  tiktok: "https://tiktok.com/@patuconsumoxd" // ✅ ¡AÑADIDO! Cambia esto por tu TikTok
};

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    if (!data[videoId]) {
      loading.textContent = "❌ Video no encontrado.";
      return;
    }

    const video = data[videoId];
    videoTitle.textContent = video.title;

    btnFilemoon.href = video.filemoon;
    btnStreamtape.href = video.streamtape;
    btnStreamhg.href = video.streamhg;
    btnTerabox.href = video.terabox;

    loading.style.display = 'none';

    // ✅ MUESTRA LAS REDES DESPUÉS DE 5 SEGUNDOS
    setTimeout(() => {
      const container = document.querySelector('.container');
      const socialSection = document.createElement('div');
      socialSection.innerHTML = `
        <h2 style="color: #ffcc00; margin: 30px 0 20px;">🌟 ¡Sígueme para más videos exclusivos!</h2>
        <p style="color: #ddd; margin-bottom: 30px;">Nuevos videos cada día. ¡No te pierdas nada!</p>
        
        <a href="${socialLinks.tiktok}" target="_blank" class="btn" style="background: #A26CE7; margin: 10px auto; display: block; width: 90%; max-width: 400px;">🎬 TikTok</a>
        <a href="${socialLinks.whatsapp}" target="_blank" class="btn" style="background: #25D366; margin: 10px auto; display: block; width: 90%; max-width: 400px;">📱 Canal de WhatsApp</a>
        <a href="${socialLinks.x}" target="_blank" class="btn" style="background: #1DA1F2; margin: 10px auto; display: block; width: 90%; max-width: 400px;">🐦 X (Twitter)</a>
        <a href="${socialLinks.facebook}" target="_blank" class="btn" style="background: #1877F2; margin: 10px auto; display: block; width: 90%; max-width: 400px;">📘 Facebook</a>
        <a href="${socialLinks.instagram}" target="_blank" class="btn" style="background: #C13584; margin: 10px auto; display: block; width: 90%; max-width: 400px;">📸 Instagram</a>
        
        <p style="color: #aaa; margin-top: 40px; font-size: 0.9rem;">Gracias por apoyar mi trabajo 💙</p>
      `;
      container.appendChild(socialSection);
    }, 5000);
  })
  .catch(() => {
    loading.textContent = "⚠️ Error cargando enlaces. Intenta más tarde.";
  });
