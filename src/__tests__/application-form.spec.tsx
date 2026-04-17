import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApplicationForm } from '../components/application-form';
import { submitApplication } from '../services/api-service';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('../services/api-service', () => ({
  submitApplication: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>
}));

describe('ApplicationForm', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await i18n.changeLanguage('en');
  });

  const renderForm = async () => {
    let result: ReturnType<typeof render>;
    await act(async () => {
      result = render(
        <I18nextProvider i18n={i18n}>
          <ApplicationForm />
        </I18nextProvider>
      );
    });
    return result!;
  };

  test('renders form with key input fields', async () => {
    await renderForm();

    expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/select your learning goal/i)).toBeInTheDocument();
    expect(screen.getByText(/i agree to the/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is incomplete', async () => {
    await renderForm();

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    expect(submitButton).toBeDisabled();
  });

  test('does not submit when required fields are empty', async () => {
    await renderForm();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit application/i }));
    });

    expect(submitApplication).not.toHaveBeenCalled();
  });
});
