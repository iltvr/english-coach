import React from 'react';
import { NavbarComponent } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComponent isScrolled={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              {t('privacyPolicy.title')}
            </h1>
            <p className="text-default-500 mb-8">
              {t('privacyPolicy.lastUpdated')}
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                {t('privacyPolicy.introduction')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.informationCollect')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.informationCollectText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.personalInfo')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.personalInfoText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.useInfo')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.useInfoText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.shareInfo')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.shareInfoText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.dataRetention')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.dataRetentionText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.changes')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.changesText')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {t('privacyPolicy.contact')}
              </h2>
              <p className="mb-6">
                {t('privacyPolicy.contactText')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
