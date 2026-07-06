# DrBayanAbunar.com

Personal website for **Bayan Abunar, MD** — board-certified OB/GYN.
Static, no build step. Just HTML, CSS, and a little vanilla JavaScript.

- **Canonical domain:** DrBayanAbunar.com (BayanAbunar.com 301-redirects to it)
- **Hosting:** Cloudflare Pages (recommended) — see *Deploy* below
- **Registrar:** Porkbun (both domains)

---

## Preview locally

No tooling required — just open `index.html` in a browser. For a more accurate
preview (clean paths, so root-relative things behave), run any static server:

```bash
# Python (already on this machine at C:\Python313\python.exe)
python -m http.server 8080
# then open http://localhost:8080
```

---

## File map

```
index.html          Home
about.html          About / bio
credentials.html    Education, training, certification
videos.html         Featured social-video gallery
contact.html        Contact info + form
styles/global.css   All styling + design tokens (colors, type)
js/main.js          Mobile nav + footer year
js/videos.js        Featured video list + gallery rendering  <-- edit videos here
assets/             Images (headshot placeholder, etc.)
favicon.svg         Site icon
robots.txt          / sitemap.xml   SEO
_headers            Cloudflare Pages caching + security headers
plans/              Kickoff / decisions doc
```

The header and footer markup is duplicated in each `.html` file (deliberate — keeps
the site build-free and openable by double-click). If you change the nav or footer,
update it in all five pages.

---

## How to edit content

### Text & credentials
Open the relevant `.html` file and edit the copy. Anything wrapped like
`[Medical School Name]` or flagged **Placeholder** is meant to be replaced.
`about.html` and `credentials.html` hold the bracketed factual placeholders.

### Featured videos  (`js/videos.js`)
Edit the `VIDEOS` array at the top of the file. For each video:
- **YouTube** — set `id` to the 11-character video id → plays inline on the page.
- **Instagram / TikTok** — set `url` to the post link → opens in a new tab on click.
- Remove `placeholder: true` once a card is real.
- Order in the array = order on the page; the first 3 also show on the home page.

### Brand colors / fonts  (`styles/global.css`)
All colors and fonts are CSS variables in the `:root {}` block at the top —
evergreen `--primary`, gold `--accent`, blush, ivory, etc.

### Social links
The Instagram / TikTok / YouTube links currently point to each platform's home page.
Search each `.html` file for `https://www.instagram.com/`, `https://www.tiktok.com/`,
`https://www.youtube.com/` and replace with her real profile URLs.

---

## Placeholders to replace before launch

- [ ] **Headshot** — replace `assets/headshot-placeholder.svg` (used in `index.html`
      hero + about teaser). Add a real photo (e.g. `assets/headshot.jpg`) and update the
      two `<img src>` references.
- [ ] **Name / post-nominals** — confirm `Bayan Abunar, MD` (add `FACOG` etc. if applicable).
- [ ] **About** bio paragraphs (`about.html`) + "At a Glance" location.
- [ ] **Credentials** (`credentials.html`) — med school, residency, certification year,
      license, memberships, clinical interests, any publications/talks.
- [ ] **Social handles** — real Instagram / TikTok / YouTube URLs (all pages).
- [ ] **Featured videos** — real entries in `js/videos.js`.
- [ ] **Contact email** — currently `hello@drbayanabunar.com` (set up email forwarding
      in Porkbun, or change it).
- [ ] **Contact form** — replace the Formspree `action` URL in `contact.html` (or wire
      Cloudflare Pages Forms / Web3Forms).
- [ ] **OG share image** — create `assets/og-image.png` (1200×630) for link previews;
      referenced in every page's `<head>`.
- [ ] **Practice address** (`contact.html`) if she wants it listed.

---

## Deploy (Cloudflare Pages + Porkbun)

1. Push this repo to GitHub (e.g. `Faldain120/bayan-site`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** →
   pick the repo. Framework preset **None**, build command **empty**, output dir **`/`**.
3. After the first deploy, add the custom domain **`drbayanabunar.com`** (and `www`)
   under the Pages project's *Custom domains*.
4. **DNS:** easiest path is to move both domains' nameservers to Cloudflare (Porkbun →
   Authoritative Nameservers → Cloudflare's), which lets Cloudflare manage the Pages
   domain and the redirect. Alternatively keep Porkbun DNS and add the CNAME Cloudflare
   provides.
5. **Redirect `bayanabunar.com` → `drbayanabunar.com`:**
   - On Cloudflare NS: add `bayanabunar.com` as a zone and create a **Redirect Rule**
     (301, preserve path) to `https://drbayanabunar.com/$1`, or
   - Fallback: use **Porkbun's URL Forwarding** on `bayanabunar.com` (301 → drbayanabunar.com).
6. Verify: HTTPS padlock, `bayanabunar.com` redirects, and the canonical tag resolves.

---

*Scaffolded 2026-07-05. Decisions recorded in `plans/kickoff-drbayanabunar.md`.*
