import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApplicationForm } from '../components/application-form';
import { submitApplication } from '../services/api-service';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Mock the API service
jest.mock('../services/api-service', () => ({
  submitApplication: jest.fn()
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock HeroUI toast
jest.mock('@heroui/react', () => {
  const original = jest.requireActual('@heroui/react');
  return {
    ...original,
    addToast: jest.fn()
  };
});

describe('ApplicationForm', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <ApplicationForm />
      </I18nextProvider>
    );
  };

  test('renders all form fields', () => {
    renderForm();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact information/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/convenient time slot/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/purpose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/achieve your goal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time per week/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument();
    expect(screen.getByText(/i agree to the/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is incomplete', () => {
    renderForm();

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    expect(submitButton).toBeDisabled();
  });

  test('submits form with valid data', async () => {
    renderForm();

    // Mock successful submission
    (submitApplication as jest.Mock).mockResolvedValueOnce(undefined);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/contact information/i), { target: { value: '+1234567890' } });

    // Fill select fields
    // Note: In a real test, you would need to use a library like user-event to properly interact with HeroUI components

    fireEvent.change(screen.getByLabelText(/purpose/i), { target: { value: 'Business English' } });
    fireEvent.change(screen.getByLabelText(/experience/i), { target: { value: 'Intermediate level' } });

    // Check the terms checkbox
    fireEvent.click(screen.getByText(/i agree to the/i));

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitApplication).toHaveBeenCalled();
    });
  });
});
