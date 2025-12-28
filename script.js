// --- Elementos del DOM ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');
const mainTitleText = document.getElementById('main-title-text');
const mainContentArea = document.querySelector('.main-card'); // Referencia para efectos

// --- Enlaces Sociales ---
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

// --- TAREA 0: EFX VISUALES (Burbujas Doradas) ---
function createBubbles() {
  const container = document.getElementById('bubbles-container');
  // Limpiamos por si se llama varias veces
  container.innerHTML = '';
  const bubbleCount = 20; 

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Aleatorización
    const size = Math.random() * 12 + 4 + 'px'; 
    bubble.style.setProperty('--size', size);
    bubble.style.setProperty('--pos', Math.random() * 100 + '%');
    bubble.style.setProperty('--duration', Math.random() * 5 + 6 + 's');
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

// --- TAREA 2: Rellenar el catálogo (Corrección del error "Isquo") ---
function populateVideoCatalog(data) {
  catalogList.innerHTML = '';  
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `/${videoKey}`;
    link.classList.add('catalog-link');
    
    // AQUI ESTABA EL ERROR: Cambiado 'Isquo;' por la entidad HTML correcta '&rsaquo;' (›)
    // Se ve como una flecha fina y elegante a la derecha
    link.innerHTML = `
      <span class="link-icon">🥂</span> 
      <span class="link-text">${video.title.toUpperCase()}</span> 
      <span class="link-arrow">&rsaquo;</span>
    `;
    
    listItem.appendChild(link);
    catalogList.appendChild(listItem);
  });
}

// --- TAREA 3: Lógica Principal ---
function main() {
  createBubbles();
  populateCommunityLinks();

  const videoId = window.location.pathname.substring(1);

  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      populateVideoCatalog(data);

      // --- LÓGICA DE TEXTOS ---
      if (videoId === "" || videoId === "index.html") {
        // HOME
        mainTitleText.textContent = "FELIZ 2026";
        videoTitle.textContent = "✨ Comienza la celebración. Elige abajo. 👇";
        loading.style.display = 'none';

      } else {
        // PÁGINA DE VIDEO
        if (!data[videoId]) {
          videoTitle.textContent = "❌ Enlace no disponible";
          loading.textContent = "Lo sentimos, este archivo ya no existe.";
          return;
        }

        const video = data[videoId];
        
        // Cambio de "ACCESO VIP" a algo más elegante y gratuito
        mainTitleText.innerHTML = "TU SELECCIÓN <span style='color:#FFD700'>✨</span>";
        videoTitle.textContent = `${video.title.toUpperCase()}`;
        
        // Asignar enlaces
        btnFilemoon.href = video.filemoon;
        btnStreamhg.href = video.streamhg;
        btnTerabox.href = video.terabox;

        // Texto de carga cambiado
        loading.textContent = "🥂 Enlaces listos para ti:";
        loading.classList.remove('loading-state'); // Quitamos animación de carga
        loading.style.marginBottom = "15px";

        // Mostrar Botones
        btnFilemoon.classList.remove('hidden');
        btnStreamhg.classList.remove('hidden');
        btnTerabox.classList.remove('hidden');
      }

    })
    .catch((error) => {
      console.error('Error JSON:', error);
      videoTitle.textContent = "Error de Sistema";
      loading.textContent = "⚠️ Hubo un problema cargando los datos.";
    });
}

document.addEventListener('DOMContentLoaded', main);
