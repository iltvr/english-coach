import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '10+', label: t('about.experience') },
    { value: '500+', label: t('about.students') },
    { value: '25+', label: t('about.countries') }
  ];

  return (
    <section id="about" className="section-padding bg-content1">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-default-900">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img 
                src="https://img.heroui.chat/image/avatar?w=600&h=600&u=teacher" 
                alt="English Teacher" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg mb-6 text-default-700">
              {t('about.description')}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardBody>
                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-default-500">{stat.label}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
