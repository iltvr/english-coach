import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Input, Textarea, Button, addToast, Select, SelectItem, Checkbox } from '@heroui/react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { submitApplication } from '../services/api-service';
import { isValidEmail, isValidPhone } from '../utils/form-validators';
import Turnstile from 'react-turnstile';

interface FormData {
  name: string;
  email: string;
  contact: string;
  timeSlot: string;
  purpose: string;
  weeklyTime: string;
  experience: string;
  termsAgreed: boolean;
  marketingConsent: boolean;
}

export const ApplicationForm: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [browserInfo, setBrowserInfo] = useState('');
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    // Fetch the user's IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error('Error fetching IP address:', error));

    // Get browser/user agent information
    setBrowserInfo(navigator.userAgent);

    // Get time zone information
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Define purpose options
  const purposeOptions = [
    { key: "career", label: t('application.form.purposeOptions.career') },
    { key: "travel", label: t('application.form.purposeOptions.travel') },
    { key: "exam", label: t('application.form.purposeOptions.exam') },
    { key: "relocation", label: t('application.form.purposeOptions.relocation') },
    { key: "personal", label: t('application.form.purposeOptions.personal') },
  ];

  // Define time slot options
  const timeSlotOptions = [
    { key: "morning", label: t('application.form.timeSlotOptions.morning') },
    { key: "afternoon", label: t('application.form.timeSlotOptions.afternoon') },
    { key: "evening", label: t('application.form.timeSlotOptions.evening') },
  ];

  // Define weekly time options
  const weeklyTimeOptions = [
    { key: "1-2", label: t('application.form.weeklyTimeOptions.option1') },
    { key: "3-5", label: t('application.form.weeklyTimeOptions.option2') },
    { key: "6-8", label: t('application.form.weeklyTimeOptions.option3') },
  ];

  const { control, handleSubmit, reset, watch, formState: { errors, isValid, isDirty } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      timeSlot: '',
      purpose: '',
      weeklyTime: '',
      experience: '',
      termsAgreed: false,
      marketingConsent: false
    },
    mode: "onTouched"
  });

  // Fix: Properly watch all required fields
  const name = watch("name");
  const email = watch("email");
  const contact = watch("contact");
  const termsAgreed = watch("termsAgreed");

  // Fix: Correctly check if all required fields are filled
  const isFormComplete =
    !!name && name.trim() !== '' &&
    !!email && email.trim() !== '' &&
    !!contact && contact.trim() !== '' &&
    termsAgreed === true;

  const onSubmit = async (data: FormData) => {
    // Add shorter timeout to prevent hanging on API calls
    const timeoutId = setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: t('application.form.error'),
        description: "Request timed out. Please try again.",
        severity: 'danger',
      });
    }, 5000); // Reduced to 3 seconds timeout

    const formDataWithExtras = {
      ...data,
      purpose: purposeOptions.find(o => o.key === data.purpose)?.label ?? data.purpose,
      timeSlot: timeSlotOptions.find(o => o.key === data.timeSlot)?.label ?? data.timeSlot,
      weeklyTime: weeklyTimeOptions.find(o => o.key === data.weeklyTime)?.label ?? data.weeklyTime,
      ipAddress,
      browserInfo,
      timeZone,
      submissionTime: new Date().toISOString()
    };

    try {
      await submitApplication(formDataWithExtras, turnstileToken);
      clearTimeout(timeoutId);
      addToast({
        title: t('application.form.success'),
        severity: 'success',
      });
      // Reset form after successful submission
      reset();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Form submission error:", error);
      addToast({
        title: t('application.form.error'),
        description: error instanceof Error ? error.message : "Unknown error",
        severity: 'danger',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (value: string) =>
    isValidEmail(value) || t('application.form.invalidEmail');

  const validateContact = (value: string) =>
    isValidPhone(value) || t('application.form.invalidContact');

  return (
    <section id="apply" className="section-padding bg-content1">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-default-900">
            {t('application.title')}
          </h2>
          <p className="text-xl text-default-700 max-w-2xl mx-auto">
            {t('application.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardBody className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: t('application.form.required') as string }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t('application.form.nameShort')}
                        placeholder={t('application.form.namePlaceholder')}
                        isRequired
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: t('application.form.required') as string,
                      validate: validateEmail
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t('application.form.emailShort')}
                        placeholder={t('application.form.emailPlaceholder')}
                        type="email"
                        isRequired
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="contact"
                  control={control}
                  rules={{
                    required: t('application.form.required') as string,
                    validate: validateContact
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={t('application.form.contactShort')}
                      placeholder={t('application.form.contactPlaceholder')}
                      type="tel"
                      isRequired
                      isInvalid={!!errors.contact}
                      errorMessage={errors.contact?.message}
                    />
                  )}
                />

                <Controller
                  name="timeSlot"
                  control={control}
                  render={({ field: { onChange, value, onBlur: _onBlur, ...restField } }) => (
                    <Select
                      {...restField}
                      label={t('application.form.timeSlotShort')}
                      placeholder={t('application.form.selectTimeSlot')}
                      selectedKeys={value ? [value] : []}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        onChange(selected);
                      }}
                      description={t('application.form.timeSlotNote')}
                    >
                      {timeSlotOptions.map((option) => (
                        <SelectItem key={option.key} textValue={option.label}>
                          {t(`application.form.timeSlotOptions.${option.key}`)}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />


                <Controller
                  name="weeklyTime"
                  control={control}
                  render={({ field: { onChange, value, onBlur: _onBlur, ...restField } }) => (
                    <Select
                      {...restField}
                      label={t('application.form.weeklyTimeShort')}
                      placeholder={t('application.form.selectWeeklyTime')}
                      selectedKeys={value ? [value] : []}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        onChange(selected);
                      }}
                    >
                      {weeklyTimeOptions.map((option) => (
                        <SelectItem key={option.key} textValue={option.label}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name="purpose"
                  control={control}
                  render={({ field: { onChange, value, onBlur: _onBlur, ...restField } }) => (
                    <Select
                      {...restField}
                      label={t('application.form.purposeShort')}
                      placeholder={t('application.form.selectPurpose')}
                      selectedKeys={value ? [value] : []}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        onChange(selected);
                      }}
                    >
                      {purposeOptions.map((option) => (
                        <SelectItem key={option.key} textValue={option.label}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label={t('application.form.experienceShort')}
                    />
                  )}
                />

                {/* Add terms agreement checkbox */}
                <Controller
                  name="termsAgreed"
                  control={control}
                  rules={{
                    required: t('application.form.termsRequired') as string
                  }}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <div className="mt-4">
                      <Checkbox
                        {...restField}
                        isSelected={value}
                        onValueChange={onChange}
                        isRequired
                        color="primary"
                      >
                      </Checkbox>
                      <span className="text-sm">
                        {t('application.form.termsConsentPrefix')}{' '}
                        <Link to={t('application.form.termsConsentLink1Path')} className="text-primary hover:underline">
                          {t('application.form.termsConsentLink1')}
                        </Link>
                        {' '}{t('application.form.termsConsentConnector')}{' '}
                        <Link to={t('application.form.termsConsentLink2Path')} className="text-primary hover:underline">
                          {t('application.form.termsConsentLink2')}
                        </Link>
                      </span>
                      {errors.termsAgreed && (
                        <p className="text-danger text-xs mt-1">{errors.termsAgreed.message}</p>
                      )}
                    </div>
                  )}
                />


                <Controller
                  name="marketingConsent"
                  control={control}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <div className="mt-2">
                      <Checkbox
                        {...restField}
                        isSelected={value}
                        onValueChange={onChange}
                        color="primary"
                      >
                        <span className="text-sm">{t('application.form.marketingConsent')}</span>
                      </Checkbox>
                    </div>
                  )}
                />

                {/* <Turnstile
                  sitekey={process.env.VITE_TURNSTILE_SITE_KEY || ''}
                  onVerify={(token) => setTurnstileToken(token)}
                /> */}
                {/* {errors.turnstile && <p className="text-danger">{errors.turnstile}</p>} */}

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    isDisabled={!isFormComplete}
                  >
                    {t('application.form.submit')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};
