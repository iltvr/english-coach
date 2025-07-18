/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_TELEGRAM_BOT_TOKEN: string
  readonly VITE_TELEGRAM_CHANNEL_ID: string
  readonly VITE_EMAIL_API_ENDPOINT: string
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_TURNSTILE_SITE_KEY: string
  readonly VITE_TURNSTILE_SECRET_KEY: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
