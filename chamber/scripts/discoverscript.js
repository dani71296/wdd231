import items from '../data/discover.js';

// Mostrar mensaje de última visita
const visitMessageEl = document.getElementById('visitMessage');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffDays = Math.floor((now - lastVisit) / (1000*60*60*24));
  if (diffDays < 1) {
    visitMessageEl.textContent = "Back so soon! Awesome!";
  } else {
    visitMessageEl.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
  }
}

// Guardar fecha actual
localStorage.setItem('lastVisit', now.toString());

// Renderizar las cards
const grid = document.getElementById('discover-grid');

items.forEach(item => {
  const card = document.createElement('div');
  card.className = 'discover-card';
  card.innerHTML = `
    <h2>${item.title}</h2>
    <figure><img src="${item.image}" alt="${item.title}" /></figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;
  grid.appendChild(card);
});
