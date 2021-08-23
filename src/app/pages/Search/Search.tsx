import React, { useState } from 'react';
import styles from './Search.module.css';

export default function Search(): JSX.Element {
  const [service, setService] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <form className={styles.container}>
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(event) => setService(event.target.value)}
        />
        <input
          type="text"
          placeholder="Master Password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
