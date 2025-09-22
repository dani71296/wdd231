// scripts/spotlights.js
import members from '../data/members.js';

const container = document.getElementById('spotlight-cards');

// Filtrar solo miembros Oro (3) o Plata (2)
const filtered = members.filter(m => m.level === 3 || m.level === 2);

// Mezclar aleatoriamente
const shuffled = filtered.sort(() => 0.5 - Math.random());

// Tomar hasta 3 miembros
const spotlights = shuffled.slice(0, 3);

spotlights.forEach(member => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='images/placeholder.png'">
    <h3>${member.name}</h3>
    <p>${member.category}</p>
    <p>${member.address}</p>
    <p>Tel: ${member.phone}</p>
    <a href="${member.website}" target="_blank">Website</a>
    <p>Membresía: ${member.level === 3 ? 'Oro' : 'Plata'}</p>
  `;
  container.appendChild(card);
});
