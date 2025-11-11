// --- Elementos del DOM (cache) ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');
const searchInput = document.getElementById('search-input');
const videoCount = document.getElementById('video-count');
const specificVideoSection = document.getElementById('specific-video-section');

// --- Tus Enlaces (Se mantienen igual) -------
const socialLinks = {
  x: "https://x.com/patuconsumoxxd?t=lBK2T6a-4wD-fXKMzQ_Lsg&s=35",
  facebook: "https://www.facebook.com/people/GREAT-LINKS/61556741140694/?mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/mysweetlinks/?igsh=eDhuZHNtOHE4eXdx#",
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u",
  tiktok: "https://www.tiktok.com/@patuconsumoxdpacks?is_from_webapp=1&sender_device=pc"
};

const telegramChannels = {
  main: "https://t.me/+iQ-eesmcw0VhYzQx",      // Este es @teralinks12 (VIP)
  catalog: "https://t.me/patuconsumoxdmenu",   // Este es el Catálogo (Carpeta)
  tutorial: "https://t.me/tutodescargas" // Este es el de Guías (Libro)
};

// Variable global para almacenar todos los videos
let allVideos = [];

/**
 * TAREA 1: Hidratar enlaces estáticos de la comunidad.
 * (Asigna los enlaces a los nuevos botones de ícono)
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
 * (Emoji ⚡ coincide con el tema Neón)
 */
function populateVideoCatalog(data, filter = '') {
  // Limpiamos la lista por si acaso
  catalogList.innerHTML = ''; 
  
  // Guardamos todos los videos globalmente
  allVideos = Object.entries(data);
  
  // Filtramos si hay un término de búsqueda
  let filteredVideos = allVideos;
  if (filter) {
    const searchTerm = filter.toLowerCase();
    filteredVideos = allVideos.filter(([videoKey, video]) => 
      video.title.toLowerCase().includes(searchTerm) || 
      videoKey.toLowerCase().includes(searchTerm)
    );
  }
  
  // Actualizamos el contador
  const totalCount = allVideos.length;
  const filteredCount = filteredVideos.length;
  
  if (filter) {
    videoCount.textContent = `${filteredCount} de ${totalCount} videos encontrados`;
    videoCount.style.background = 'rgba(178, 36, 239, 0.2)';
  } else {
    videoCount.textContent = `${totalCount} videos disponibles`;
    videoCount.style.background = 'rgba(0, 175, 255, 0.1)';
  }
  
  // Mostramos los videos filtrados (más recientes primero)
  if (filteredVideos.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'No se encontraron videos';
    emptyMessage.style.padding = '30px';
    emptyMessage.style.color = 'var(--color-text-secondary)';
    emptyMessage.style.textAlign = 'center';
    catalogList.appendChild(emptyMessage);
  } else {
    filteredVideos.reverse().forEach(([videoKey, video], index) => {
      // Creamos los elementos del DOM de forma segura
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      
      // Usamos la redirección que ya tienes configurada
      link.href = `/${videoKey}`; 
      
      // Emoji Neón con animación escalonada
      link.textContent = `⚡ ${video.title.toUpperCase()}`;
      link.style.animationDelay = `${index * 0.05}s`;
      
      listItem.appendChild(link);
      catalogList.appendChild(listItem);
    });
  }
}

/**
 * TAREA 3: Lógica Principal (Fetch y carga del video actual)
 * (Con cambios para funcionar como página principal)
 */
function main() {
  // 1. Rellenar la comunidad INMEDIATAMENTE
  populateCommunityLinks();

  // 2. Obtener el ID del video actual (si existe)
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
      populateVideoCatalog(data);

      // --- B. Si hay un video específico en la URL, mostrarlo ---
      if (videoId && data[videoId]) {
        showSpecificVideo(data[videoId], videoId);
      } else {
        // Si no hay video específico, mostrar la página principal
        showMainPage();
      }

      // --- C. Configurar la búsqueda ---
      setupSearch(data);
    })
    .catch((error) => {
      console.error('Error al cargar data.json:', error);
      videoTitle.textContent = "Error en el Sistema";
      loading.textContent = "⚠️ Error cargando enlaces. Los archivos están temporalmente corruptos. Intenta más tarde.";
      videoCount.textContent = "Error al cargar el catálogo";
    });
}

/**
 * Muestra un video específico
 */
function showSpecificVideo(video, videoId) {
  // Cambiar el título de la página
  document.title = `⚡ ${video.title} ⚡ - PatuConsumoXD`;
  
  // Mostrar la sección de video específico
  specificVideoSection.style.display = 'block';
  
  // Ocultar otras secciones
  document.querySelector('.community-section').style.display = 'none';
  document.querySelector('.catalog-section').style.display = 'none';
  
  // Rellenar Título y Enlaces
  videoTitle.textContent = `🎬 » ${video.title.toUpperCase()} « 🎬`;
  btnFilemoon.href = video.filemoon;
  btnStreamhg.href = video.streamhg;
  btnTerabox.href = video.terabox;

  // Ocultar "Cargando..."
  loading.style.display = 'none';

  // Mostrar los botones (CTA Primario)
  btnFilemoon.classList.remove('hidden');
  btnStreamhg.classList.remove('hidden');
  btnTerabox.classList.remove('hidden');
}

/**
 * Muestra la página principal (catálogo)
 */
function showMainPage() {
  // Asegurarse de que la sección de video específico esté oculta
  specificVideoSection.style.display = 'none';
  
  // Mostrar todas las secciones
  document.querySelector('.community-section').style.display = 'block';
  document.querySelector('.catalog-section').style.display = 'block';
  
  // Cambiar el título si es necesario
  document.title = "⚡ PatuConsumoXD ⚡ - Tu Catálogo Premium";
  videoTitle.textContent = "Tu catálogo premium de contenido";
}

/**
 * Configura la funcionalidad de búsqueda
 */
function setupSearch(data) {
  let searchTimeout;
  
  searchInput.addEventListener('input', function() {
    // Debounce para mejorar rendimiento
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      populateVideoCatalog(data, this.value);
    }, 300);
  });
  
  // Limpiar búsqueda con Escape
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      populateVideoCatalog(data, '');
      this.blur();
    }
  });
}

// Ejecutar la lógica principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);

// Prevenir comportamiento por defecto en enlaces vacíos
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
    e.preventDefault();
  }
});
