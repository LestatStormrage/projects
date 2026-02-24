import "./cookies.min.js";
import "./watcher.min.js";
import "./common.min.js";
document.addEventListener("click", function(e) {
  const button = e.target.closest(".packaging-products-page__button");
  if (!button) return;
  const selectedPackaging = button.dataset.packaging;
  document.querySelectorAll(".packaging-products-page__button").forEach((btn) => {
    btn.classList.toggle(
      "is-active",
      btn.dataset.packaging === selectedPackaging
    );
  });
  document.querySelectorAll(".product__image, .product-popup__image").forEach((img) => {
    img.classList.toggle(
      "is-active",
      img.dataset.packaging === selectedPackaging
    );
  });
});
function disableScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  const header = document.querySelector("header");
  if (header) {
    header.style.paddingRight = `${scrollbarWidth}px`;
  }
}
function enableScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  const header = document.querySelector("header");
  if (header) {
    header.style.paddingRight = "";
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const products = document.querySelectorAll(".products-block__item");
  document.querySelectorAll(".products-block__popups");
  const allCloseButtons = document.querySelectorAll(".product-popups__close");
  let isPopupOpen = false;
  let currentPopupsContainer = null;
  function openPopup(productId, container) {
    currentPopupsContainer = container;
    const popups = container.querySelectorAll(".product-popup");
    container.classList.add("product-popups-active");
    disableScroll();
    popups.forEach((popup) => popup.classList.remove("product-popup-active"));
    const activePopup = container.querySelector(`.product-popup[data-product="${productId}"]`);
    if (activePopup) {
      activePopup.classList.add("product-popup-active");
      isPopupOpen = true;
      history.pushState({ popupOpen: true }, "");
    }
  }
  function closePopup() {
    if (!currentPopupsContainer) return;
    currentPopupsContainer.classList.remove("product-popups-active");
    const popups = currentPopupsContainer.querySelectorAll(".product-popup");
    popups.forEach((popup) => popup.classList.remove("product-popup-active"));
    enableScroll();
    isPopupOpen = false;
    if (history.state && history.state.popupOpen) {
      history.back();
    }
    currentPopupsContainer = null;
  }
  products.forEach((product) => {
    const productId = product.getAttribute("data-product");
    if (productId) {
      product.addEventListener("click", () => {
        const container = product.closest(".products-block").querySelector(".products-block__popups");
        openPopup(productId, container);
      });
    }
  });
  allCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closePopup();
    });
  });
  window.addEventListener("popstate", (event) => {
    if (isPopupOpen) {
      closePopup();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isPopupOpen) {
      if (history.state?.popupOpen) {
        history.back();
      } else {
        closePopup();
      }
    }
  });
});
