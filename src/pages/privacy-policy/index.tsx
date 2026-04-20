import React, { useEffect } from 'react';
import { NavbarComponent } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { Head } from 'vite-react-ssg';
import { useTranslation } from 'react-i18next';

interface PolicySection {
  title: string;
  paragraphs: string[];
}

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  const sections = t('privacyPolicy.sections', { returnObjects: true }) as PolicySection[];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{t('privacyPolicy.title')} — EnglishCoach</title>
        <meta name="description" content={t('seo.privacyDescription')} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://english-coach.online/privacy-policy" />
      </Head>
      <NavbarComponent isScrolled={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto prose prose-lg max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
              {t('privacyPolicy.title')}
            </h1>
            <p className="text-sm text-default-500 mb-2">{t('privacyPolicy.meta')}</p>
            <p className="text-sm text-default-500 mb-8">{t('privacyPolicy.metaDate')}</p>

            {sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl font-semibold mt-8 mb-3 text-default-900">{section.title}</h2>
                <div className="space-y-3 text-default-700">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
