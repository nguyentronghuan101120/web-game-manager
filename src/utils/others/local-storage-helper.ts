import { LocalStorageKey } from "@/src/constants/local-storage-key";
import { SignInResponse } from "@/src/data-source/auth/models/responses/sign-in-response";
import { DataEncryption } from "./data-encryption";

export class LocalStorageHelper {
  static getItem(key: string) {
    return localStorage.getItem(key);
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
    try {
      const userData = localStorage.getItem(LocalStorageKey.USER_DATA);

      if (userData) {
        const decryptData = DataEncryption().decrypt(userData);

        return JSON.parse(decryptData) as SignInResponse;
      }
    } catch (error) {
      throw error;
    }
    return null;
  }

  static setUser(user: object) {
    try {
      localStorage.setItem(
        LocalStorageKey.USER_DATA,
        DataEncryption().encrypt(JSON.stringify(user))
      );
    } catch (error) {
      throw error;
    }
  }

  static removeUser() {
    localStorage.removeItem(LocalStorageKey.USER_DATA);
  }
}
