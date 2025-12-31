// --- Elementos del DOM ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');
const mainTitleText = document.getElementById('main-title-text');

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

// --- OPTIMIZACIÓN: Menos elementos, mismo impacto ---
function createPartyElements() {
  const container = document.getElementById('particles-container');
  container.innerHTML = '';
  const count = 25; // Reducido drásticamente de 120 a 25 para móviles

  for (let i = 0; i < count; i++) {
    const item = document.createElement('div');
    item.classList.add('party-item');
    
    item.textContent = '💵';
    // Hacemos los billetes un poco más grandes para compensar la cantidad
    item.style.fontSize = Math.random() * 25 + 20 + 'px';
    
    item.style.left = Math.random() * 100 + '%';
    // Duración más larga = menos movimiento brusco = menos carga
    item.style.animationDuration = Math.random() * 5 + 8 + 's'; 
    item.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(item);
  }
}

// --- Funciones Estándar (Sin cambios pesados) ---
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

function populateVideoCatalog(data) {
  catalogList.innerHTML = '';  
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `/${videoKey}`;
    link.classList.add('catalog-link');
    
    const icons = ["🍻", "💵", "🎉", "✨", "🔥"];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    link.innerHTML = `
      <span class="link-icon">${randomIcon}</span> 
      <span class="link-text">${video.title.toUpperCase()}</span> 
      <span class="link-arrow">IR</span>
    `;
    
    listItem.appendChild(link);
    catalogList.appendChild(listItem);
  });
}

function main() {
  createPartyElements();
  populateCommunityLinks();

  const videoId = window.location.pathname.substring(1);

  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      populateVideoCatalog(data);

      if (videoId === "" || videoId === "index.html") {
        mainTitleText.textContent = "¡FELIZ AÑO NUEVO!";
        videoTitle.textContent = "🍻 ¡Brindemos y celebremos juntos! 🥂";
        loading.style.display = 'none';
      } else {
        if (!data[videoId]) {
          videoTitle.textContent = "❌ ¡Se acabó la fiesta!";
          loading.textContent = "Busca otro enlace en la lista.";
          return;
        }

        const video = data[videoId];
        mainTitleText.innerHTML = "FELIZ AÑO NUEVO <span style='color:#FFD700'>✨</span>";
        videoTitle.textContent = `${video.title.toUpperCase()}`;
        
        btnFilemoon.href = video.filemoon;
        btnStreamhg.href = video.streamhg;
        btnTerabox.href = video.terabox;

        loading.textContent = "⬇️ ¡A disfrutar se ha dicho! ⬇️";
        btnFilemoon.classList.remove('hidden');
        btnStreamhg.classList.remove('hidden');
        btnTerabox.classList.remove('hidden');
      }

    })
    .catch((error) => {
      console.error('Error JSON:', error);
      videoTitle.textContent = "Error";
      loading.textContent = "⚠️ Intenta luego.";
    });
}

document.addEventListener('DOMContentLoaded', main);
