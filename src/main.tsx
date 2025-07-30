import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import './i18n'

window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <HeroUIProvider>
          <ToastProvider />
          <App />
        </HeroUIProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
