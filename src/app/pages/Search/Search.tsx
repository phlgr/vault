import React, { useState } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import {
  deleteCredential,
  updateCredential,
  fetchCredential,
} from '../../utils/api';
import styles from './Search.module.css';

export default function Search(): JSX.Element {
  const [service, setService] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [credential, setCredential] = useState<Credential | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetchCredential(service, masterPassword);
    if (!response.ok) {
      setIsError(true);
      console.log('Credential not found');
      return;
    }
    setIsError(false);
    const credential: Credential = await response.json();
    setCredential(credential);
  }

  async function handleDeleteClick(service: string) {
    await deleteCredential(service, masterPassword);
    setCredential(null);
    setIsError(false);
  }

  async function handleEditClick(credential: Credential) {
    await updateCredential(credential, masterPassword);
    const response = await fetchCredential(service, masterPassword);
    const newCredential = await response.json();
    setCredential(newCredential);
  }

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      {credential ? (
        <CredentialCard
          credentialData={credential}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      ) : (
        <form
          className={styles.container}
          onSubmit={(event) => handleSubmit(event)}
        >
          <input
            type="text"
            placeholder="Service"
            value={service}
            onChange={(event) => setService(event.target.value)}
          />
          <input
            type="password"
            placeholder="Master Password"
            value={masterPassword}
            onChange={(event) => setMasterPassword(event.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      )}
      {isError && <p>Something went wrong!</p>}
    </main>
  );
}
