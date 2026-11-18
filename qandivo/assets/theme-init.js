(function () {
  try {
    var mode = localStorage.getItem("qd.landing.theme");
    if (mode !== "light" && mode !== "dark" && mode !== "ember") {
      mode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", mode);
  } catch {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
