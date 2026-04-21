import React from 'react'
import type { RouteObject } from 'react-router-dom'
import App from './App'
import { RouteErrorPage } from './components/error-boundary'

const HomePage = React.lazy(() => import('./pages/home'))
const PrivacyPolicyPage = React.lazy(() => import('./pages/privacy-policy'))
const TermsOfServicePage = React.lazy(() => import('./pages/terms-of-service'))
const PersonalDataConsentPage = React.lazy(() => import('./pages/personal-data-consent'))

export const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
      { path: '/terms-of-service', element: <TermsOfServicePage /> },
      { path: '/personal-data-consent', element: <PersonalDataConsentPage /> },
    ],
  },
]
