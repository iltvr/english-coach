import { isValidEmail, isValidPhone } from '../utils/form-validators';

describe('isValidEmail', () => {
  test.each([
    'user@example.com',
    'user.name+tag@domain.co.uk',
    'user123@sub.domain.org',
    'a@b.io',
  ])('accepts valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  test.each([
    ['missing @', 'userexample.com'],
    ['missing domain', 'user@'],
    ['missing TLD', 'user@domain'],
    ['empty string', ''],
    ['spaces', 'user @example.com'],
    ['double @', 'user@@example.com'],
  ])('rejects invalid email: %s', (_label, email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe('isValidPhone', () => {
  test.each([
    '+1 555 123 4567',
    '+7 999 123 45 67',
    '+44 20 7946 0958',
    '555-123-4567',
    '(555) 123-4567',
    '+79991234567',
    '89991234567',
  ])('accepts valid phone: %s', (phone) => {
    expect(isValidPhone(phone)).toBe(true);
  });

  test.each([
    ['empty string', ''],
    ['too short', '123'],
    ['letters only', 'abcdefgh'],
    ['special chars', 'phone#number'],
    ['too long', '+1 555 123 4567 890 123 456'],
  ])('rejects invalid phone: %s', (_label, phone) => {
    expect(isValidPhone(phone)).toBe(false);
  });

  test('trims whitespace before validating', () => {
    expect(isValidPhone('  +7 999 123 45 67  ')).toBe(true);
  });
});
