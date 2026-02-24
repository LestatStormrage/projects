import "./cookies.min.js";
import "./watcher.min.js";
import "./common.min.js";
const images = document.querySelectorAll(".company-history__image");
if (images.length > 0) {
  let current = 0;
  const interval = 7e3;
  window.addEventListener("load", () => {
    images.forEach((img, i) => {
      img.style.opacity = i === 0 ? "1" : "0";
      img.style.transition = "none";
    });
    void images[0].offsetHeight;
    images.forEach((img) => {
      img.style.transition = "opacity 2s ease-in-out";
    });
    function showNextImage() {
      images.forEach((img, i) => {
        img.style.opacity = i === current ? "1" : "0";
      });
      current = (current + 1) % images.length;
    }
    setInterval(showNextImage, interval);
  });
}
