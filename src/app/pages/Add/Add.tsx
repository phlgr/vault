import React, { useState } from 'react';
import styles from './Add.module.css';

export default function Add(): JSX.Element {
  const [service, setService] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newCredential = {
      service,
      username,
      password,
    };
    await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: masterPassword,
      },
      body: JSON.stringify(newCredential),
    });
  }

  return (
    <main className={styles.container}>
      <h1>Vault</h1>

      <form
        className={styles.container}
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          placeholder="Service"
          type="text"
          value={service}
          onChange={(event) => setService(event.target.value)}
          required
        />
        <input
          placeholder="User Name"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <input
          placeholder="Master Password"
          type="password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
          required
        />
        <input type="submit" value="Save Credential" />
      </form>
    </main>
  );
}
