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

export const validatePassword = (
  value: string | undefined,
  isEdit: boolean
) => {
  if (isEdit && !value) return undefined;
  if (!value) return "Password is required";
  if (!isEdit && value.length < 4)
    return "Password must be at least 4 characters";
  return undefined; // Return empty string if no error
};

export const validateConfirmPassword = (
  value: string | undefined,
  password: string | undefined,
  isEdit: boolean
) => {
  if (isEdit && !value && !password) return undefined;
  if (value && password && value !== password) return "Passwords do not match";
  if (!value) return "Confirm Password is required"; // Added validation for empty confirm password
  return undefined; // Return empty string if no error
};
