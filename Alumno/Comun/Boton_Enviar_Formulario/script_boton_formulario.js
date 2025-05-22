const btn = document.getElementById("submitBtn");
const content = btn.querySelector(".content");
const originalHTML = content.innerHTML;

btn.addEventListener("click", () => {
  if (btn.disabled) return;

  btn.classList.add("sent");
  btn.disabled = true;
  content.style.opacity = 0;

  setTimeout(() => {
    content.innerHTML = 'Enviado <span class="checkmark"><svg viewBox="0 0 24 24"><polyline points="4 12 10 17 20 7" /></svg></span>';
    content.style.opacity = 1;
  }, 800);

  setTimeout(() => {
    btn.classList.remove("sent");
    content.style.opacity = 0;

    setTimeout(() => {
      content.innerHTML = originalHTML;
      content.style.opacity = 1;
      btn.disabled = false;
    }, 300);
  }, 3500);
});
