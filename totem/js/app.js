(() => {
    "use strict";
    const modules_flsModules = {};
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class MousePRLX {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
                if (paralaxMouse.length) {
                    this.paralaxMouseInit(paralaxMouse);
                    this.setLogging(`Прокинувся, стежу за об'єктами: (${paralaxMouse.length})`);
                } else this.setLogging("Немає жодного обєкта. Сплю...");
            }
        }
        paralaxMouseInit(paralaxMouse) {
            paralaxMouse.forEach((el => {
                const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");
                const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
                const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
                const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
                const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
                const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
                let positionX = 0, positionY = 0;
                let coordXprocent = 0, coordYprocent = 0;
                setMouseParallaxStyle();
                if (paralaxMouseWrapper) mouseMoveParalax(paralaxMouseWrapper); else mouseMoveParalax();
                function setMouseParallaxStyle() {
                    const distX = coordXprocent - positionX;
                    const distY = coordYprocent - positionY;
                    positionX += distX * paramAnimation / 1e3;
                    positionY += distY * paramAnimation / 1e3;
                    el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
                    requestAnimationFrame(setMouseParallaxStyle);
                }
                function mouseMoveParalax(wrapper = window) {
                    wrapper.addEventListener("mousemove", (function(e) {
                        const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                        if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
                            const parallaxWidth = window.innerWidth;
                            const parallaxHeight = window.innerHeight;
                            const coordX = e.clientX - parallaxWidth / 2;
                            const coordY = e.clientY - parallaxHeight / 2;
                            coordXprocent = coordX / parallaxWidth * 100;
                            coordYprocent = coordY / parallaxHeight * 100;
                        }
                    }));
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[PRLX Mouse]: ${message}`) : null;
        }
    }
    modules_flsModules.mousePrlx = new MousePRLX({});
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    document.addEventListener("DOMContentLoaded", (function() {
        document.querySelectorAll(".switch__label").forEach((function(label) {
            label.addEventListener("click", (function() {
                document.querySelector(".switch").classList.toggle("switch-border");
            }));
        }));
    }));
    let darkmode = localStorage.getItem("darkmode");
    const themeSwitch = document.getElementById("switch__checkbox");
    const enableDarkmode = () => {
        document.body.classList.add("darkmode");
        localStorage.setItem("darkmode", "active");
        themeSwitch.checked = true;
    };
    const disableDarkmode = () => {
        document.body.classList.remove("darkmode");
        localStorage.setItem("darkmode", "inactive");
        themeSwitch.checked = false;
    };
    if (darkmode === null) if (window.matchMedia("(prefers-color-scheme: dark)").matches) enableDarkmode(); else disableDarkmode(); else if (darkmode === "active") enableDarkmode(); else disableDarkmode();
    window.addEventListener("load", (() => {
        document.body.classList.add("transition-ready");
    }));
    themeSwitch.addEventListener("change", (() => {
        if (themeSwitch.checked) enableDarkmode(); else disableDarkmode();
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        let currentPage = window.location.pathname;
        if (!currentPage || currentPage === "/" || currentPage.endsWith("/index.html")) currentPage = "index"; else currentPage = currentPage.split("/").pop();
        const menuLinks = document.querySelectorAll(".menu__list .menu__item a");
        menuLinks.forEach((link => {
            let linkPage = link.getAttribute("href");
            if (!linkPage || linkPage === "/" || linkPage === "index.html") linkPage = "index";
            if (currentPage === linkPage) link.parentElement.classList.add("active");
        }));
    }));
    function disableScroll() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        const header = document.querySelector("header");
        if (header) header.style.paddingRight = `${scrollbarWidth}px`;
    }
    function enableScroll() {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        const header = document.querySelector("header");
        if (header) header.style.paddingRight = "";
    }
    document.addEventListener("DOMContentLoaded", (function() {
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
            popups.forEach((popup => popup.classList.remove("product-popup-active")));
            const activePopup = container.querySelector(`.product-popup[data-product="${productId}"]`);
            if (activePopup) {
                activePopup.classList.add("product-popup-active");
                isPopupOpen = true;
                history.pushState({
                    popupOpen: true
                }, "");
            }
        }
        function closePopup() {
            if (!currentPopupsContainer) return;
            currentPopupsContainer.classList.remove("product-popups-active");
            const popups = currentPopupsContainer.querySelectorAll(".product-popup");
            popups.forEach((popup => popup.classList.remove("product-popup-active")));
            enableScroll();
            isPopupOpen = false;
            if (history.state && history.state.popupOpen) history.back();
            currentPopupsContainer = null;
        }
        products.forEach((product => {
            product.addEventListener("click", (() => {
                const productId = product.getAttribute("data-product");
                const container = product.closest(".products-block").querySelector(".products-block__popups");
                openPopup(productId, container);
            }));
        }));
        allCloseButtons.forEach((button => {
            button.addEventListener("click", (() => {
                closePopup();
            }));
        }));
        window.addEventListener("popstate", (event => {
            if (isPopupOpen) closePopup();
        }));
        document.addEventListener("keydown", (event => {
            if (event.key === "Escape" && isPopupOpen) if (history.state?.popupOpen) history.back(); else closePopup();
        }));
    }));
    const script_images = document.querySelectorAll(".about-us__image");
    if (script_images.length > 0) {
        let current = 0;
        const interval = 1e4;
        function showNextImage() {
            const total = script_images.length;
            script_images.forEach(((img, i) => {
                img.style.opacity = i === current ? "1" : "0";
                img.style.transition = "opacity 2s ease-in-out";
            }));
            current = (current + 1) % total;
        }
        showNextImage();
        setInterval(showNextImage, interval);
    }
    if ((window.location.pathname === "/" || window.location.pathname === "/index.html") && !localStorage.getItem("preferredLanguage")) {
        const userLang = navigator.language || navigator.userLanguage;
        const shortLang = new Intl.Locale(userLang).language;
        if (shortLang === "lt") {
            localStorage.setItem("preferredLanguage", "lt-LT");
            window.location.href = "/lt/index.html";
        } else localStorage.setItem("preferredLanguage", "en-GB");
    }
    const preferredLang = localStorage.getItem("preferredLanguage");
    if ((window.location.pathname === "/" || window.location.pathname === "/index.html") && preferredLang && new Intl.Locale(preferredLang).language === "lt") window.location.href = "/lt/index.html";
    const locales = [ "en-GB", "lt-LT" ];
    function getFlagSrc(countryCode) {
        return /^[A-Z]{2}$/.test(countryCode) ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png` : "";
    }
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    function setSelectedLocale(locale) {
        const intlLocale = new Intl.Locale(locale);
        const langName = new Intl.DisplayNames([ locale ], {
            type: "language"
        }).of(intlLocale.language);
        dropdownContent.innerHTML = "";
        const otherLocales = locales.filter((loc => loc !== locale));
        otherLocales.forEach((otherLocale => {
            const otherIntlLocale = new Intl.Locale(otherLocale);
            const otherLangName = new Intl.DisplayNames([ otherLocale ], {
                type: "language"
            }).of(otherIntlLocale.language);
            const listEl = document.createElement("li");
            listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(otherIntlLocale.region)}" />`;
            listEl.value = otherLocale;
            listEl.addEventListener("mousedown", (function() {
                localStorage.setItem("preferredLanguage", otherLocale);
                const langCode = new Intl.Locale(otherLocale).language;
                if (langCode === "lt") window.location.href = "/lt/index.html"; else window.location.href = "/index.html";
            }));
            dropdownContent.appendChild(listEl);
        }));
        dropdownBtn.innerHTML = `<img src="${getFlagSrc(intlLocale.region)}" />${langName}<span class="arrow-down"></span>`;
    }
    setSelectedLocale(locales[0]);
    const browserLang = new Intl.Locale(navigator.language).language;
    for (const locale of locales) {
        const localeLang = new Intl.Locale(locale).language;
        if (localeLang === browserLang) setSelectedLocale(locale);
    }
    window["FLS"] = true;
    menuInit();
    headerScroll();
})();