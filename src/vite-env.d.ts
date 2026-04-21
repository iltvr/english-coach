/// <reference types="vite/client" />

declare const process: { env: Record<string, string | undefined> };

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ViteTypeOptions {
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
  readonly VITE_API_BASE_URL: string
  readonly VITE_SMTP2GO_API_KEY: string
  readonly VITE_SMTP2GO_FROM: string
  readonly VITE_TO_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
