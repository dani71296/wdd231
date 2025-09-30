document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const div = document.getElementById("confirmationData");

  div.innerHTML = `
    <p><strong>Name:</strong> ${params.get("firstName")} ${params.get("lastName")}</p>
    <p><strong>Email:</strong> ${params.get("email")}</p>
    <p><strong>Phone:</strong> ${params.get("phone")}</p>
    <p><strong>Organization:</strong> ${params.get("organization")}</p>
    <p><strong>Timestamp:</strong> ${params.get("timestamp")}</p>
  `;

  // Update year
  document.getElementById("copyYear").textContent = new Date().getFullYear();
});
