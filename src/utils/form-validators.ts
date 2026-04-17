export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isValidPhone = (value: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;
  return phoneRegex.test(value.trim());
};
