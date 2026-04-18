import React from 'react';
import { Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';

interface LoadingButtonProps {
  isPending: boolean;
  isDisabled?: boolean;
  label: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ isPending, isDisabled, label }) => {
  const { t } = useTranslation();
  return (
    <Button
      type="submit"
      color="primary"
      size="lg"
      isLoading={isPending}
      isDisabled={isDisabled}
    >
      {isPending ? t('components.loadingButton.submitting') : label}
    </Button>
  );
};
