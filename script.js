// --- Elementos del DOM (cache) ---
// Es buena práctica "cachear" los elementos que usarás
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');

// --- Tus Enlaces (Se mantienen igual) ---
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

/**
 * TAREA 1: Hidratar enlaces estáticos de la comunidad.
 * Esto se ejecuta de inmediato. No espera al fetch.
 * El usuario puede interactuar con esto incluso antes de que carguen los videos.
 */
function populateCommunityLinks() {
  // Telegram
  document.getElementById('link-telegram-main').href = telegramChannels.main;
  document.getElementById('link-telegram-catalog').href = telegramChannels.catalog;
  document.getElementById('link-telegram-tutorial').href = telegramChannels.tutorial;
  
  // Redes Sociales
  document.getElementById('link-tiktok').href = socialLinks.tiktok;
  document.getElementById('link-whatsapp').href = socialLinks.whatsapp;
  document.getElementById('link-x').href = socialLinks.x;
  document.getElementById('link-facebook').href = socialLinks.facebook;
  document.getElementById('link-instagram').href = socialLinks.instagram;
}

/**
 * TAREA 2: Rellenar el catálogo de videos.
 * Se llama después de que el fetch tiene éxito.
 */
function populateVideoCatalog(data) {
  // Limpiamos la lista por si acaso
  catalogList.innerHTML = ''; 
  
  // Usamos Object.entries para tener la clave (videoKey) y el valor (video)
  // y .reverse() para mostrar los más nuevos (asumiendo que los añades al final del JSON)
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    // Creamos los elementos del DOM de forma segura
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    // Usamos la redirección que ya tienes configurada
    // Ej: /video1 -> index.html (y el script leerá "video1")
    link.href = `/${videoKey}`; 
    link.textContent = `🦇 ${video.title.toUpperCase()}`;
    
    listItem.appendChild(link);
    catalogList.appendChild(listItem);
  });
}

/**
 * TAREA 3: Lógica Principal (Fetch y carga del video actual)
 */
function main() {
  // 1. Rellenar la comunidad INMEDIATAMENTE
  populateCommunityLinks();

  // 2. Obtener el ID del video actual (Sin cambios)
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = window.location.pathname.substring(1);

  // 3. Buscar los datos del video
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la red: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // --- A. Rellenar el Catálogo de Videos ---
      // Lo hacemos aquí para que no bloquee la carga del video principal
      populateVideoCatalog(data);

      // --- B. Rellenar el Video Principal ---
      if (!data[videoId]) {
        // Video no encontrado
        videoTitle.textContent = "❌ Este video fue devorado ❌";
        loading.textContent = "El video no existe o fue movido de la cripta.";
        return;
      }

      // ¡Video encontrado!
      const video = data[videoId];
      
      // Rellenar Título y Enlaces
      videoTitle.textContent = `🦇 » ${video.title.toUpperCase()} « 🦇`;
      btnFilemoon.href = video.filemoon;
      btnStreamhg.href = video.streamhg;
      btnTerabox.href = video.terabox;

      // Ocultar "Cargando..."
      loading.style.display = 'none';

      // Mostrar los botones (CTA Primario)
      btnFilemoon.classList.remove('hidden');
      btnStreamhg.classList.remove('hidden');
      btnTerabox.classList.remove('hidden');

    })
    .catch((error) => {
      console.error('Error al cargar data.json:', error);
      videoTitle.textContent = "Error en el Conjurø";
      loading.textContent = "⚠️ Error cargando enlaces. La cripta está sellada. Intenta más tarde.";
    });
}

// Ejecutar la lógica principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);
