import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import HomePage from './pages/home';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsOfServicePage from './pages/terms-of-service';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { i18n, t } = useTranslation();

  React.useEffect(() => {
    // Set the document language attribute based on the current i18n language
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Force re-render on language change
  React.useEffect(() => {
    const handleLanguageChange = () => {
      // Force a re-render
      setRenderKey(Date.now());
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const [renderKey, setRenderKey] = React.useState(Date.now());

  return (
    <React.Fragment key={renderKey}>
      <Helmet>
        {/* Basic SEO tags */}
        <html lang={i18n.language} />
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta name="keywords" content={t('seo.keywords')} />

        {/* Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://english-coach.online" />
        <meta property="og:title" content={t('seo.ogTitle')} />
        <meta property="og:description" content={t('seo.ogDescription')} />
        <meta property="og:image" content="https://english-coach.online/og-image.jpg" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.twitterTitle')} />
        <meta name="twitter:description" content={t('seo.twitterDescription')} />
        <meta name="twitter:image" content="https://english-coach.online/twitter-image.jpg" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
