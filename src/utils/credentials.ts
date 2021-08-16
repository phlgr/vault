import type { ObjectId } from 'mongodb';
import type { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCredentialCollection } from './database';

export async function readCredentials(key: string): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredentials = await credentialCollection.find().toArray();
  const credentials = encryptedCredentials.map((credential) =>
    decryptCredential(credential, key)
  );
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
  credential: Credential,
  key: string
): Promise<void> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  await credentialCollection.updateOne(
    { service },
    { $set: encryptedCredential }
  );
}
