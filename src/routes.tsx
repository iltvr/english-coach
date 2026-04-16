import React from 'react'
import type { RouteObject } from 'react-router-dom'

const HomePage = React.lazy(() => import('./pages/home'))
const PrivacyPolicyPage = React.lazy(() => import('./pages/privacy-policy'))
const TermsOfServicePage = React.lazy(() => import('./pages/terms-of-service'))

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
  { path: '/terms-of-service', element: <TermsOfServicePage /> },
]
