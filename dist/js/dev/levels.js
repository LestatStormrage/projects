import "./app.min.js";
const tooltip = document.createElement("div");
tooltip.className = "floating-tooltip";
document.body.appendChild(tooltip);
let hideTimeout = null;
document.querySelectorAll("td[data-tooltip]").forEach((td) => {
  const text = td.getAttribute("data-tooltip");
  const icon = document.createElement("span");
  icon.className = "info-icon";
  icon.setAttribute("data-tooltip", text);
  icon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#888" stroke-width="2" />
        <line x1="12" y1="10" x2="12" y2="16" stroke="#888" stroke-width="2" />
        <circle cx="12" cy="7" r="1.5" fill="#888" />
      </svg>
    `;
  icon.addEventListener("mouseenter", (e) => {
    clearTimeout(hideTimeout);
    showTooltip(icon);
  });
  icon.addEventListener("mouseleave", (e) => {
    hideTimeout = setTimeout(hideTooltip, 200);
  });
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    showTooltip(icon);
  });
  td.appendChild(icon);
});
function showTooltip(icon) {
  const text = icon.getAttribute("data-tooltip");
  tooltip.textContent = text;
  tooltip.style.display = "block";
  const rect = icon.getBoundingClientRect();
  let left = rect.right + 10;
  let top = rect.top;
  if (left + 300 > window.innerWidth) {
    left = rect.left - 310 + scrollX;
  }
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}
function hideTooltip() {
  tooltip.style.display = "none";
}
document.addEventListener("click", (e) => {
  hideTooltip();
});
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const tooltip2 = document.querySelector(".floating-tooltip");
    if (tooltip2) {
      tooltip2.style.display = "none";
    }
    document.querySelectorAll(".info-icon.active").forEach((el) => el.classList.remove("active"));
  }, 100);
});
