const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1);

// --- Elementos del DOM ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const mainContainer = document.querySelector('.container');
const footer = document.querySelector('.footer');

// --- Tus Enlaces ---
const socialLinks = {
  x: "https://x.com/patuconsumoxxd?t=lBK2T6a-4wD-fXKMzQ_Lsg&s=35",
  facebook: "https://www.facebook.com/people/GREAT-LINKS/61556741140694/?mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/mysweetlinks/?igsh=eDhuZHNtOHE4eXdx#",
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u",
  tiktok: "https://www.tiktok.com/@patuconsumoxdpacks?is_from_webapp=1&sender_device=pc"
};

const telegramChannels = {
  main: "https://t.me/+iQ-eesmcw0VhYzQx",
  catalog: "https://t.me/patuconsumoxdmenu",
  tutorial: "https://t.me/tutodescargas"
};

// --- Función para Renderizar Contenido Dinámico ---
function renderDynamicContent() {
  
  // --- 1. SECCIÓN DE TELEGRAM (CTA Secundario) ---
  const telegramSection = document.createElement('div');
  telegramSection.innerHTML = `
    <hr style="border: 1px solid #444; margin: 40px 0;">
    <h2 style="color: #ffcc00; margin: 20px 0 15px;">📬 ¡CANALES DE TERROR! (TELEGRAM)</h2>
    <p style="color: #ddd; margin-bottom: 25px; font-size: 1rem;">
      Screenshots exclusivos, catálogos completos y tutoriales paso a paso.
    </p>
    
    <a href="${telegramChannels.main}" target="_blank" class="btn btn-secondary" style="margin: 10px auto; display: block; width: 90%; max-width: 400px;">✨ @teralinks12 — Screenshots Exclusivos</a>
    <a href="${telegramChannels.catalog}" target="_blank" class="btn btn-secondary" style="margin: 10px auto; display: block; width: 90%; max-width: 400px;">📂 @patuconsumoxdmenu — Catálogo Completo</a>
    <a href="${telegramChannels.tutorial}" target="_blank" class="btn btn-secondary" style="margin: 10px auto; display: block; width: 90%; max-width: 400px;">📚 @tutodescargas — Guía de Descargas</a>
    
    <p style="color: #aaa; margin-top: 30px; font-size: 0.9rem;">📲 Todos los canales funcionan en cualquier dispositivo.</p>
  `;

  // --- 2. BARRA DE REDES SOCIALES (Sin cambios) ---
  const socialSection = document.createElement('div');
  socialSection.className = 'social-bar';
  socialSection.innerHTML = `
    <h2>🌟 ¡Sígueme en mis otras redes!</h2>
    <div class="social-icons-container">
      <a href="${socialLinks.tiktok}" target="_blank" class="social-icon">🎬 TikTok</a>
      <a href="${socialLinks.whatsapp}" target="_blank" class="social-icon">📱 WhatsApp</a>
      <a href="${socialLinks.x}" target="_blank" class="social-icon">🐦 X (Twitter)</a>
      <a href="${socialLinks.facebook}" target="_blank" class="social-icon">📘 Facebook</a>
      <a href="${socialLinks.instagram}" target="_blank" class="social-icon">📸 Instagram</a>
    </div>
    <p style="color: #aaa; margin-top: 40px; font-size: 0.9rem;">Gracias por apoyar mi trabajo 💙</p>
  `;
  
  // Inyecta el contenido en el DOM
  mainContainer.insertBefore(telegramSection, footer);
  mainContainer.insertBefore(socialSection, footer);
}


// --- LÓGICA DE CARGA PRINCIPAL (Sin cambios) ---
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    if (!data[videoId]) {
      loading.textContent = "❌ Video no encontrado.";
      return;
    }

    const video = data[videoId];
    videoTitle.textContent = `🦇 » ${video.title.toUpperCase()} « 🦇`;
    btnFilemoon.href = video.filemoon;
    btnStreamhg.href = video.streamhg;
    btnTerabox.href = video.terabox;
    loading.style.display = 'none';

    // Renderiza el contenido dinámico al instante
    renderDynamicContent();

  })
  .catch(() => {
    loading.textContent = "⚠️ Error cargando enlaces. Intenta más tarde.";
  });
