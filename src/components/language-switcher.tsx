import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === 'en';
  
  const toggleLanguage = () => {
    const newLang = isEnglish ? 'ru' : 'en';
    i18n.changeLanguage(newLang).then(() => {
      // Force a re-render of the component tree
      window.dispatchEvent(new Event('languageChanged'));
    });
  };
  
  return (
    <Button 
      variant="light"
      onPress={toggleLanguage}
      startContent={
        <Icon 
          icon="lucide:globe" 
          className="w-5 h-5 mr-1 text-primary"
        />
      }
      endContent={
        <Icon 
          icon={isEnglish ? 'logos:russia' : 'logos:usa'} 
          className="w-5 h-5 ml-1"
        />
      }
    >
      {isEnglish ? 'RU' : 'EN'}
    </Button>
  );
};