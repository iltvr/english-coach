import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Input, Textarea, Button, addToast, Select, SelectItem, Checkbox } from '@heroui/react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { submitApplication } from '../services/api-service';
import Turnstile from 'react-turnstile';

interface FormData {
  name: string;
  email: string;
  contact: string;
  timeSlot: string;
  purpose: string;
  timeframe: string;
  weeklyTime: string;
  experience: string;
  termsAgreed: boolean;
}

export const ApplicationForm: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');

  // Define time slot options
  const timeSlotOptions = [
    { key: "morning", label: t('application.form.timeSlotOptions.morning') },
    { key: "afternoon", label: t('application.form.timeSlotOptions.afternoon') },
    { key: "evening", label: t('application.form.timeSlotOptions.evening') },
    { key: "night", label: t('application.form.timeSlotOptions.night') },
    { key: "weekend", label: t('application.form.timeSlotOptions.weekend') }
  ];

  // Define weekly time options
  const weeklyTimeOptions = [
    { key: "1-2", label: t('application.form.weeklyTimeOptions.option1') },
    { key: "3-5", label: t('application.form.weeklyTimeOptions.option2') },
    { key: "6-8", label: t('application.form.weeklyTimeOptions.option3') },
    { key: "9+", label: t('application.form.weeklyTimeOptions.option4') }
  ];

  // Define timeframe options
  const timeframeOptions = [
    { key: "1-3-months", label: t('application.form.timeframeOptions.option1') },
    { key: "3-6-months", label: t('application.form.timeframeOptions.option2') },
    { key: "6-12-months", label: t('application.form.timeframeOptions.option3') },
    { key: "1-2-years", label: t('application.form.timeframeOptions.option4') },
    { key: "2-plus-years", label: t('application.form.timeframeOptions.option5') }
  ];

  const { control, handleSubmit, reset, watch, formState: { errors, isValid, isDirty } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      timeSlot: '',
      purpose: '',
      timeframe: '',
      weeklyTime: '',
      experience: '',
      termsAgreed: false
    },
    mode: "all" // Changed from "onChange" to "all" to validate on all events
  });

  // Fix: Properly watch all required fields
  const name = watch("name");
  const email = watch("email");
  const contact = watch("contact");
  const timeSlot = watch("timeSlot");
  const purpose = watch("purpose");
  const timeframe = watch("timeframe");
  const weeklyTime = watch("weeklyTime");
  const experience = watch("experience");
  const termsAgreed = watch("termsAgreed");

  // Fix: Correctly check if all required fields are filled
  const isFormComplete =
    !!name && name.trim() !== '' &&
    !!email && email.trim() !== '' &&
    !!contact && contact.trim() !== '' &&
    !!timeSlot && timeSlot.trim() !== '' &&
    !!purpose && purpose.trim() !== '' &&
    !!timeframe && timeframe.trim() !== '' &&
    !!weeklyTime && weeklyTime.trim() !== '' &&
    !!experience && experience.trim() !== '' &&
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
    }, 3000); // Reduced to 3 seconds timeout

    try {
      await submitApplication(data, turnstileToken);
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

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || t('application.form.invalidEmail');
  };

  const validatePhone = (value: string) => {
    // Simple validation - should contain at least one number
    return /\d/.test(value) || t('application.form.invalidPhone');
  };

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
                    validate: validatePhone
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={t('application.form.contactShort')}
                      placeholder={t('application.form.contactPlaceholder')}
                      isRequired
                      errorMessage={errors.contact?.message}
                    />
                  )}
                />

                <Controller
                  name="timeSlot"
                  control={control}
                  rules={{ required: t('application.form.required') as string }}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <Select
                      {...restField}
                      label={t('application.form.timeSlotShort')}
                      placeholder={t('application.form.selectTimeSlot')}
                      selectedKeys={value ? [value] : []}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        onChange(selected);
                      }}
                      isRequired
                      errorMessage={errors.timeSlot?.message}
                    >
                      {timeSlotOptions.map((option) => (
                        <SelectItem key={option.key} value={option.key}>
                          {t(`application.form.timeSlotOptions.${option.key}`)}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name="purpose"
                  control={control}
                  rules={{ required: t('application.form.required') as string }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label={t('application.form.purposeShort')}
                      placeholder={t('application.form.purposePlaceholder')}
                      isRequired
                      errorMessage={errors.purpose?.message}
                    />
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="timeframe"
                    control={control}
                    rules={{ required: t('application.form.required') as string }}
                    render={({ field: { onChange, value, ...restField } }) => (
                      <Select
                        {...restField}
                        label={t('application.form.timeframeShort')}
                        placeholder={t('application.form.selectTimeframe')}
                        selectedKeys={value ? [value] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0] as string;
                          onChange(selected);
                        }}
                        isRequired
                        errorMessage={errors.timeframe?.message}
                      >
                        {timeframeOptions.map((option) => (
                          <SelectItem key={option.key} value={option.key}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  <Controller
                    name="weeklyTime"
                    control={control}
                    rules={{ required: t('application.form.required') as string }}
                    render={({ field: { onChange, value, ...restField } }) => (
                      <Select
                        {...restField}
                        label={t('application.form.weeklyTimeShort')}
                        placeholder={t('application.form.selectWeeklyTime')}
                        selectedKeys={value ? [value] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0] as string;
                          onChange(selected);
                        }}
                        isRequired
                        errorMessage={errors.weeklyTime?.message}
                      >
                        {weeklyTimeOptions.map((option) => (
                          <SelectItem key={option.key} value={option.key}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </div>

                <Controller
                  name="experience"
                  control={control}
                  rules={{ required: t('application.form.required') as string }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label={t('application.form.experienceShort')}
                      isRequired
                      errorMessage={errors.experience?.message}
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
                        <div className="text-sm">
                          {t('application.form.termsAgreement')}
                          <Link to="/privacy-policy" className="text-primary hover:underline mx-1">
                            {t('footer.privacy')}
                          </Link>
                          {t('application.form.and')}
                          <Link to="/terms-of-service" className="text-primary hover:underline mx-1">
                            {t('footer.terms')}
                          </Link>
                        </div>
                      </Checkbox>
                      {errors.termsAgreed && (
                        <p className="text-danger text-xs mt-1">{errors.termsAgreed.message}</p>
                      )}
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
