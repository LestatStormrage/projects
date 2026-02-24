import "./cookies.min.js";
import "./watcher.min.js";
import "./common.min.js";
const items = [...document.querySelectorAll(".gallery-main-page__item")];
const images = [...document.querySelectorAll(".kombucha-main-page__main-image img")];
const names = [...document.querySelectorAll(".kombucha-main-page__name img")];
const SLIDE_DELAY = 3e3;
const RESUME_DELAY = 5e3;
let currentIndex = 0;
let autoplayTimer = null;
let resumeTimer = null;
function activate(index) {
  currentIndex = index;
  images.forEach(
    (img, i) => img.classList.toggle("is-active", i === index)
  );
  names.forEach(
    (name, i) => name.classList.toggle("is-active", i === index)
  );
  items.forEach(
    (item, i) => item.classList.toggle("is-active", i === index)
  );
}
function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    activate((currentIndex + 1) % items.length);
  }, SLIDE_DELAY);
}
function stopAutoplay() {
  clearInterval(autoplayTimer);
}
function userInteracted(index) {
  stopAutoplay();
  activate(index);
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(startAutoplay, RESUME_DELAY);
}
items.forEach((item, index) => {
  item.addEventListener("click", () => userInteracted(index));
  item.addEventListener("mouseenter", () => userInteracted(index));
});
activate(0);
startAutoplay();
