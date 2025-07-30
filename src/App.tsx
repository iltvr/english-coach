import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
