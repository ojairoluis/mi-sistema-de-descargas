// --- Elementos del DOM ---
const loading = document.getElementById('loading');
const videoTitle = document.getElementById('video-title');
const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const catalogList = document.getElementById('video-catalog-list');
const mainTitleText = document.getElementById('main-title-text');

// --- Enlaces Sociales (Sin cambios) ---
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

// --- TAREA 0: EFX VISUALES (Lluvia de Billetes Masiva) ---
function createPartyElements() {
  const container = document.getElementById('particles-container');
  container.innerHTML = '';
  const count = 120; // ¡Aumentamos drásticamente la cantidad de billetes!

  for (let i = 0; i < count; i++) {
    const item = document.createElement('div');
    item.classList.add('party-item');
    
    item.textContent = '💵';
    // Tamaños variados, algunos muy grandes para que destaquen
    item.style.fontSize = Math.random() * 35 + 15 + 'px';
    
    item.style.setProperty('--pos', Math.random() * 100 + '%');
    // Duraciones variadas para un efecto de "tormenta" más natural
    item.style.setProperty('--duration', Math.random() * 8 + 5 + 's');
    item.style.setProperty('--delay', Math.random() * 10 + 's');
    
    // Rotación inicial aleatoria para más realismo
    item.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(item);
  }
}

// --- TAREA 1: Hidratar enlaces (Sin cambios) ---
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

// --- TAREA 2: Rellenar el catálogo (Festivo) ---
function populateVideoCatalog(data) {
  catalogList.innerHTML = '';  
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `/${videoKey}`;
    link.classList.add('catalog-link');
    
    // Iconos de fiesta variados
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

// --- TAREA 3: Lógica Principal ---
function main() {
  createPartyElements(); // Iniciar la lluvia de billetes
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
        // HOME
        mainTitleText.textContent = "¡FELIZ AÑO NUEVO!";
        videoTitle.textContent = "🍻 ¡Brindemos y celebremos juntos! 🥂";
        loading.style.display = 'none';

      } else {
        // PÁGINA DE VIDEO
        if (!data[videoId]) {
          videoTitle.textContent = "❌ ¡Se acabó la fiesta!";
          loading.textContent = "Este enlace ya no sirve. Busca otro en la lista.";
          return;
        }

        const video = data[videoId];
        
        // Títulos
        mainTitleText.innerHTML = "FELIZ AÑO <span style='color:#FFD700'>✨</span>";
        videoTitle.textContent = `${video.title.toUpperCase()}`;
        
        // Asignar enlaces
        btnFilemoon.href = video.filemoon;
        btnStreamhg.href = video.streamhg;
        btnTerabox.href = video.terabox;

        // Limpiar loading y mostrar botones
        loading.textContent = "⬇️ ¡A disfrutar se ha dicho! ⬇️";
        btnFilemoon.classList.remove('hidden');
        btnStreamhg.classList.remove('hidden');
        btnTerabox.classList.remove('hidden');
      }

    })
    .catch((error) => {
      console.error('Error JSON:', error);
      videoTitle.textContent = "Error";
      loading.textContent = "⚠️ ¡Ups! Se nos cayó la cerveza. Intenta luego.";
    });
}

document.addEventListener('DOMContentLoaded', main);
