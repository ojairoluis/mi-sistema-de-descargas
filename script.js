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

// --- TAREA 0: EFX VISUALES (Confeti Party) ---
function createConfetti() {
  const container = document.getElementById('particles-container');
  container.innerHTML = '';
  const count = 30; 
  const colors = ['#FFD700', '#FF0055', '#00F2FF', '#00FF9D', '#FFFFFF']; // Oro, Rosa, Azul, Verde, Blanco

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Aleatorizar propiedades
    const size = Math.random() * 8 + 4 + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.setProperty('--size', size);
    confetti.style.setProperty('--color', color);
    confetti.style.setProperty('--pos', Math.random() * 100 + '%');
    confetti.style.setProperty('--duration', Math.random() * 5 + 5 + 's');
    confetti.style.setProperty('--delay', Math.random() * 5 + 's');
    
    container.appendChild(confetti);
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

// --- TAREA 2: Rellenar el catálogo (Colorido) ---
function populateVideoCatalog(data) {
  catalogList.innerHTML = '';  
  const allVideos = Object.entries(data).reverse();

  allVideos.forEach(([videoKey, video]) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `/${videoKey}`;
    link.classList.add('catalog-link');
    
    // Iconos de fiesta variados
    const icons = ["🥳", "🥂", "🎆", "✨", "🔥"];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    link.innerHTML = `
      <span class="link-icon">${randomIcon}</span> 
      <span class="link-text">${video.title.toUpperCase()}</span> 
      <span class="link-arrow">GO</span>
    `;
    
    listItem.appendChild(link);
    catalogList.appendChild(listItem);
  });
}

// --- TAREA 3: Lógica Principal ---
function main() {
  createConfetti();
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
        mainTitleText.textContent = "FELIZ 2026";
        videoTitle.textContent = "🥳 La fiesta empieza aquí 👇";
        loading.style.display = 'none';

      } else {
        // PÁGINA DE VIDEO
        if (!data[videoId]) {
          videoTitle.textContent = "❌ Enlace Vencido";
          loading.textContent = "Intenta con otro archivo de la lista.";
          return;
        }

        const video = data[videoId];
        
        // Títulos
        mainTitleText.innerHTML = "TU SELECCIÓN <span style='color:#00F2FF'>✨</span>";
        videoTitle.textContent = `${video.title.toUpperCase()}`;
        
        // Asignar enlaces
        btnFilemoon.href = video.filemoon;
        btnStreamhg.href = video.streamhg;
        btnTerabox.href = video.terabox;

        // Limpiar loading y mostrar botones
        loading.textContent = "⬇️ Enlaces Listos:";
        btnFilemoon.classList.remove('hidden');
        btnStreamhg.classList.remove('hidden');
        btnTerabox.classList.remove('hidden');
      }

    })
    .catch((error) => {
      console.error('Error JSON:', error);
      videoTitle.textContent = "Error";
      loading.textContent = "⚠️ Algo salió mal con la fiesta.";
    });
}

document.addEventListener('DOMContentLoaded', main);
