import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { CookieBanner } from './components/cookie-banner'

const App: React.FC = () => {
  const { i18n } = useTranslation()

  React.useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const [renderKey, setRenderKey] = React.useState(0)

  React.useEffect(() => {
    const handleLanguageChange = () => setRenderKey(k => k + 1)
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  return (
    <HeroUIProvider>
      <ToastProvider />
      <React.Fragment key={renderKey}>
        <Outlet />
        <CookieBanner />
      </React.Fragment>
    </HeroUIProvider>
  )
}

export default App
