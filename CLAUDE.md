# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (requires 2 terminals)
npm run dev           # Vite frontend on :5173
npm run pages:dev     # Cloudflare Pages Functions on :8788 (required for /api/send)

# Build & check
npm run build         # tsc --noCheck + vite-react-ssg build (pre-renders 3 HTML files)
npm run lint          # ESLint, 0 warnings allowed

# Test
npm test              # Jest + React Testing Library
npm test -- --testPathPattern=<file>  # single test file

# Deploy
npm run pages:publish  # deploy to Cloudflare Pages production
```

## Architecture

**English-coach** is a landing site for an English tutoring service. React 18 + TypeScript + SSG frontend, Cloudflare Pages Functions backend.

### SSG (Static Site Generation)

Uses `vite-react-ssg`. Entry point is `src/main.tsx` which exports `createRoot = ViteReactSSG({ routes })`. Routes are defined in `src/routes.tsx` with `App` as layout wrapper and 4 lazy-loaded page components as children.

Pre-renders: `/`, `/privacy-policy`, `/terms-of-service`, `/personal-data-consent` → HTML files in `dist/`.

**SSG guard pattern:** Any browser-only code (`window`, `document`, `localStorage`) must be wrapped in `typeof window !== 'undefined'` or inside `useEffect`.

`vite.config.ts` uses `isSsrBuild` flag to skip `manualChunks` during SSR build (they conflict with SSR bundling).

### Request flow

1. `ApplicationForm` (React Hook Form) collects 8 fields + metadata (IP via ipify.org, UA, timezone)
2. `src/services/api-service.ts` → `email-service.ts` → `fetch POST /api/send`
3. Vite dev proxy forwards `/api` → `localhost:8788` (Cloudflare Pages local runtime)
4. `functions/api/send.js` validates payload, builds HTML email via `src/utils/buildEmailTemplate.js`, sends via SMTP2GO HTTP API
5. `telegram-service.ts` exists but is currently disabled (commented out in `api-service.ts`)

### Key patterns

**i18n:** i18next with browser language detection, fallback Russian. Two locales: `src/locales/en/` and `src/locales/ru/`. Language change fires custom `languageChanged` DOM event to force re-render. Legal pages (privacy-policy, terms-of-service) store full document content in translation files as `sections` arrays with `title` + `paragraphs[]` — rendered via `t('key', { returnObjects: true })` and `dangerouslySetInnerHTML`. `/personal-data-consent` is Russian-only (linked from footer only when `!i18n.language.startsWith('en')`).

**Form:** React Hook Form `mode: "onTouched"` with `Controller` wrapper for HeroUI components. Required: name, email, contact, termsAgreed. Optional: timeSlot, weeklyTime, purpose, experience, marketingConsent. Turnstile CAPTCHA wired in but commented out — token field exists in payload schema. HeroUI Select fires `onBlur` on close — destructure and discard `onBlur` from Controller field spread to prevent premature validation.

**Styling:** Tailwind + HeroUI component library. Custom theme in `tailwind.config.js` (primary: sky blue `#0ea5e9`, fonts: Inter/Merriweather). Light mode only.

**CORS:** Declared in both `_headers` (static Cloudflare config) and `functions/api/send.js` response headers. Whitelist: `english-coach.online`, `english-coach.pages.dev`, `localhost:5173`.

**Per-page SEO:** `<Head>` from `vite-react-ssg` (not react-helmet-async) injects title, canonical, and JSON-LD per page at build time.

**Cookie consent:** `CookieBanner` component (rendered in `App.tsx`) reads/writes `localStorage` key `cookie_consent` via `useCookieConsent` hook. Shows until user accepts all or essential-only.

### Environment variables

Frontend vars use `VITE_` prefix (build-time). Backend reads from Cloudflare Pages secrets (same names, accessed via `env.*`). Local secrets go in `.dev.vars` (git-ignored).

Required vars: `VITE_SMTP2GO_API_KEY`, `VITE_RECIPIENT_EMAIL`, `VITE_TELEGRAM_BOT_TOKEN`, `VITE_TELEGRAM_CHAT_ID`, `VITE_TURNSTILE_SITE_KEY`.

### Code splitting

Vite manually splits bundles: `vendor` (React/router), `ui` (HeroUI/Framer Motion), `i18n` (i18next). Defined in `vite.config.ts` `manualChunks`. Skipped during SSR build via `isSsrBuild` guard.

### Tests

Jest + ts-jest + jsdom. Config in `jest.config.cjs`. Test setup in `src/test-setup.js` (polyfills `IntersectionObserver`, `ResizeObserver`, `fetch`).

`src/__tests__/setup.js` is excluded from test discovery via `testPathIgnorePatterns` — it's an old file kept for reference only.

i18next needs `esModuleInterop: true` in ts-jest config to resolve the default import.
