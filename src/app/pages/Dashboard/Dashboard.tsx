import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Enter words, scramble them, 🎉!</p>
      <input />
    </main>
  );
}
