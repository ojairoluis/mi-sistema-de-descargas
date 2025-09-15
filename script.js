const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1);

const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');

const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');

// ✅ TUS ENLACES DE REDES
const socialLinks = {
  x: "https://x.com/patuconsumoxxd?t=lBK2T6a-4wD-fXKMzQ_Lsg&s=35",
  facebook: "https://www.facebook.com/people/GREAT-LINKS/61556741140694/?mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/mysweetlinks/?igsh=eDhuZHNtOHE4eXdx#",
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u",
  tiktok: "https://www.tiktok.com/@patuconsumoxdpacks?is_from_webapp=1&sender_device=pc"
};

// ✅ TUS CANALES DE TELEGRAM (LOS MÁS IMPORTANTES)
const telegramChannels = {
  main: "https://t.me/+iQ-eesmcw0VhYzQx",        // Canal principal de screenshots
  catalog: "https://t.me/patuconsumoxdmenu", // Catálogo completo
  tutorial: "https://t.me/tutodescargas"    // Tutorial de descargas
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
    btnStreamhg.href = video.streamhg;
    btnTerabox.href = video.terabox;

    loading.style.display = 'none';

    // ✅ MOSTRAR REDES SOCIALES (como antes)
    setTimeout(() => {
      const container = document.querySelector('.container');
      
      // 🔹 Sección de redes sociales
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

      // ✅ NUEVA SECCIÓN: CANALES DE TELEGRAM (¡LO PRINCIPAL!)
      const telegramSection = document.createElement('div');
      telegramSection.innerHTML = `
        <hr style="border: 1px solid #444; margin: 40px 0;">
        <h2 style="color: #0088cc; margin: 20px 0 15px;">📬 ¡ENTRA A MIS CANALES DE TELEGRAM!</h2>
        <p style="color: #ddd; margin-bottom: 25px; font-size: 1rem;">
          Aquí encontrarás <strong>screenshots exclusivos</strong>, <strong>catálogos completos</strong> y <strong>tutoriales paso a paso</strong>.
        </p>
        
        <a href="${telegramChannels.main}" target="_blank" class="btn" style="background: #0088cc; margin: 10px auto; display: block; width: 90%; max-width: 400px;">✨ @teralinks12 — Screenshots Exclusivos</a>
        <a href="${telegramChannels.catalog}" target="_blank" class="btn" style="background: #0088cc; margin: 10px auto; display: block; width: 90%; max-width: 400px;">📂 @patuconsumoxdmenu — Catálogo Completo</a>
        <a href="${telegramChannels.tutorial}" target="_blank" class="btn" style="background: #0088cc; margin: 10px auto; display: block; width: 90%; max-width: 400px;">📚 @tutodescargas — Guía de Descargas</a>
        
        <p style="color: #aaa; margin-top: 30px; font-size: 0.9rem;">📲 Todos los canales funcionan en cualquier dispositivo.</p>
      `;
      container.appendChild(telegramSection);

    }, 5000);
  })
  .catch(() => {
    loading.textContent = "⚠️ Error cargando enlaces. Intenta más tarde.";
  });
