import { TextConstant } from "@/src/constants/text-constant";

class FormValidator {
  static isEmpty(value: string | undefined) {
    return !value;
  }

  static isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  static validateEmail(value: string) {
    if (this.isEmpty(value)) return TextConstant.EMAIL_REQUIRED;
    if (!this.isValidEmail(value)) return TextConstant.EMAIL_INVALID;
    return undefined;
  }

  static validateUsername(value: string) {
    if (value.length < 4) return TextConstant.USERNAME_MIN_LENGTH;
    return undefined;
  }

  static validatePassword(value: string | undefined, isEdit: boolean) {
    if (isEdit && this.isEmpty(value)) return undefined;
    if (this.isEmpty(value)) return TextConstant.PASSWORD_REQUIRED;
    if (!isEdit && value!.length < 4) return TextConstant.PASSWORD_MIN_LENGTH;
    return undefined;
  }

  static validateConfirmPassword(
    value: string | undefined,
    password: string | undefined,
    isEdit: boolean
  ) {
    if (isEdit && this.isEmpty(value) && this.isEmpty(password)) return undefined;
    if (value !== password) return TextConstant.PASSWORD_MISMATCH;
    if (this.isEmpty(value)) return TextConstant.CONFIRM_PASSWORD_REQUIRED;
    return undefined;
  }
}

export default FormValidator;
