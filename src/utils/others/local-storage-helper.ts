import { LocalStorageKey } from "@/src/constants/local-storage-key";
import { SignInResponse } from "@/src/data-source/auth/models/responses/sign-in-response";

export class LocalStorageHelper {
  static isLocalStorageAvailable() {
    return typeof localStorage !== "undefined";
  }

  static getItem(key: string) {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  static setItem(key: string, value: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  static removeItem(key: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  static clear() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  static getUser() {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(
        localStorage.getItem(LocalStorageKey.USER_DATA) || "{}"
      ) as SignInResponse;
    }
    return {} as SignInResponse;
  }

  static setUser(user: SignInResponse) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(LocalStorageKey.USER_DATA, JSON.stringify(user));
    }
  }

  static removeUser() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(LocalStorageKey.USER_DATA);
    }
  }
}
