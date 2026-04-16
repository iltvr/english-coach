# SEO Fix Design — english-coach.online

**Date:** 2026-04-16  
**Status:** Approved  
**Goal:** Get the site indexed by both Google and Yandex. Site has been live 3 months with zero indexing.

---

## Root Causes

1. **SPA with no pre-rendered HTML** — crawlers (especially Yandex) see a blank page; all content requires JS execution
2. **No sitemap.xml** — crawlers have no map of pages to index
3. **No robots.txt** — missing standard crawl guidance file
4. **`react-helmet-async` installed but never used** — no per-page meta tags injected into pre-rendered HTML
5. **`html lang="en"` hardcoded** — primary audience is Russian-speaking; contradicts content language
6. **No Google Search Console verification** — Google may not know site exists; no crawl data
7. **No canonical URL tags** — risk of duplicate content signals
8. **No structured data** — missed opportunity for rich results (tutoring service)

---

## Architecture

### Pre-rendering: `vite-ssg`

Replace `vite build` with `vite-ssg build`. At build time, `vite-ssg` renders all 3 routes to static HTML files. Cloudflare Pages serves these directly — crawlers read full content without executing JS.

```
dist/
  index.html                        ← pre-rendered homepage
  privacy-policy/index.html         ← pre-rendered
  terms-of-service/index.html       ← pre-rendered
```

React still hydrates normally on the client — zero UX change for users.

### i18n / Language Strategy

- Pre-render in **Russian** (default, primary audience, Yandex target)
- After hydration, `App.tsx` sets `document.documentElement.lang = i18n.language` — English users get correct `lang="en"` post-hydration
- No hreflang implementation in this phase (single domain, language toggle handled client-side)

### Client-only Guards

`ApplicationForm` uses browser APIs (`navigator.userAgent`, `Intl.DateTimeFormat`, fetch to ipify.org). Guard with `typeof window !== 'undefined'` checks to prevent build-time crashes during SSG.

---

## File Changes

### `package.json`
- Add `vite-ssg` dependency
- Change build script: `vite build` → `vite-ssg build`

### `src/main.tsx`
- Replace `ReactDOM.createRoot` entrypoint with `ViteSSG` export from `vite-ssg`
- Pass routes array to `ViteSSG`

### `src/routes.tsx` (new)
- Extract route definitions from `App.tsx` into shared array
- Used by both `ViteSSG` (for pre-render) and `App.tsx` (for runtime routing)

### `src/pages/home/index.tsx`
- Add `<Helmet>` with: title, meta description (Russian), canonical URL, JSON-LD structured data

### `src/pages/privacy-policy/index.tsx`
- Add `<Helmet>` with: title, canonical URL

### `src/pages/terms-of-service/index.tsx`
- Add `<Helmet>` with: title, canonical URL

### `public/robots.txt` (new)
```
User-agent: *
Allow: /
Sitemap: https://english-coach.online/sitemap.xml
```

### `public/sitemap.xml` (new)
Three URLs: `/`, `/privacy-policy`, `/terms-of-service` with `lastmod` and `priority` values.

### `index.html`
- Fix `lang="ru"` (was `lang="en"`)
- Add Google Search Console `<meta name="google-site-verification">` tag (value TBD — requires GSC account setup)
- Fix `<title>` fallback: ensure `VITE_APP_TITLE` is set in Cloudflare Pages env vars

### `src/components/application-form.tsx`
- Add `typeof window !== 'undefined'` guards around browser API calls for SSG compatibility

---

## JSON-LD Structured Data (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "English Coach — Ольга Дубинина",
  "url": "https://english-coach.online",
  "description": "Индивидуальные уроки английского для бизнеса, учёбы и личностного роста",
  "founder": {
    "@type": "Person",
    "name": "Ольга Дубинина"
  }
}
```

---

## Post-Deploy Actions (manual)

1. **Google Search Console:** Add property for `english-coach.online`, verify via meta tag, submit sitemap URL
2. **Yandex Webmaster:** Yandex verification tag already present (`df9a0aff30a51ab8`) — submit sitemap there too
3. **Request indexing:** Use GSC "URL Inspection" tool to request crawl of homepage

---

## Out of Scope

- SSR (server-side rendering at request time) — not needed for static landing page
- hreflang tags — deferred; single domain with client-side language toggle
- Cloudflare Workers — not needed
- Dark mode, performance optimizations unrelated to SEO
