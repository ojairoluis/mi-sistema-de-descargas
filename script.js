// --- Cache de Elementos ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');
const mainTitleText = document.getElementById('main-title-text');

// --- Enlaces (Sin cambios) ---
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

// --- TAREA 0: EFX VISUALES - Generador de Burbujas ---
function createBubbles() {
  const container = document.getElementById('bubbles-container');
  const bubbleCount = 25; // Cantidad de burbujas (equilibrado para móvil)

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Aleatorización de propiedades CSS para que se vea natural
    const size = Math.random() * 10 + 5 + 'px'; // Tamaño entre 5px y 15px
    bubble.style.setProperty('--size', size);
    bubble.style.setProperty('--pos', Math.random() * 100 + '%');
    bubble.style.setProperty('--duration', Math.random() * 5 + 5 + 's'); // Duración entre 5s y 10s
    bubble.style.setProperty('--delay', Math.random() * 5 + 's');
    
    container.appendChild(bubble);
  }
}

// --- TAREA 1: Hidratar enlaces ---
function populateCommunityLinks() {
  document.getElementById('link-telegram-main').href = telegramChannels.main;
  document.getElementById('link-telegram-catalog').href = telegramChannels.catalog;
  document.getElementById('link-telegram-tutorial').href = telegramChannels.tutorial;
  
  document.getElementById('link-tiktok').href = socialLinks.tiktok;
  document.getElementById('link-whatsapp').href = socialLinks.whatsapp;
  document.getElementById('link-x').href = socialLinks.x;
  document.getElementById('link-facebook').href = socialLinks.facebook;
  document.getElementById('link-instagram').href = socialLinks.instagram;
}

// --- TAREA 2: Rellenar el catálogo (Con nuevo estilo) ---
function populateVideoCatalog(data) {
  catalogList.innerHTML = '';  
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `/${videoKey}`;
    // Usamos la nueva clase para el estilo de lista
    link.classList.add('catalog-link'); 
    // Un toque elegante: champán al inicio, flecha al final
    link.innerHTML = `🥂 ${video.title.toUpperCase()} <span style="margin-left:auto; opacity:0.5;">Isquo;</span>`;
    
    listItem.appendChild(link);
    catalogList.appendChild(listItem);
  });
}

// --- TAREA 3: Lógica Principal ---
function main() {
  createBubbles(); // Iniciar efectos visuales
  populateCommunityLinks();

  const videoId = window.location.pathname.substring(1);

  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      populateVideoCatalog(data);

      // --- LÓGICA DE VISUALIZACIÓN ---
      if (videoId === "" || videoId === "index.html") {
        // HOME
        mainTitleText.textContent = "FELIZ 2026";
        videoTitle.textContent = "✨ Bienvenido a la Gala. Elige tu contenido abajo. 👇";
        // En el home, ocultamos el loading para que se vea limpio
        loading.style.display = 'none';

      } else {
        // PÁGINA DE VIDEO
        if (!data[videoId]) {
          videoTitle.textContent = "❌ Invitación Caducada";
          loading.textContent = "El enlace no existe o ha expirado.";
          return;
        }

        const video = data[videoId];
        
        // Títulos y Enlaces
        mainTitleText.textContent = "ACCESO VIP";
        videoTitle.textContent = `🥂 ${video.title.toUpperCase()} 🥂`;
        
        btnFilemoon.href = video.filemoon;
        btnStreamhg.href = video.streamhg;
        btnTerabox.href = video.terabox;

        // Mostrar Botones con estilo
        loading.style.display = 'none';
        btnFilemoon.classList.remove('hidden');
        btnStreamhg.classList.remove('hidden');
        btnTerabox.classList.remove('hidden');
      }

    })
    .catch((error) => {
      console.error('Error JSON:', error);
      videoTitle.textContent = "Error de Sistema";
      loading.textContent = "⚠️ La fiesta tuvo un problema técnico.";
    });
}

document.addEventListener('DOMContentLoaded', main);
