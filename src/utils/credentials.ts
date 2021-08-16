import { readFile, writeFile } from 'fs/promises';
import type { ObjectId } from 'mongodb';
import type { Credential, DB } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCredentialCollection } from './database';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredential = await credentialCollection.findOne({ service });

  if (!encryptedCredential) {
    throw new Error(`Unable to find service ${service}`);
  }

  const credential = decryptCredential(encryptedCredential, key);
  return credential;
}

export async function addCredential(
  credential: Credential,
  key: string
): Promise<ObjectId> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  const result = await credentialCollection.insertOne(encryptedCredential);
  return result.insertedId;
}

export async function deleteCredential(service: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service });
}

export async function updateCredential(
  service: string,
  credential: Credential
): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  const newDB: DB = {
    credentials: [...filteredCredentials, credential],
  };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}
