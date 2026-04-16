import { ViteReactSSG } from 'vite-react-ssg'
import App from './App'
import { routes } from './routes'
import './index.css'
import './i18n'

if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason)
    event.preventDefault()
  })
}

export const createRoot = ViteReactSSG(App, { routes })
