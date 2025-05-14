import "./app.min.js";
const tooltip = document.createElement("div");
tooltip.className = "floating-tooltip";
document.body.appendChild(tooltip);
let hideTimeout = null;
let activeTooltipIcon = null;
function showTooltip(icon) {
  const td = icon.closest("td");
  if (!td) return;
  const text = td.getAttribute("data-tooltip");
  tooltip.textContent = text;
  tooltip.style.display = "block";
  activeTooltipIcon = icon;
  requestAnimationFrame(() => {
    const rect = icon.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 8;
    let left = rect.right + 10;
    let top = rect.top + window.scrollY;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = rect.left - tooltipRect.width - 10;
    }
    if (left < padding) {
      left = padding;
    }
    if (top + tooltipRect.height > window.innerHeight + window.scrollY - padding) {
      top = rect.top + window.scrollY - tooltipRect.height - 10;
    }
    if (top < padding) {
      top = padding;
    }
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  });
}
function hideTooltip() {
  tooltip.style.display = "none";
  activeTooltipIcon = null;
}
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
  document.addEventListener("mouseover", (e) => {
    const icon = e.target.closest(".--icon-info-circle");
    if (icon) {
      clearTimeout(hideTimeout);
      showTooltip(icon);
    }
  });
  document.addEventListener("mouseout", (e) => {
    const icon = e.target.closest(".--icon-info-circle");
    if (icon) {
      hideTimeout = setTimeout(hideTooltip, 10);
    }
  });
}
document.addEventListener("click", (e) => {
  const icon = e.target.closest(".--icon-info-circle");
  if (icon) {
    e.stopPropagation();
    if (activeTooltipIcon !== icon) {
      showTooltip(icon);
    } else {
      hideTooltip();
    }
  } else {
    hideTooltip();
  }
});
window.addEventListener("scroll", hideTooltip);
