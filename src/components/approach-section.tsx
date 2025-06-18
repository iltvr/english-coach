import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ApproachSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      title: t('approach.step1.title'),
      description: t('approach.step1.description')
    },
    {
      number: '02',
      title: t('approach.step2.title'),
      description: t('approach.step2.description')
    },
    {
      number: '03',
      title: t('approach.step3.title'),
      description: t('approach.step3.description')
    },
    {
      number: '04',
      title: t('approach.step4.title'),
      description: t('approach.step4.description')
    }
  ];

  return (
    <section id="approach" className="section-padding bg-content1">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-default-900">
            {t('approach.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-primary">{step.number}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-default-600">{step.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
