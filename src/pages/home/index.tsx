import React from 'react';
import { NavbarComponent } from '../../components/navbar';
import { HeroSection } from '../../components/hero-section';
import { AboutSection } from '../../components/about-section';
import { BenefitsSection } from '../../components/benefits-section';
import { ApproachSection } from '../../components/approach-section';
import { TestimonialsSection } from '../../components/testimonials-section';
import { ApplicationForm } from '../../components/application-form';
import { Footer } from '../../components/footer';
import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  React.useEffect(() => {
    // Throttle scroll event to prevent excessive function calls
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrolling to section when navigating from other pages
  React.useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure the page is fully rendered
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta name="keywords" content={t('seo.keywords')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://english-coach.online/" />
        <meta property="og:title" content={t('seo.ogTitle')} />
        <meta property="og:description" content={t('seo.ogDescription')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('seo.twitterTitle')} />
        <meta name="twitter:description" content={t('seo.twitterDescription')} />
        <link rel="canonical" href="https://english-coach.online/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "English Coach — Ольга Дубинина",
          "url": "https://english-coach.online",
          "description": "Индивидуальные уроки английского для взрослых. Персональная программа для карьеры, переезда и учёбы.",
          "founder": {
            "@type": "Person",
            "name": "Ольга Дубинина",
            "jobTitle": "Преподаватель английского языка",
            "description": "Репетитор английского с 20+ летним опытом и 50+ студентами"
          },
          "offers": {
            "@type": "Offer",
            "description": "Индивидуальные уроки английского языка 1 на 1",
            "url": "https://english-coach.online/#apply"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@english-coach.online",
            "contactType": "customer service"
          }
        })}</script>
      </Head>
      <NavbarComponent isScrolled={isScrolled} />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <ApproachSection />
        <TestimonialsSection />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
