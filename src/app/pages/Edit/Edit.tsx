import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Credential } from '../../../types';
import styles from './Edit.module.css';

export default function Edit(): JSX.Element {
  const history = useHistory();
  const { service: serviceParam }: { service: string } = useParams();
  const [service, setService] = useState<string>(serviceParam);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');

  async function updateCredential(
    credential: Credential,
    masterPassword: string
  ) {
    const response = await fetch(`/api/credentials/${credential.service}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: masterPassword,
      },
      body: JSON.stringify(credential),
    });
    return response;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const credential = {
      service,
      username,
      password,
    };
    const response = await updateCredential(credential, masterPassword);
    if (!response.ok) {
      console.log('Something went wrong');
      return;
    }
    history.push('/');
  }

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Edit credential {serviceParam}</p>
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Master Password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
        />
        <input type="submit" value="Edit credential" />
      </form>
    </main>
  );
}
