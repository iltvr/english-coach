import React from 'react';
import { NavbarComponent } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { useTranslation } from 'react-i18next';

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComponent isScrolled={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              {t('termsOfService.title')}
            </h1>
            <p className="text-default-500 mb-8">
              {t('termsOfService.lastUpdated')}
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                {t('termsOfService.introduction')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.acceptance')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.acceptanceText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.services')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.servicesText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.userConduct')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.userConductText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.intellectualProperty')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.intellectualPropertyText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.limitation')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.limitationText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.changes')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.changesText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.governingLaw')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.governingLawText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('termsOfService.contact')}
              </h2>
              <p className="mb-6">
                {t('termsOfService.contactText')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
