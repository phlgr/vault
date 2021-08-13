import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function validateMasterpassword(
  password: string
): Promise<boolean> {
  // read hashedMasterpassword from .password
  const hashedMasterpassword = await readFile('.password', 'utf-8');
  // hash password argument
  const hashedPassword = CryptoJS.SHA256(password).toString();
  // compare hashedMasterpassword with password and return the outcome
  return hashedMasterpassword === hashedPassword;
}
