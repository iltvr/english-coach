import React from 'react';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookieConsent } from '../hooks/useCookieConsent';

export const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const { shown, acceptAll, acceptEssential } = useCookieConsent();

  if (!shown) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-content1 border-t border-divider shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-default-700 flex-1">
          {t('cookies.notice')}{' '}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            {t('cookies.learnMore')}
          </Link>
        </p>
        <div className="flex flex-row gap-2 shrink-0">
          <Button
            size="sm"
            variant="bordered"
            onPress={acceptEssential}
          >
            {t('cookies.essentialOnly')}
          </Button>
          <Button
            size="sm"
            color="primary"
            onPress={acceptAll}
          >
            {t('cookies.acceptAll')}
          </Button>
        </div>
      </div>
    </div>
  );
};
