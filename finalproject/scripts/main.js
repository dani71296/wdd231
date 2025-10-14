import { obtenerMotos } from './motos.js';

let motosGlobal = [];

async function init() {
  motosGlobal = await obtenerMotos();
  mostrarMotos(motosGlobal);
  setupModal();
}

function mostrarMotos(motos) {
  const contenedor = document.querySelector('#motos-container');
  contenedor.innerHTML = '';

  motos.forEach(moto => {
    const card = document.createElement('div');
    card.classList.add('moto-card');
    card.innerHTML = `
      <img src="${moto.imagen}" alt="${moto.modelo}" loading="lazy">
      <h3>${moto.marca} ${moto.modelo}</h3>
      <p>Year: ${moto.anio}</p>
      <p>Price: $${moto.precio}</p>
      <button class="detalle-btn" data-id="${moto.id}">View Details</button>
    `;
    contenedor.appendChild(card);
  });
}

function setupModal() {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  document.addEventListener('click', e => {
    if(e.target.classList.contains('detalle-btn')) {
      const id = e.target.dataset.id;
      const moto = motosGlobal.find(m => m.id == id);
      modalBody.innerHTML = `
        <h2>${moto.marca} ${moto.modelo}</h2>
        <img src="${moto.imagen}" alt="${moto.modelo}" style="width:100%; border-radius:5px;">
        <p>${moto.descripcion}</p>
        <p>Year: ${moto.anio}</p>
        <p>Price: $${moto.precio}</p>
      `;
      modal.style.display = 'flex';
    }
  });

  modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', e => { if(e.target == modal) modal.style.display = 'none'; });
}

init();

// Footer dinámico
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
