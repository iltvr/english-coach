import React from 'react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-100 to-secondary-100">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#3498db,_transparent_30%),radial-gradient(circle_at_80%_20%,_#9b59b6,_transparent_30%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,_#e74c3c,_transparent_30%),radial-gradient(circle_at_0%_0%,_#f1c40f,_transparent_30%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 z-10 relative">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 text-default-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-default-700 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              as="a"
              href="#apply"
              color="primary"
              size="lg"
              className="font-medium text-base"
            >
              {t('hero.cta')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};