import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  // inside useEffect we want to
  // fetch credentials, then setCredentials to fetched credentials
  // callback fn, deps array

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch(`/api/credentials/`, {
        headers: {
          Authorization: 'currywurst',
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
  }, []);

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Enter words, scramble them, 🎉!</p>
      <Link to="password/marwin">Marwin</Link>
      <input />
      {credentials &&
        credentials.forEach((credential) => console.log(credential))}
    </main>
  );
}
