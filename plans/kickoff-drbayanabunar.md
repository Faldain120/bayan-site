# Kickoff: DrBayanAbunar.com — personal physician website

**Date:** 2026-07-05
**Status:** Scaffolding (owner authorized "scaffold it all" with placeholder content)

## Goal
A professional, elegant personal website for **Bayan Abunar, MD** — a board-certified
OB/GYN — that establishes an authoritative online presence under her own name. The site
is her canonical home on the web: it presents her credentials, tells her story, features
her social-media videos, and gives colleagues, patients, recruiters, and press a
trustworthy page when they search for her. It is a **personal brand**, distinct from
ObMob (the company she co-founded) and from ObMob's marketing site.

## In scope
- Multi-page static site: **Home · About · Credentials · Videos · Contact**
- Distinct, elegant "warm-clinical" visual identity (own palette + type, NOT ObMob's)
- A **curated featured-video gallery** pulling from Instagram, TikTok, and YouTube
- Two-way social cross-referencing (site → socials via links/embeds; socials → site via bio links)
- SEO basics (titles, meta descriptions, Open Graph, robots.txt, sitemap.xml)
- Responsive / mobile-friendly layout
- Deploy plan for **Cloudflare Pages** + **Porkbun** DNS, DrBayanAbunar.com canonical

## Out of scope (for v1)
- Patient portal, appointment booking, or any PHI/patient-data handling
- A blog / CMS (can be added later — noted as a future option)
- Auto-pulling "trending/popular" videos via platform APIs (fragile; see Decision 5)
- E-commerce, memberships, or gated content
- Real content authoring — v1 ships with clearly-marked placeholders to be replaced

## Constraints
- **Credentials must be accurate.** Presented as **board-certified OB/GYN** per owner.
  All specific facts (med school, residency, license, affiliations) are placeholders
  until Bayan supplies them — must be verified before launch.
- **Distinct from ObMob brand** — no reuse of ObMob navy/teal/gold or Newsreader type.
- Domains registered at **Porkbun**; must not assume Namecheap tooling.
- Should stay dead-simple to maintain (no heavy framework / build step for v1).

## Decisions
| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | Primary purpose / audience | **Professional presence / personal brand** | Credibility + findability for a DrName.com site; broadest value |
| 2 | Professional standing | **Board-certified OB/GYN** | Owner-confirmed (corrected my board-eligible guess) |
| 3 | Visual direction | **Distinct & elegant, warm-clinical** | Her brand stands independent of ObMob |
| 4 | Site scope | **Multi-page** (5 pages) | Room to grow; more authoritative than one-pager |
| 5 | Video mechanism | **Curated featured set** (YouTube inline; IG/TikTok facade→link out); optional YouTube auto-latest via RSS later | Auto-popular-all-platforms needs API app review + expiring tokens; IG/TikTok embeds are fragile. Curated = full control, zero maintenance, always looks intentional |
| 6 | Platforms | **Instagram, TikTok, YouTube** | Where her video content lives |
| 7 | Canonical domain | **DrBayanAbunar.com** (BayanAbunar.com 301→) | "Dr" signals the credential; one canonical URL for SEO |
| 8 | Stack | **Static HTML/CSS/JS**, Cloudflare Pages | No build friction; trivial deploy; easy hand-editing |
| 9 | ObMob mention | Tasteful "Co-Founder of ObMob" line in bio (not a section) | Keeps personal brand primary while noting the venture |

## Brand tokens (v1)
- **Palette:** warm ivory `#FAF6F0` bg · deep evergreen `#2F4A40` primary · brushed gold
  `#B08640` accent · soft blush `#E7D3CB` · warm near-black `#201C19` ink
- **Type:** Fraunces (display serif) + Mulish (body sans)
- **Feel:** editorial, warm, credible, calm-clinical

## Success criteria
- [ ] All 5 pages render correctly on desktop and mobile (open locally + on Pages)
- [ ] Navigation, active states, and footer consistent across every page
- [ ] Video gallery renders cards; a real YouTube URL plays inline; IG/TikTok cards link out
- [ ] SEO tags present on every page; robots.txt + sitemap.xml valid
- [ ] BayanAbunar.com redirects to DrBayanAbunar.com; site served over HTTPS
- [ ] Every placeholder is clearly marked and enumerated in the README for easy replacement

## Implementation plan
1. Kickoff doc → verify: this file exists and captures decisions
2. Design system (global.css + fonts) → verify: tokens render, typography loads
3. Home page → verify: hero, highlights, CTAs render on desktop + mobile
4. About page → verify: bio + philosophy sections render
5. Credentials page → verify: education/training/certification/affiliation blocks render
6. Videos page + js/videos.js → verify: cards render from data; facade play works
7. Contact page → verify: contact info + form (mailto or Formspree-ready) render
8. Shared assets (nav JS, favicon, placeholder headshot, icons, SEO files, README) → verify: no broken links/images
9. git init + first commit → verify: `git status` clean, site opens in browser

## Deploy plan (later step — needs Justin's Porkbun/Cloudflare access)
1. Push repo to GitHub (`Faldain120/bayan-site`).
2. Cloudflare Pages → connect repo → framework preset "None", build command empty,
   output dir `/` (site is at repo root).
3. Add custom domain `drbayanabunar.com` (+ `www`) to the Pages project.
4. In Porkbun: either move nameservers to Cloudflare (recommended — enables Pages custom
   domains + Redirect Rules), OR keep Porkbun DNS and CNAME/ALIAS to the `*.pages.dev` host.
5. Add `bayanabunar.com` and set a **301 redirect → drbayanabunar.com** (Cloudflare Redirect
   Rule if on Cloudflare NS, or Porkbun URL-forwarding as a fallback).
6. Verify HTTPS + redirect + canonical tag.

## Content still needed from Bayan (replaces placeholders)
Headshot; exact display name + post-nominals (FACOG?); med school (+year); residency
(program + years); any fellowship; ABOG certification year + any subspecialty cert;
current practice / affiliation / state license(s) / clinical focus; bio paragraph;
publications / talks / awards / press (if any); Instagram / TikTok / YouTube handles;
~3-6 featured video URLs per platform; contact email; how prominently to feature ObMob.

## Open questions (deferred)
- FACOG / professional memberships — pending Bayan's input (affects post-nominals)
- Contact form backend — placeholder is a `mailto:`; swap to Formspree/Cloudflare
  form handler if she wants a no-email-exposed form (decide when email is provided)
- Whether to add a blog later (out of scope for v1)
