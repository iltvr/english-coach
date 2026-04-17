# English Coach — Landing Site

Landing site for an English tutoring service. React 18 + TypeScript SPA with SSG pre-rendering, deployed on Cloudflare Pages.

**Live:** https://english-coach.online

## Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, HeroUI
- **SSG:** vite-react-ssg (pre-renders 3 routes at build time)
- **Backend:** Cloudflare Pages Functions (`functions/api/send.js`)
- **Email:** SMTP2GO HTTP API
- **i18n:** i18next, Russian default with English fallback

## Development

Two terminals required:

```bash
# Terminal 1 — Cloudflare Pages Functions (required for form submission)
npm run pages:dev       # http://localhost:8788

# Terminal 2 — Vite frontend
npm run dev             # http://localhost:5173
```

Vite proxies `/api` → `localhost:8788` via `vite.config.ts`.

## Commands

```bash
npm run build           # tsc + vite-react-ssg build (pre-renders HTML)
npm run lint            # ESLint, 0 warnings allowed
npm test                # Jest + React Testing Library
npm test -- --testPathPattern=<file>  # single test file
npm run pages:publish   # deploy to Cloudflare Pages production
```

## Environment Variables

Frontend (`VITE_` prefix, build-time):

```ini
VITE_API_BASE_URL=http://localhost:8788/api
VITE_SMTP2GO_API_KEY=
VITE_RECIPIENT_EMAIL=
VITE_TELEGRAM_BOT_TOKEN=
VITE_TELEGRAM_CHAT_ID=
VITE_TURNSTILE_SITE_KEY=
```

Local secrets for Pages Functions go in `.dev.vars` (git-ignored). Production secrets set via Cloudflare Pages dashboard or:

```bash
wrangler secret put SMTP2GO_API_KEY
wrangler secret put RECIPIENT_EMAIL
```

## Project Structure

```
├── functions/api/send.js       # Cloudflare Pages Function — email handler
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx                # ViteReactSSG entry point
│   ├── routes.tsx              # Route definitions
│   ├── App.tsx                 # Layout wrapper (HeroUI providers + Outlet)
│   ├── components/
│   │   └── application-form.tsx
│   ├── pages/
│   │   ├── home/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   ├── services/
│   │   ├── api-service.ts      # Orchestrates email + telegram
│   │   ├── email-service.ts    # fetch POST /api/send
│   │   └── telegram-service.ts # disabled by default
│   ├── locales/en/ and ru/     # i18n translations
│   └── __tests__/
├── _headers                    # Cloudflare CORS + cache headers
└── vite.config.ts
```

## Request Flow

1. `ApplicationForm` collects 8 fields + metadata (IP via ipify.org, UA, timezone)
2. `api-service.ts` → `email-service.ts` → `fetch POST /api/send`
3. `functions/api/send.js` validates payload, builds HTML email, sends via SMTP2GO
4. Telegram notification available but currently disabled in `api-service.ts`

## Troubleshooting

- **CORS errors:** check `_headers` and `functions/api/send.js` response headers — whitelist includes `english-coach.online`, `english-coach.pages.dev`, `localhost:5173`
- **Missing secrets:** `wrangler secret list` or Cloudflare Pages dashboard
- **Function not reloading:** restart `npm run pages:dev`
- **SSG build fails:** check for `window`/`document` usage outside `typeof window !== 'undefined'` guards
