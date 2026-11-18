(function () {
  var currentThemeMode = "light";

  function themedPath(baseName, theme) {
    return "assets/images/" + baseName + "-" + theme + ".png";
  }

  function syncGalleryStage(gallery, theme) {
    var activeThumb = gallery.querySelector(".qd-thumb.active") || gallery.querySelector(".qd-thumb");
    if (!activeThumb) return;
    var stage = gallery.querySelector(".qd-gallery-stage");
    var stageImg = stage ? stage.querySelector("img") : null;
    var shotBase = activeThumb.getAttribute("data-gallery-shot");
    var title = activeThumb.getAttribute("data-gallery-title") || "";
    if (!stage || !stageImg || !shotBase) return;
    var resolved = themedPath(shotBase, theme);
    stageImg.setAttribute("data-themed-shot", shotBase);
    stageImg.setAttribute("src", resolved);
    stage.setAttribute("data-lightbox-src", resolved);
    if (title) stage.setAttribute("data-lightbox-title", title);
  }

  function syncLogos(theme) {
    currentThemeMode = theme;
    var logoPath = theme === "ember" ? "assets/svg/qandivo-logo-ember.svg" : "assets/svg/qandivo-logo.svg";
    document.querySelectorAll("[data-brand-mark]").forEach(function (img) {
      img.setAttribute("src", logoPath);
    });

    // Update every themed thumbnail and standalone screenshot across all landing pages.
    document.querySelectorAll("img[data-themed-shot]").forEach(function (img) {
      var base = img.getAttribute("data-themed-shot");
      if (!base) return;
      var resolved = themedPath(base, theme);
      img.setAttribute("src", resolved);
      var fig = img.closest("[data-lightbox-src]");
      if (fig) fig.setAttribute("data-lightbox-src", resolved);
    });

    // Ensure gallery stages match their active thumbnail in the selected theme.
    document.querySelectorAll(".qd-gallery").forEach(function (gallery) {
      syncGalleryStage(gallery, theme);
    });
  }

  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem("qd.landing.theme", mode); } catch {}
    document.querySelectorAll("[data-theme-btn]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-theme-btn") === mode);
    });
    syncLogos(mode);
  }

  function applyLang(lang) {
    var dict = (window.QD_I18N && window.QD_I18N[lang]) || (window.QD_I18N && window.QD_I18N.en) || {};
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("qd.landing.lang", lang); } catch {}
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(currentTheme);

    var savedLang = "en";
    try { savedLang = localStorage.getItem("qd.landing.lang") || "en"; } catch {}
    applyLang(savedLang === "uk" ? "uk" : "en");

    document.querySelectorAll("[data-theme-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(btn.getAttribute("data-theme-btn"));
      });
    });

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });

    // Interactive multi-shot galleries inside feature spotlights
    document.querySelectorAll(".qd-gallery").forEach(function (gallery) {
      var thumbs = gallery.querySelectorAll(".qd-thumb");
      thumbs.forEach(function (thumb) {
        thumb.addEventListener("click", function () {
          thumbs.forEach(function (t) {
            t.classList.remove("active");
          });
          thumb.classList.add("active");
          syncGalleryStage(gallery, currentThemeMode);
        });
      });
    });

    // Lightbox for screenshots
    var lightbox = document.getElementById("lightbox");
    var lbImg = document.getElementById("lightbox-img");
    var lbCaption = document.getElementById("lightbox-caption");
    var lbClose = document.getElementById("lightbox-close");

    function closeLightbox() {
      if (lightbox) lightbox.classList.remove("open");
    }

    document.querySelectorAll("[data-lightbox-src]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        if (!lightbox || !lbImg) return;
        lbImg.setAttribute("src", trigger.getAttribute("data-lightbox-src"));
        lbImg.setAttribute("alt", trigger.getAttribute("data-lightbox-title") || "");
        if (lbCaption) lbCaption.textContent = trigger.getAttribute("data-lightbox-title") || "";
        lightbox.classList.add("open");
      });
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  });
})();
