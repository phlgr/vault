import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');

  async function fetchCredentials() {
    const response = await fetch(`/api/credentials/`, {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();
    setCredentials(credentials);
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Enter words, scramble them, 🎉!</p>
      <Link to="password/marwin">Marwin</Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchCredentials();
        }}
      >
        <input
          type="password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <div>
            <p>{credential.service}</p>
            <p>{credential.username}</p>
            <p>{credential.password}</p>
          </div>
        ))}
    </main>
  );
}
