const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1);

const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');

// ✅ SOLO 3 BOTONES: Filemoon, StreamHG, Terabox (StreamTape eliminado)
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');

// ✅ TUS ENLACES REALES (ya configurados)
const socialLinks = {
  x: "https://x.com/patuconsumoxd",           // ❌ Cambia esto por tu X real
  facebook: "https://facebook.com/patuconsumoxd", // ❌ Cambia esto por tu FB real
  instagram: "https://instagram.com/patuconsumoxd", // ❌ Cambia esto por tu IG real
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u", // ✅ Tu canal de WhatsApp
  tiktok: "https://tiktok.com/@patuconsumoxd" // ✅ Cambia esto por tu TikTok real
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

    // ✅ Asignar solo los 3 enlaces válidos
    btnFilemoon.href = video.filemoon;
    btnStreamhg.href = video.streamhg;
    btnTerabox.href = video.terabox;

    loading.style.display = 'none';

    // ✅ Mostrar redes después de 5 segundos
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
