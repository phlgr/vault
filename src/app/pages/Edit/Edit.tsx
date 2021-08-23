import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './Edit.module.css';

export default function Edit(): JSX.Element {
  const { service: serviceParam }: { service: string } = useParams();
  const [service, setService] = useState<string>(serviceParam);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Edit credential {serviceParam}</p>
      <form className={styles.container}>
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
