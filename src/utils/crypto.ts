import CryptoJS from 'crypto-js';
import type { Credential } from '../types';

export function encryptCredential(
  credential: Credential,
  key: string
): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    key
  ).toString();

  const encryptedCredential = {
    ...credential,
    password: encryptedPassword,
  };
  return encryptedCredential;
}

export function decryptCredential(
  credential: Credential,
  key: string
): Credential {
  const decryptedPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    key
  ).toString(CryptoJS.enc.Utf8);

  const decryptedCredential = {
    ...credential,
    password: decryptedPassword,
  };

  return decryptedCredential;
}
