import { LocalStorageKey } from "@/src/constants/local-storage-key";
import { SignInResponse } from "@/src/data-source/auth/models/responses/sign-in-response";

export class LocalStorageHelper {
  static getItem(key: string) {
    return localStorage.getItem(key);
    return null;
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static getUser() {
    const userData = localStorage.getItem(LocalStorageKey.USER_DATA);
    if (userData) {
      return JSON.parse(userData) as SignInResponse;
    }
    return null;
  }

  static setUser(user: SignInResponse) {
    localStorage.setItem(LocalStorageKey.USER_DATA, JSON.stringify(user));
  }

  static removeUser() {
    localStorage.removeItem(LocalStorageKey.USER_DATA);
  }
}
