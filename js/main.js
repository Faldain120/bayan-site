/* Bayan Abunar, MD — shared site behavior: mobile nav + footer year */
(function () {
  "use strict";

  // ---- mobile navigation ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close the menu after tapping a link
    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- current year in footer ----
  var year = new Date().getFullYear();
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = year;
  });
})();
