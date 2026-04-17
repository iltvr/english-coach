import React from 'react';
import { Button, Spinner } from '@heroui/react';

interface LoadingButtonProps {
  isPending: boolean;
  isDisabled?: boolean;
  label: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ isPending, isDisabled, label }) => (
  <Button
    type="submit"
    color="primary"
    size="lg"
    isLoading={isPending}
    isDisabled={isDisabled}
>
    {isPending ? <>
      Submitting...
    </> : label}
  </Button>
);
