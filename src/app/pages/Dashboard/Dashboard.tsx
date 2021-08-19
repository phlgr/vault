import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');

  // inside useEffect we want to
  // fetch credentials, then setCredentials to fetched credentials
  // callback fn, deps array

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch(`/api/credentials/`, {
        headers: {
          Authorization: masterPassword,
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Enter words, scramble them, 🎉!</p>
      <Link to="password/marwin">Marwin</Link>
      <input
        type="password"
        value={masterPassword}
        onChange={(event) => setMasterPassword(event.target.value)}
      />
      {credentials.length &&
        credentials.forEach((credential) => console.log(credential))}
    </main>
  );
}
