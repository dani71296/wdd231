// Set timestamp when form loads
document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) {
    ts.value = new Date().toISOString();
  }

  // Modal handling
  const modalLinks = document.querySelectorAll(".modal-link");
  const modals = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".close");

  modalLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.style.display = "block";
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.modal;
      document.getElementById(modalId).style.display = "none";
    });
  });

  window.addEventListener("click", e => {
    modals.forEach(m => {
      if (e.target === m) m.style.display = "none";
    });
  });
});
