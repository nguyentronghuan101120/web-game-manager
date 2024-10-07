import { TextConstant } from "@/src/constants/text-constant";

const isEmpty = (value: string | undefined) => !value;
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const validateEmail = (value: string) => {
  if (isEmpty(value)) return TextConstant.EMAIL_REQUIRED;
  if (!isValidEmail(value)) return TextConstant.EMAIL_INVALID;
  return undefined;
};

export const validateUsername = (value: string) => {
  if (value.length < 4) return TextConstant.USERNAME_MIN_LENGTH;
  return undefined;
};

export const validatePassword = (value: string | undefined, isEdit: boolean) => {
  if (isEdit && isEmpty(value)) return undefined;
  if (isEmpty(value)) return TextConstant.PASSWORD_REQUIRED;
  if (!isEdit && value!.length < 4) return TextConstant.PASSWORD_MIN_LENGTH;
  return undefined;
};

export const validateConfirmPassword = (
  value: string | undefined,
  password: string | undefined,
  isEdit: boolean
) => {
  if (isEdit && isEmpty(value) && isEmpty(password)) return undefined;
  if (value !== password) return TextConstant.PASSWORD_MISMATCH;
  if (isEmpty(value)) return TextConstant.CONFIRM_PASSWORD_REQUIRED;
  return undefined;
};
