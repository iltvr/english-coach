# React + Tailwind

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules. TailwindCSS is installed and ready to use in React components.

## References

- Getting started with Vite: https://vitejs.dev/guide/
- Tailwind documentation: https://tailwindcss.com/docs/installation

# Full-Stack Email Form (Vite + Cloudflare Pages Functions)

This repo contains:

- **Backend**: Cloudflare Pages Function at `functions/api/send.js`
- **Frontend**: Vite + React app in `src/`

You can run both locally for development.

## Project Structure

```
my-landing-app/
├── .env.example
├── _headers
├── functions/
│   └── api/
│       └── send.js
├── public/              # Static assets
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   └── services/
│       └── email-service.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.toml        # ← added here
└── README.md
```

## wrangler.toml

```toml
name = "my-landing-app"
compatibility_date = "2025-07-21"

[functions]
directory = "functions"

[build]
# Pages will auto-detect and build Functions
```

## Environment Variables

### Frontend

```ini
VITE_API_BASE_URL=http://localhost:8788/api
```

### Backend (Functions)

Set these secrets in Cloudflare Pages or via Wrangler CLI:

```bash
wrangler secret put SMTP2GO_API_KEY
wrangler secret put SMTP2GO_FROM
wrangler secret put TO_EMAIL
```

## Development

You need two terminals:

1. Start Pages Functions locally

  ```bash
  npm run pages:dev
  # or:
  # wrangler pages dev ./ --local
  ```
  The function is available at `http://localhost:8788/api/send`.

2. Start Vite frontend

  ```bash
  npm run dev
  ```
  Vite (port 5173) proxies `/api` to `http://localhost:8788/api` via `vite.config.ts`.

## Testing

1. Open `http://localhost:5173`.
2. Submit the form.
3. Check the Pages Dev terminal for logs and email status.
4. Observe success/errors in the frontend.

## Build & Deploy

```bash
# Build frontend (optional)
npm run build

# Push to GitHub
git add .
git commit -m "Deploy"
git push
# Cloudflare Pages auto-deploys on push to main

# Or manually:
npm run pages:publish
```

## Troubleshooting

- CORS errors: ensure `_headers` and the function include `Access-Control-Allow-Origin`.
- Missing secrets: verify with `wrangler secret list` or the Pages Dashboard.
- Function not reloading: restart `npm run pages:dev`.
