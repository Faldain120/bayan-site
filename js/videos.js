/* =====================================================================
   Bayan Abunar, MD — Featured video gallery
   ---------------------------------------------------------------------
   HOW TO MANAGE THIS GALLERY (no other file needs editing):
   Edit the VIDEOS array below. Each entry:

     platform : "youtube" | "instagram" | "tiktok"   (required)
     title    : short caption shown under the video   (required)
     meta     : small secondary line (e.g. "1.2M views")
     id       : YouTube ONLY — the 11-char video id (e.g. "dQw4w9WgXcQ").
                YouTube clips play inline on the page.
     url      : Instagram/TikTok — the full post link. These open in a
                new tab on click (their inline embeds are unreliable).
     thumb    : optional custom thumbnail image URL. YouTube auto-uses
                its own thumbnail if omitted.
     placeholder : true  -> shows an empty demo card (remove once real).

   Order in this array = order on the page. First 3 also feed the
   "Featured videos" strip on the home page (data-limit="3").
   ===================================================================== */

(function () {
  "use strict";

  var VIDEOS = [
    { platform: "instagram", title: "Featured Instagram Reel",  meta: "Instagram · add post URL",   url: "", placeholder: true },
    { platform: "tiktok",    title: "Featured TikTok",          meta: "TikTok · add post URL",      url: "", placeholder: true },
    { platform: "youtube",   title: "Featured YouTube Video",   meta: "YouTube · add video ID",     id: "",  placeholder: true },
    { platform: "instagram", title: "Another Instagram Reel",   meta: "Instagram · add post URL",   url: "", placeholder: true },
    { platform: "tiktok",    title: "Another TikTok",           meta: "TikTok · add post URL",      url: "", placeholder: true },
    { platform: "youtube",   title: "Another YouTube Video",    meta: "YouTube · add video ID",     id: "",  placeholder: true }
  ];

  var ICON = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.6 3.6 3.7 3.9v2.4c-1.3.1-2.6-.3-3.7-1v5.9c0 3.4-2.8 5.8-6 5.3-2.6-.4-4.4-2.8-4.1-5.4.3-2.4 2.5-4.2 4.9-4v2.6c-.4-.1-.8-.1-1.2 0-1 .3-1.7 1.2-1.5 2.3.2 1 1.1 1.7 2.1 1.6 1.1-.1 1.8-1 1.8-2.1V3h3.3z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>'
  };
  var LABEL = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" };
  var PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  function thumbFor(v) {
    if (v.thumb) return v.thumb;
    if (v.platform === "youtube" && v.id) return "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
    return null;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function cardHTML(v) {
    var wide = v.platform === "youtube" ? " wide" : "";
    var thumb = thumbFor(v);
    var media = thumb
      ? '<img src="' + esc(thumb) + '" alt="' + esc(v.title) + '" loading="lazy">'
      : '<div class="facade-fallback">' + LABEL[v.platform] + "</div>";
    var play = v.placeholder ? "" : '<span class="play">' + PLAY + "</span>";
    var interactive = v.placeholder ? "" : ' role="button" tabindex="0" aria-label="Play: ' + esc(v.title) + '"';
    return (
      '<article class="video-card" data-platform="' + v.platform + '">' +
        '<div class="facade' + wide + '"' + interactive + ">" +
          '<span class="platform-badge">' + ICON[v.platform] + LABEL[v.platform] + "</span>" +
          media + play +
        "</div>" +
        '<div class="video-meta"><h3>' + esc(v.title) + "</h3><p>" + esc(v.meta || "") + "</p></div>" +
      "</article>"
    );
  }

  function activate(facade, v) {
    if (v.platform === "youtube" && v.id) {
      facade.innerHTML =
        '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) +
        '?autoplay=1&rel=0" title="' + esc(v.title) +
        '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    } else if (v.url) {
      window.open(v.url, "_blank", "noopener");
    }
  }

  function render(container) {
    var limit = parseInt(container.getAttribute("data-limit") || "0", 10);
    var list = limit > 0 ? VIDEOS.slice(0, limit) : VIDEOS;
    container.innerHTML = list.map(cardHTML).join("");
    Array.prototype.forEach.call(container.querySelectorAll(".video-card"), function (card, i) {
      var v = list[i];
      if (v.placeholder) return;
      var facade = card.querySelector(".facade");
      var go = function () { activate(facade, v); };
      facade.addEventListener("click", go);
      facade.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
  }

  function wireTabs() {
    var tabs = document.querySelectorAll(".platform-tab");
    if (!tabs.length) return;
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener("click", function () {
        Array.prototype.forEach.call(tabs, function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        var f = tab.getAttribute("data-filter");
        Array.prototype.forEach.call(document.querySelectorAll("[data-video-gallery] .video-card"), function (card) {
          var show = f === "all" || card.getAttribute("data-platform") === f;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-video-gallery]"), render);
  wireTabs();
})();
