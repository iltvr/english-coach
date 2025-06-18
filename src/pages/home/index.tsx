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

const HomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  
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