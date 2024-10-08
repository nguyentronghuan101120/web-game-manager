import * as CryptoJS from "crypto-js";

export function DataEncryption() {
  const _key = process.env.NEXT_PUBLIC_SECRET_KEY;

  function encrypt(data: string) {
    try {
      return CryptoJS.AES.encrypt(data, _key!).toString();
    } catch (error) {
      throw error;
    }
  }

  function decrypt(data: string) {
    try {
      return CryptoJS.AES.decrypt(data, _key!).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw error;
    }
  }

  return {
    encrypt,
    decrypt,
  };
}
