// --- Elementos del DOM (cache) ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');
const mainContent = document.querySelector('.main-content');
const mainTitleText = document.getElementById('main-title-text');

// --- Tus Enlaces (Se mantienen igual) -------
const socialLinks = {
  x: "https://x.com/patuconsumoxxd?t=lBK2T6a-4wD-fXKMzQ_Lsg&s=35",
  facebook: "https://www.facebook.com/people/GREAT-LINKS/61556741140694/?mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/mysweetlinks/?igsh=eDhuZHNtOHE4eXdx#",
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u",
  tiktok: "https://www.tiktok.com/@patuconsumoxdpacks?is_from_webapp=1&sender_device=pc"
};

const telegramChannels = {
  main: "https://t.me/+iQ-eesmcw0VhYzQx",      // Canal VIP
  catalog: "https://t.me/patuconsumoxdmenu",   // Catálogo
  tutorial: "https://t.me/tutodescargas" // Guías
};

/**
 * TAREA 1: Hidratar enlaces estáticos.
 */
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

/**
 * TAREA 2: Rellenar el catálogo.
 * Usamos el emoji de fuegos artificiales 🎆 o champaña 🥂
 */
function populateVideoCatalog(data) {
  catalogList.innerHTML = '';  
  
  // Revertimos para mostrar los nuevos primero
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `/${videoKey}`;  
    
    // Emoji de fiesta
    link.textContent = `🎆 ${video.title.toUpperCase()}`;
    
    listItem.appendChild(link);
    catalogList.appendChild(listItem);
  });
}

/**
 * TAREA 3: Lógica Principal
 */
function main() {
  populateCommunityLinks();

  // Obtener ID del video de la URL
  const videoId = window.location.pathname.substring(1);

  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      populateVideoCatalog(data);

      // --- LÓGICA DE VISUALIZACIÓN ---
      if (videoId === "" || videoId === "index.html") {
        // HOME
        mainTitleText.textContent = "FELIZ 2026";
        videoTitle.textContent = "✨ Bienvenido. Celebra con nuestros enlaces. 👇";
        mainContent.style.display = 'none';

      } else {
        // PÁGINA DE VIDEO
        if (!data[videoId]) {
          videoTitle.textContent = "❌ Archivo no encontrado";
          loading.textContent = "El enlace ha caducado o no existe.";
          return;
        }

        const video = data[videoId];
        
        // Títulos de Video
        videoTitle.textContent = `🥂 » ${video.title.toUpperCase()} « 🥂`;
        btnFilemoon.href = video.filemoon;
        btnStreamhg.href = video.streamhg;
        btnTerabox.href = video.terabox;

        // Mostrar Botones
        loading.style.display = 'none';
        btnFilemoon.classList.remove('hidden');
        btnStreamhg.classList.remove('hidden');
        btnTerabox.classList.remove('hidden');
      }

    })
    .catch((error) => {
      console.error('Error JSON:', error);
      videoTitle.textContent = "Error de Sistema";
      loading.textContent = "⚠️ Error cargando la fiesta. Intenta más tarde.";
    });
}

document.addEventListener('DOMContentLoaded', main);
