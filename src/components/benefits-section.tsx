import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const BenefitsSection: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: 'lucide:user',
      title: t('benefits.personalized.title'),
      description: t('benefits.personalized.description')
    },
    {
      icon: 'lucide:clock',
      title: t('benefits.flexible.title'),
      description: t('benefits.flexible.description')
    },
    {
      icon: 'lucide:target',
      title: t('benefits.practical.title'),
      description: t('benefits.practical.description')
    },
    {
      icon: 'lucide:bar-chart',
      title: t('benefits.progress.title'),
      description: t('benefits.progress.description')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="benefits" className="section-padding bg-default-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-default-900">
            {t('benefits.title')}
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <div className="bg-primary-100 p-3 rounded-full mb-4">
                    <Icon icon={benefit.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-default-600">{benefit.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
