import { useState, useEffect } from 'react';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  consentDate: string;
}

const STORAGE_KEY = 'cookie_consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent(JSON.parse(stored));
      } else {
        setShown(true);
      }
    } catch {
      setShown(true);
    }
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const value: CookieConsent = {
      necessary: true,
      analytics,
      marketing,
      consentDate: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    setConsent(value);
    setShown(false);
  };

  const acceptAll = () => save(true, true);
  const acceptEssential = () => save(false, false);

  return { consent, shown, acceptAll, acceptEssential };
}
