import { Collection, MongoClient } from 'mongodb';
import type { Credential } from '../types';

let client: MongoClient;

export async function connectDatabase(url: string): Promise<void> {
  client = new MongoClient(url);
  await client.connect();
}

export function getCollection<T>(name: string): Collection<T> {
  return client.db().collection<T>(name);
}

export function getCredentialCollection(): Collection<Credential> {
  return getCollection<Credential>('credentials');
}

// Example: why generics make sense
// export function getDogCollection(): Collection<Dog> {
//   return getCollection<Dog>('dogs')
// }
