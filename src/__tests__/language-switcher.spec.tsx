import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageSwitcher } from '../components/language-switcher';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('@heroui/react', () => ({
  Button: ({ children, onPress, startContent, endContent, ...props }: React.ComponentProps<'button'> & { onPress?: () => void; startContent?: React.ReactNode; endContent?: React.ReactNode }) => (
    <button onClick={onPress} {...props}>
      {startContent}{children}{endContent}
    </button>
  ),
}));

const renderSwitcher = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
    </I18nextProvider>
  );

describe('LanguageSwitcher', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  test('shows RU when language is English', () => {
    renderSwitcher();
    expect(screen.getByRole('button', { name: /ru/i })).toBeInTheDocument();
  });

  test('shows EN when language is Russian', async () => {
    await i18n.changeLanguage('ru');
    renderSwitcher();
    expect(screen.getByRole('button', { name: /en/i })).toBeInTheDocument();
  });

  test('detects en-US as English', async () => {
    await i18n.changeLanguage('en-US');
    renderSwitcher();
    expect(screen.getByRole('button', { name: /ru/i })).toBeInTheDocument();
  });

  test('switches EN → RU on click', async () => {
    renderSwitcher();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /ru/i }));
    });
    expect(i18n.language).toBe('ru');
  });

  test('switches RU → EN on click', async () => {
    await i18n.changeLanguage('ru');
    renderSwitcher();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /en/i }));
    });
    expect(i18n.language).toBe('en');
  });

  test('dispatches languageChanged event on click', async () => {
    const listener = jest.fn();
    window.addEventListener('languageChanged', listener);

    renderSwitcher();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /ru/i }));
    });

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener('languageChanged', listener);
  });
});
