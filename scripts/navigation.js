const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});
