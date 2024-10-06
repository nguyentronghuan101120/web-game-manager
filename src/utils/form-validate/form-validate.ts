export const validateEmail = (value: string) => {
  if (!value) return "Email is required";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) return "Email is not valid";
  return undefined; // Return empty string if no error
};

export const validateUsername = (value: string) => {
  if (value.length < 4) return "Username must be at least 4 characters";
  return undefined; // Return empty string if no error
};

export const validatePassword = (value: string) => {
  if (value.length < 4) return "Password must be at least 4 characters";
  return undefined; // Return empty string if no error
};

export const validateConfirmPassword = (value: string, password: string) => {
  if (value !== password) return "Passwords do not match";
  return undefined; // Return empty string if no error
};
