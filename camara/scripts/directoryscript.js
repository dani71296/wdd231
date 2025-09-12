// script.js (module)
const membersContainer = document.getElementById('members');
const searchInput = document.getElementById('search');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const lastModifiedEl = document.getElementById('lastModified');
const copyYearEl = document.getElementById('copyYear');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');

let members = [];
let view = localStorage.getItem('membersView') || 'grid'; // 'grid' or 'list'

// nav toggle (mobile)
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.style.display = expanded ? 'none' : 'flex';
});

// fetch members.json using async/await
async function loadMembers() {
  try {
    const res = await fetch('data/members.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar members.json');
    members = await res.json();
    renderMembers();
  } catch (err) {
    membersContainer.innerHTML = `<p class="error">Error al cargar miembros: ${err.message}</p>`;
    console.error(err);
  }
}

function renderMembers(filter = '') {
  const q = filter.trim().toLowerCase();
  const data = members.filter(m =>
    !q ||
    m.name.toLowerCase().includes(q) ||
    (m.category && m.category.toLowerCase().includes(q)) ||
    (m.address && m.address.toLowerCase().includes(q))
  );

  if (view === 'grid') {
    membersContainer.className = 'members-grid';
    membersContainer.innerHTML = data.map(cardHTML).join('');
  } else {
    membersContainer.className = 'members-list';
    membersContainer.innerHTML = data.map(listHTML).join('');
  }
}

// card HTML (grid)
function cardHTML(m) {
  return `
    <article class="member-card" data-id="${m.id}">
      <img src="${m.image}" alt="${m.name} - logo" onerror="this.src='images/placeholder.png'">
      <div class="member-info">
        <h3>${m.name} <span class="badge ${levelClass(m.level)}">${levelLabel(m.level)}</span></h3>
        <p class="muted">${m.category} · ${m.address}</p>
        <p class="muted">Tel: ${m.phone}</p>
        <div class="member-actions">
          <a href="${m.website}" target="_blank" rel="noopener">Sitio web</a>
          <a href="tel:${m.phone.replace(/\s+/g,'')}" aria-label="Llamar a ${m.name}">Llamar</a>
        </div>
      </div>
    </article>
  `;
}

// list HTML
function listHTML(m) {
  return `
    <div class="list-item" data-id="${m.id}">
      <img src="${m.image}" alt="${m.name} - logo" onerror="this.src='images/placeholder.png'">
      <div style="flex:1">
        <h3>${m.name} <span class="badge ${levelClass(m.level)}">${levelLabel(m.level)}</span></h3>
        <p class="muted">${m.category} · ${m.address} · Tel: ${m.phone}</p>
      </div>
      <div>
        <a href="${m.website}" target="_blank" rel="noopener">Sitio web</a>
      </div>
    </div>
  `;
}

function levelLabel(l) {
  if (l === 3) return 'Oro';
  if (l === 2) return 'Plata';
  return 'Miembro';
}
function levelClass(l) {
  if (l === 3) return 'level-3';
  if (l === 2) return 'level-2';
  return 'level-1';
}

// toggle view buttons
gridBtn.addEventListener('click', () => { view = 'grid'; saveView(); renderMembers(searchInput.value); setPressed(); });
listBtn.addEventListener('click', () => { view = 'list'; saveView(); renderMembers(searchInput.value); setPressed(); });

function setPressed() {
  gridBtn.setAttribute('aria-pressed', view === 'grid');
  listBtn.setAttribute('aria-pressed', view === 'list');
}
function saveView() { localStorage.setItem('membersView', view); }

// search
searchInput.addEventListener('input', (e) => {
  renderMembers(e.target.value);
});

// set copyright year and last modified
function setFooterDates() {
  copyYearEl.textContent = new Date().getFullYear();
  // document.lastModified returns a string, may be empty if served from file:// in some browsers.
  const lm = document.lastModified ? new Date(document.lastModified) : null;
  lastModifiedEl.textContent = lm ? lm.toLocaleString() : 'No disponible';
}

// init
setPressed();
setFooterDates();
loadMembers();
