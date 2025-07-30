import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-default-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold font-serif mb-4 inline-block">
              EnglishCoach
            </Link>
            <p className="text-default-300 mt-4 max-w-xs">
              Personalized English coaching to help you achieve your language goals.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-default-300">
              <li className="flex items-center gap-2">
                <a href="mailto:contact@english-coach.online" className="flex items-center gap-2">
                  <Icon icon="lucide:mail" className="w-4 h-4 flex-shrink-0" />
                  <span>contact@english-coach.online</span>
                </a>
              </li>
              {/* <li className="flex items-center gap-2">
                <Icon icon="lucide:phone" className="w-4 h-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li> */}
              <li className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" className="w-4 h-4 flex-shrink-0" />
                <span>Online Worldwide</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.follow')}</h3>
            <div className="flex gap-4">
              <a href="https://t.me/olga_dubinina_pro_english" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <Icon icon="logos:telegram" className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/olga_dubinina_pro_english" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <Icon icon="skill-icons:instagram" className="w-6 h-6" />
              </a>
              {/* <a href="#" className="text-white hover:text-primary transition-colors">
                <Icon icon="lucide:facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Icon icon="lucide:linkedin" className="w-6 h-6" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-default-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-default-400 text-sm">
            © {currentYear} EnglishCoach. {t('footer.rights')}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-default-400 hover:text-white text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="text-default-400 hover:text-white text-sm transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
