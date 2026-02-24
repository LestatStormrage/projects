function getHash() {
  if (location.hash) {
    return location.hash.replace("#", "");
  }
}
let slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("--slide")) {
    target.classList.add("--slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("--slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }, duration);
  }
};
let slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("--slide")) {
    target.classList.add("--slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("--slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }, duration);
  }
};
let slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.hasAttribute("data-fls-scrolllock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
    setTimeout(() => {
      lockPaddingElements.forEach((lockPaddingElement) => {
        lockPaddingElement.style.paddingRight = "";
      });
      document.body.style.paddingRight = "";
      document.documentElement.removeAttribute("data-fls-scrolllock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function() {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement) => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    });
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.setAttribute("data-fls-scrolllock", "");
    bodyLockStatus = false;
    setTimeout(function() {
      bodyLockStatus = true;
    }, delay);
  }
};
function uniqArray(array) {
  return array.filter((item, index, self) => self.indexOf(item) === index);
}
const gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = "";
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = "header.header";
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains("--header-scroll")) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add("--header-scroll");
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove("--header-scroll");
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
    if (document.documentElement.hasAttribute("data-fls-menu-open")) {
      bodyUnlock();
      document.documentElement.removeAttribute("data-fls-menu-open");
    }
    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
    window.scrollTo({
      top: targetBlockElementPosition,
      behavior: "smooth"
    });
  }
};
document.querySelectorAll("section").forEach((section) => {
  if (!section.classList.contains("no-bg") && !section.querySelector(".parallax-bg")) {
    const bg = document.createElement("div");
    bg.classList.add("parallax-bg");
    section.classList.forEach((cls) => {
      if (cls.startsWith("bg-")) {
        bg.classList.add("parallax-" + cls);
      }
    });
    section.prepend(bg);
  }
});
function updateParallax() {
  const scrolled = window.scrollY;
  document.querySelectorAll("section:not(.no-bg)").forEach((section) => {
    const speed = -0.2;
    const relativeY = scrolled - section.offsetTop;
    const bg = section.querySelector(".parallax-bg");
    if (bg) {
      const offset = relativeY * speed;
      bg.style.backgroundPosition = `center ${-offset}px`;
    }
  });
}
window.addEventListener("load", updateParallax);
document.addEventListener("scroll", updateParallax);
const locales = [
  "da-DK",
  "de-DE",
  "en-GB",
  "et-EE",
  "fi-FI",
  "fr-FR",
  "lt-LT",
  "lv-LV",
  "nl-NL",
  "no-NO",
  "pl-PL",
  "sv-SE"
];
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");
function getFlagSrc(countryCode) {
  if (!countryCode) return "";
  return `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`;
}
function getNestedTranslation(obj, path) {
  return path.split(".").reduce((acc, key) => acc && acc[key] !== void 0 ? acc[key] : null, obj);
}
async function loadLanguage(locale) {
  const pageName = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  const langCode = locale.split("-")[0];
  try {
    const [commonRes, pageRes] = await Promise.all([
      fetch(`files/lang/${langCode}/common.json`),
      fetch(`files/lang/${langCode}/${pageName}.json`)
    ]);
    const [commonTranslations, pageTranslations] = await Promise.all([
      commonRes.json(),
      pageRes.json()
    ]);
    const translations = { ...commonTranslations, ...pageTranslations };
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getNestedTranslation(translations, key);
      if (value !== null && value !== void 0) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = getNestedTranslation(translations, key);
      if (value !== null && value !== void 0) el.placeholder = value;
    });
    document.querySelectorAll("select[data-fls-select]").forEach((select) => {
      select.querySelectorAll("option[data-i18n]").forEach((option) => {
        const key = option.dataset.i18n;
        const value = getNestedTranslation(translations, key);
        if (value !== null && value !== void 0) option.textContent = value;
      });
      const selectItem = select.parentElement.querySelector(".select__body");
      if (selectItem) {
        const buttons = selectItem.querySelectorAll(".select__option");
        buttons.forEach((btn) => {
          const val = btn.dataset.flsSelectValue;
          const correspondingOption = select.querySelector(`option[value="${val}"]`);
          if (correspondingOption) {
            btn.innerHTML = correspondingOption.textContent;
          }
        });
        const selectedOption = select.options[select.selectedIndex];
        const titleContent = selectItem.querySelector(".select__title .select__content");
        if (titleContent && selectedOption) {
          titleContent.textContent = selectedOption.textContent;
        }
      }
    });
    const metaTitle = getNestedTranslation(translations, "_metaTitle");
    const metaDescription = getNestedTranslation(translations, "_metaDescription");
    if (metaTitle) document.title = metaTitle;
    if (metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", metaDescription);
    }
    document.documentElement.lang = langCode;
    return locale;
  } catch (err) {
    console.error("Translation load error:", err);
    return locale;
  }
}
function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  const region = intlLocale.region || locale.split("-")[1] || "GB";
  const langName = new Intl.DisplayNames([locale], { type: "language" }).of(intlLocale.language);
  dropdownBtn.innerHTML = `<img src="${getFlagSrc(region)}" alt="${langName} flag"><span class="lang-name">${langName}</span><span class="arrow-down"></span>`;
  dropdownContent.innerHTML = "";
  locales.filter((l) => l !== locale).forEach((other) => {
    const otherIntl = new Intl.Locale(other);
    const otherRegion = otherIntl.region || other.split("-")[1] || "GB";
    const otherName = new Intl.DisplayNames([other], { type: "language" }).of(otherIntl.language);
    const li = document.createElement("li");
    li.innerHTML = `<img src="${getFlagSrc(otherRegion)}" alt="${otherName} flag"><span class="locale-name">${otherName}</span>`;
    li.addEventListener("click", () => {
      setLanguage(other);
      dropdown.classList.remove("open");
    });
    dropdownContent.appendChild(li);
  });
}
async function setLanguage(locale) {
  localStorage.setItem("selectedLang", locale);
  await loadLanguage(locale);
  setSelectedLocale(locale);
}
document.addEventListener("DOMContentLoaded", async () => {
  let saved = localStorage.getItem("selectedLang");
  if (!saved) {
    const browserLang = new Intl.Locale(navigator.language).language;
    const matched = locales.find((l) => new Intl.Locale(l).language === browserLang);
    saved = matched || "en-GB";
    localStorage.setItem("selectedLang", saved);
  }
  await loadLanguage(saved);
  setSelectedLocale(saved);
});
const dropdown = document.querySelector(".header__language-dropdown");
dropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("open");
});
document.addEventListener("click", () => {
  dropdown.classList.remove("open");
});
export {
  getHash as a,
  bodyUnlock as b,
  slideToggle as c,
  bodyLockToggle as d,
  bodyLockStatus as e,
  gotoBlock as g,
  slideUp as s,
  uniqArray as u
};
